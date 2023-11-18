// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import { SchemaResolver } from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";
import { IEAS, Attestation, AttestationRequest, AttestationRequestData } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import { NO_EXPIRATION_TIME, EMPTY_UID } from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";
import { WorldIDEnabled, IWorldID } from "./WorldIDEnabled.sol";
import { ByteHasher } from "./helpers/ByteHasher.sol";

contract DeDe is WorldIDEnabled, SchemaResolver {
    using ByteHasher for bytes;

    IEAS eas;

    uint public settlementDuration;
    uint public currentId;
    mapping(uint => Shipment) public shipments;
    mapping(uint => bool) public pickedUpShipments;
    mapping(uint => bool) public fulfilledShipments;
    mapping(address => uint) public withdrawableBalance;

    enum ShipmentState {
        REQUESTED,
        PICKED_UP,
        DELIVERED,
        DISPUTED,
        COMPLETED
    }

    bytes32 REQUESTED_SCHEMA; //TODO
    bytes32 PICKED_UP_SCHEMA; //TODO
    bytes32 DELIVERED_SCHEMA; //TODO
    bytes32 DISPUTED_SCHEMA; //TODO
    bytes32 COMPLETED_SCHEMA; //TODO

    struct Shipment {
        uint id;
        ShipmentState state;
        uint bounty; // Earnings for courier when shipment is done
        uint settlementDeadline; // When should the receiver accept/dispute the shipment as complete
        // uint stake; // Amount courier staked to make this shipment REMOVED FOR HACKATHON
        address courier;
        address sender;
        address receiver;
        // address paidBy;
        bool valid;
    }
    /**
     * @param bounty Bounty for the courier
     * @param packageValue Value of the package
     * @param sender Address of the sender
     * @param receiver Address of the receiver
     */
    struct ShipmentRequestedParams {
        uint bounty;
        // uint packageValue;
        // address sender;
        // address receiver;
    }

    struct ShipmentPickedUpParams {
        uint shipmentId;
        address courier;
    }

    struct ShipmentDeliveredParams {
        uint shipmentId;
        address courier;
    }

    struct ShipmentCompletedParams {
        uint shipmentId;
        address disputer;
    }

    event ShipmentRequested(uint shipmentId, address sender, address receiver, uint deadline, uint bounty);
    event ShipmentPickedUp(uint shipmentId, address courier);
    event ShipmentDelivered(uint shipmentId, address courier);
    event ShipmentCompleted(uint shipmentId, address courier);

    /**
     * @dev Constructor
     * @param _settlementDuration How long the courier has to complete the shipment
     * @param _eas Address of the EAS contract
     */
    constructor(
        uint _settlementDuration,
        IEAS _eas,
        IWorldID _worldId
    ) payable SchemaResolver(_eas) WorldIDEnabled(_worldId) {
        settlementDuration = _settlementDuration;
        eas = _eas;
    }

    function onAttest(Attestation calldata attestation, uint256 /*value*/) internal override returns (bool) {
        if (attestation.schema == PICKED_UP_SCHEMA) {
            ShipmentPickedUpParams memory params = abi.decode(attestation.data, (ShipmentPickedUpParams));
            pickUpShipment(params.shipmentId);
        } else if (attestation.schema == DELIVERED_SCHEMA) {
            ShipmentDeliveredParams memory params = abi.decode(attestation.data, (ShipmentDeliveredParams));
            deliverShipment(params.shipmentId);
        } else if (attestation.schema == DISPUTED_SCHEMA) {
            // TODO
        } else if (attestation.schema == COMPLETED_SCHEMA) {
            ShipmentCompletedParams memory params = abi.decode(attestation.data, (ShipmentCompletedParams));
            completeShipment(params.shipmentId);
        }

        return true;
    }

    function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
        return true;
    }

    /**
     * @dev Request a shipment. Direct Contract Attestation
     * @param receiver receiver of the shipment
     */
    function requestShipment(address receiver) public payable {
        // require(msg.value >= request.bounty, "Shipment cost insufficient");
        // uint stakeAmount = request.packageValue / 2;

        ShipmentRequestedParams memory request = ShipmentRequestedParams({ bounty: msg.value });

        Shipment memory shipment = Shipment({
            id: currentId,
            state: ShipmentState.REQUESTED,
            bounty: request.bounty,
            settlementDeadline: block.timestamp + settlementDuration,
            // stake: stakeAmount,
            courier: address(0),
            sender: msg.sender,
            receiver: receiver,
            // paidBy: msg.sender,
            valid: true
        });
        shipments[currentId] = shipment;

        currentId++;

        emit ShipmentRequested(currentId, msg.sender, receiver, request.bounty, block.timestamp + settlementDuration);

        bytes32 uid = eas.attest(
            AttestationRequest({
                schema: REQUESTED_SCHEMA,
                data: AttestationRequestData({
                    recipient: receiver, // No recipient
                    expirationTime: NO_EXPIRATION_TIME, // No expiration time
                    revocable: true,
                    refUID: EMPTY_UID, // No references UI
                    data: abi.encode(request), // Encode request
                    value: 0 // No value/ETH
                })
            })
        );
    }

    /**
     * @dev Pickup a shipment. User must stake ETH equal to package value to start the shipment
     * @param _shipmentId ID of the shipment
     */

    // TODO: This should be a hook to the EAS contract
    function pickUpShipment(uint _shipmentId) internal {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.state == ShipmentState.REQUESTED, "Shipment has already been picked up");
        // require(msg.value >= shipment.stake, "Stake amount insufficient"); REMOVED STAKE FOR HACKATHON

        require(shipment.valid == true, "Shipment is not valid");
        require(shipment.settlementDeadline > block.timestamp, "Shipment has expired");

        pickedUpShipments[_shipmentId] = true;
        shipment.courier = msg.sender;
        // shipment.stake = msg.value;
        shipment.state = ShipmentState.PICKED_UP;
        emit ShipmentPickedUp(_shipmentId, msg.sender);
    }

    /** TODO: Add attestations */
    /**
     * @dev Deliver a shipment. Only the courier can call this. Resolved by EAS.
     * @param _shipmentId ID of the shipment
     */
    function deliverShipment(uint _shipmentId) public payable {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.valid == true, "Shipment is not valid");
        require(shipment.state == ShipmentState.PICKED_UP, "Shipment has already been picked up");
        require(shipment.settlementDeadline > block.number, "Shipment has expired");
        require(shipment.courier == msg.sender, "Sender is not the courier");

        fulfilledShipments[_shipmentId] = true;
        address payable courier = payable(shipment.courier);

        // Return stake to courier
        shipment.state = ShipmentState.DELIVERED;

        emit ShipmentDelivered(_shipmentId, msg.sender);
    }

    /**
     * @dev Complete a shipment. Only the reciever can call this. Resolved by EAS.
     * @param _shipmentId ID of the shipment
     */
    function completeShipment(uint _shipmentId) public payable {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.valid == true, "Shipment is not valid");
        require(shipment.state == ShipmentState.DELIVERED, "Shipment is not yet delivered");
        require(shipment.settlementDeadline > block.number, "Shipment has expired");
        require(shipment.receiver == msg.sender, "Sender is not the receiver");

        fulfilledShipments[_shipmentId] = true;
        address payable courier = payable(shipment.courier);

        shipment.state = ShipmentState.DELIVERED;

        // Return stake to courier
        // courier.transfer(shipment.stake);
        emit ShipmentCompleted(_shipmentId, msg.sender);
    }

    /**
     * Receiver or courier is unhappy, can file a dispute
     */
    function dispute(uint _shipmentId, address disputer) public {
        // TODO
        // Would need to call to an insurance contract and settle things that way
    }

    /**
     * Called by the receiver. Only if the receiver is happy with the shipment, the courier gets paid.
     */
    function disburse(uint _shipmentId) public {
        require(pickedUpShipments[_shipmentId] == true, "Shipment is not picked up");
        require(fulfilledShipments[_shipmentId] == true, "Shipment is not fulfilled");

        Shipment memory shipment = shipments[_shipmentId];
        require(shipment.valid == true, "Shipment is not valid");
        require(shipment.receiver == msg.sender, "Caller is not the receiver");

        // Set it to not valid anymore since its done
        shipment.valid = false;
        shipments[_shipmentId] = shipment;
        withdrawableBalance[shipment.courier] += shipment.bounty;
    }

    /**
     * If nobody did anything after the deadline, then the settlement can be made
     * Anyone can call this. In the future, you can incentivize by giving a cut to the caller
     */
    function settle(uint _shipmentId) public {
        Shipment memory shipment = shipments[_shipmentId];
        require(shipment.valid == true, "Shipment is not valid");
        require(shipment.settlementDeadline <= block.number, "Shipment has not expired");

        shipment.valid = false;
        shipments[_shipmentId] = shipment;

        // If fulfilled but receiver didn't disburse, the withdrawable balance opens for the courier
        if (fulfilledShipments[_shipmentId]) {
            withdrawableBalance[shipment.courier] += shipment.bounty;
        }

        // If picked up but not fulfilled, the withdrawable balance opens for the requester
        // The receiver also earns the stake as a compensation
        if (pickedUpShipments[_shipmentId] && !fulfilledShipments[_shipmentId]) {
            withdrawableBalance[shipment.sender] += shipment.bounty;
        }
    }

    /**
     * Withdraw balance
     */
    function withdraw() public {
        require(withdrawableBalance[msg.sender] > 0, "No withdrawable balance");
        uint amount = withdrawableBalance[msg.sender];
        withdrawableBalance[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
