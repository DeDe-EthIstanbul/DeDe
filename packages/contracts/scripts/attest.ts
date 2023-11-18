import { deployments, ethers } from "hardhat";

import { DeDe } from "../typechain";

async function getContract(contractName: string) {
  return await ethers.getContractAt(contractName, (await deployments.get(contractName)).address);
}

async function main() {

  // Get Signer
  const [signer] = await ethers.getSigners();

  // Get DeDe contract
  let dede: DeDe = (await ethers.getContractAt("DeDe", "0xcdb2dd3D8b1C8f2b5f8ef735edd6F3eC53E896D3")) as DeDe;
  dede = dede.connect(signer);
  let result = await dede.requestShipment({ bounty: 1, packageValue: 10, receiver: "0xcdb2dd3D8b1C8f2b5f8ef735edd6F3eC53E896D3", sender: "0xcdb2dd3D8b1C8f2b5f8ef735edd6F3eC53E896D3" })
  console.log("🚀 | main | result:", result)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
