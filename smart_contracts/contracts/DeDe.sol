// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract DeDe {
    uint public settlementDuration;
    uint public stakeAmount;
    uint public currentId;
    mapping (uint => Shipment) public shipments;
    mapping (uint => bool) public pickedUpShipments;
    mapping (uint => bool) public fulfilledShipments;
    mapping (address => uint) public withdrawableBalance;
    address payable public owner;

    struct Shipment {
        uint id;
        uint shipmentCost; // Earnings for courier when shipment is done
        uint settlementDeadline; // When should the receiver accept/dispute the shipment as complete
        uint stake; // Amount courier staked to make this shipment
        address courier;
        address sender;
        address receiver;
        address paidBy;
        bool valid;
    }

    event ShipmentRequested(uint shipmentId, address sender, address receiver);
    event ShipmentPickedUp(uint shipmentId, address courier);
    event ShipmentCompleted(uint shipmentId, address courier);

    constructor(uint _settlementDuration, uint _stakeAmount) payable {
        currentId = 0;
        stakeAmount = _stakeAmount;
        settlementDuration = _settlementDuration;
        owner = payable(msg.sender);
    }

    /**
     * @dev Request a shipment
     */
    function requestShipment(uint _shipmentCost, address _sender, address _receiver) public payable {
        require(msg.value >= _shipmentCost, "Shipment cost insufficient");
        uint id = currentId;
        currentId++;
        uint shipmentId = id;

        Shipment memory shipment = Shipment(shipmentId, _shipmentCost, block.number + settlementDuration, stakeAmount, address(0), _sender, _receiver, msg.sender, true);
        shipments[shipmentId] = shipment;
        emit ShipmentRequested(shipmentId, _sender, _receiver);
    }

    /**
     * @dev Pickup a shipment
     */
    function pickUpShipment(uint _shipmentId) public payable {
        require(pickedUpShipments[_shipmentId] == false, "Shipment has already been picked up");
        require(fulfilledShipments[_shipmentId] == false, "Shipment has already been fulfilled");
        require(msg.value >= stakeAmount, "Stake amount insufficient");

        Shipment memory shipment = shipments[_shipmentId];
        require(shipment.valid == true, "Shipment is not valid");
        require(shipment.settlementDeadline > block.number, "Shipment has expired");

        pickedUpShipments[_shipmentId] = true;
        shipment.courier = msg.sender;
        shipment.stake = msg.value;
        shipments[_shipmentId] = shipment;
        emit ShipmentPickedUp(_shipmentId, msg.sender);
    }

    /** TODO: Add attestations */
    function completeShipment(uint _shipmentId) public payable {
        require(pickedUpShipments[_shipmentId] == true, "Shipment has not been picked up");
        require(fulfilledShipments[_shipmentId] == false, "Shipment has already been fulfilled");

        Shipment memory shipment = shipments[_shipmentId];
        require(shipment.valid == true, "Shipment is not valid");
        require(shipment.settlementDeadline > block.number, "Shipment has expired");
        require(shipment.courier == msg.sender, "Sender is not the courier");

        fulfilledShipments[_shipmentId] = true;
        address payable courier = payable(shipment.courier);

        // Return stake to courier
        courier.transfer(shipment.stake);
        shipments[_shipmentId] = shipment;
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
        withdrawableBalance[shipment.courier] += shipment.shipmentCost;
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
            withdrawableBalance[shipment.courier] += shipment.shipmentCost;
        }

        // If picked up but not fulfilled, the withdrawable balance opens for the sender
        if (pickedUpShipments[_shipmentId] && !fulfilledShipments[_shipmentId]) {
            withdrawableBalance[shipment.sender] += shipment.shipmentCost;
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
