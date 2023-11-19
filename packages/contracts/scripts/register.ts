import { deployments, ethers, getChainId } from "hardhat";

import { DeDe } from "../typechain";
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";

async function main() {

  // Get Signer
  const [signer] = await ethers.getSigners();
  const chainId = await getChainId();

  let schemaRegistryContractAddress;


  if (chainId == '11155111') {
    schemaRegistryContractAddress = '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0';
  } else if (chainId == '84531') {
    // base testnet
    schemaRegistryContractAddress = '0x4200000000000000000000000000000000000020';
  } else if (chainId == '534353') {
    // scroll testnet
    schemaRegistryContractAddress = '0x0000000000000000000000000000000000000001';
    console.log('EAS schema registry not available on Scroll Testnet');
  } else if (chainId == '59140') {
    // linea testnet
    schemaRegistryContractAddress = '0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797';
  } else if (chainId == '5001') {
    // mantle testnet
    schemaRegistryContractAddress = '0x0000000000000000000000000000000000000001';
    console.log('EAS schema registry not available on Mantle Testnet');
  } else if (chainId == '10200') {
    // gnosis testnet
    schemaRegistryContractAddress = '0x0000000000000000000000000000000000000001';
    console.log('EAS schema registry not available on Gnosis Testnet');
  } else if (chainId == '421613') {
    // arbitrum testnet
    schemaRegistryContractAddress = '0xaEF4103A04090071165F78D45D83A0C0782c2B2a';
  } else if (chainId == '80001') {
    // mumbai testnet
    schemaRegistryContractAddress = '0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797';
  } else {
    schemaRegistryContractAddress = '0x0000000000000000000000000000000000000001';
    console.log('EAS schema registry not available on this network');
  }

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

  schema = "uint bounty, uint deliveryIndex";
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
