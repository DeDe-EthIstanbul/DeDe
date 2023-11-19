import 'dotenv/config';

import { ethers } from 'hardhat';
import hre from 'hardhat'
import { task } from 'hardhat/config';

module.exports = async ({ getNamedAccounts, deployments, getChainId, task }: any) => {
  const { deploy, read, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  let EAS_ADDRESS;
  let WORLD_ID_ADDRESS;
  let PUSH_COMM_ADDRESS;

  if (chainId == '11155111') {
    EAS_ADDRESS = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
  } else if (chainId == '84531') {
    // base testnet
    EAS_ADDRESS = '0x4200000000000000000000000000000000000021';
  } else if (chainId == '534353') {
    // scroll testnet
    EAS_ADDRESS = '0x0000000000000000000000000000000000000001';
    console.log('EAS Not available on Scroll Testnet');
  } else if (chainId == '59140') {
    // linea testnet
    EAS_ADDRESS = '0xaEF4103A04090071165F78D45D83A0C0782c2B2a';
  } else if (chainId == '5001') {
    // mantle testnet
    EAS_ADDRESS = '0x0000000000000000000000000000000000000001';
    console.log('EAS Not available on Mantle Testnet');
  } else if (chainId == '10200') {
    // gnosis testnet
    EAS_ADDRESS = '0x0000000000000000000000000000000000000001';
    console.log('EAS Not available on Gnosis Testnet');
  } else if (chainId == '421613') {
    // arbitrum testnet
    EAS_ADDRESS = '0xaEF4103A04090071165F78D45D83A0C0782c2B2a';
  } else if (chainId == '80001') {
    // mumbai testnet
    EAS_ADDRESS = '0xaEF4103A04090071165F78D45D83A0C0782c2B2a';
  } else {
    EAS_ADDRESS = '0x0000000000000000000000000000000000000001';
    console.log('EAS Not available on this network');
  }

  if (chainId == '5') {
    // goerli testnet
    WORLD_ID_ADDRESS = '0x11cA3127182f7583EfC416a8771BD4d11Fae4334';
  } else if (chainId == '84531') {
    // base testnet
    WORLD_ID_ADDRESS = '0x78ec127a3716d447f4575e9c834d452e397ee9e1';
  } else if (chainId == '80001') {
    // mumbai testnet
    WORLD_ID_ADDRESS = '0x719683F13Eeea7D84fCBa5d7d17Bf82e03E3d260';
  } else {
    WORLD_ID_ADDRESS = '0x0000000000000000000000000000000000000001';
    console.log('WORLD ID Not available on this network');
  }

  if (chainId == '80001') {
    PUSH_COMM_ADDRESS = '0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa'
  } else {
    PUSH_COMM_ADDRESS = '0x0000000000000000000000000000000000000000';
    console.log('PUSH COMM Not available on this network');
  }


  let contract = await deploy('DeDe', {
    from: deployer,
    log: true,
    args: [0, EAS_ADDRESS, WORLD_ID_ADDRESS, PUSH_COMM_ADDRESS], //TODO: set correct values
  });

  // Verify the contract using hardhat verify task
  await hre.run("verify:verify", {
    address: contract.address,
    constructorArguments: [0, EAS_ADDRESS, WORLD_ID_ADDRESS, PUSH_COMM_ADDRESS],
  });

};

module.exports.tags = ['DeDe'];
