import { deployments, ethers } from "hardhat";

import { DeDe } from "../typechain";
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";

async function main() {

  // Get Signer
  const [signer] = await ethers.getSigners();

  // let schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0";
  let schemaRegistryContractAddress = "0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797"
  const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
  //@ts-ignore
  schemaRegistry.connect(signer);

  // Create schemas:


  //   struct ShipmentRequestedParams {
  //     uint bounty;
  // }

  // struct ShipmentPickedUpParams {
  //     bytes32 shipmentId; // Attestation UID provided by the EAS from Shipment Request
  //     bytes32 senderSignature; // Sender ECDSA signature of the shipmentId (using ARX) 
  // }

  // struct ShipmentDeliveredParams {
  //     bytes32 shipmentId; // Attestation UID provided by the EAS from Shipment Request
  //     bytes32 receiverSignature; // Receiver ECDSA signature of the shipmentId (using ARX)
  // }

  // struct ShipmentCompletedParams {
  //     bytes32 shipmentId; // Attestation UID provided by the EAS from Shipment Request
  // }
  let schema, resolverAddress, revocable, transaction

  schema = "uint bounty";
  resolverAddress = "0x0000000000000000000000000000000000000000"
  revocable = true;



  try {
    transaction = await schemaRegistry.register({
      schema,
      resolverAddress,
      revocable,
    });
    let tx = await transaction.wait();
    console.log("🚀 | main | tx:", tx)
  } catch (error) {
    console.log("🚀 | main | error:", error)
  }

  schema = "bytes32 shipmentId, bytes32 senderSignature";
  resolverAddress = ((await deployments.get("DeDe")).address);
  revocable = true;



  try {
    transaction = await schemaRegistry.register({
      schema,
      resolverAddress,
      revocable,
    });
    let tx = await transaction.wait();
    console.log("🚀 | main | tx:", tx)
  } catch (error) {
    console.log("🚀 | main | error:", error)
  }

  schema = "bytes32 shipmentId, bytes32 receiverSignature";
  resolverAddress = ((await deployments.get("DeDe")).address);
  revocable = true;


  try {
    transaction = await schemaRegistry.register({
      schema,
      resolverAddress,
      revocable,
    });

    let tx = await transaction.wait();
    console.log("🚀 | main | tx:", tx)
  } catch (error) {
    console.log("🚀 | main | error:", error)
  }

  schema = "bytes32 shipmentId";
  resolverAddress = ((await deployments.get("DeDe")).address);
  revocable = true;

  try {
    transaction = await schemaRegistry.register({
      schema,
      resolverAddress,
      revocable,
    });
    let tx = await transaction.wait();
    console.log("🚀 | main | tx:", tx)
  } catch (error) {
    console.log("🚀 | main | error:", error)
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
