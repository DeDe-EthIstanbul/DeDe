import { deployments, ethers } from "hardhat";

import { DeDe } from "../typechain";

async function getContract(contractName: string) {
  return await ethers.getContractAt(contractName, (await deployments.get(contractName)).address);
}

async function main() {

  // Get Signer
  const [signer] = await ethers.getSigners();

  // Get DeDe contract
  let dede: DeDe = (await ethers.getContractAt("DeDe", "0x5B9Ef821d9e80B977Fd92255402caF83CdBa605B")) as DeDe;
  dede = dede.connect(signer);
  let result = await dede.requestShipment("0x5B9Ef821d9e80B977Fd92255402caF83CdBa605B", { value: ethers.utils.parseEther("0.0001") })
  console.log("🚀 | main | result:", result)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
