import 'dotenv/config';

import { ethers } from 'hardhat';

module.exports = async ({ getNamedAccounts, deployments, getChainId }: any) => {
  const { deploy, read, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();


  let EAS_ADDRESS;

  if (chainId == '11155111') {
    EAS_ADDRESS = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
  } else if (chainId == '42') { // base testnet
    EAS_ADDRESS = '0x4200000000000000000000000000000000000021';
  } else if (chainId == '42') { // scroll testnet
    EAS_ADDRESS = '0x0000000000000000000000000000000000000000';
    console.log('EAS Not available on Scroll Testnet')
  } else if (chainId == '42') { // linea testnet
    EAS_ADDRESS = '0xaEF4103A04090071165F78D45D83A0C0782c2B2a';
  } else if (chainId == '42') { // mantle testnet
    EAS_ADDRESS = '0x0000000000000000000000000000000000000000';
    console.log('EAS Not available on Mantle Testnet');
  } else if (chainId == '10200') { // gnosis testnet
    EAS_ADDRESS = '0x0000000000000000000000000000000000000000';
    console.log('EAS Not available on Gnosis Testnet');
  } else if (chainId == '421613') { // arbitrum testnet
    EAS_ADDRESS = '0xaEF4103A04090071165F78D45D83A0C0782c2B2a';
  } else if (chainId == '80001') { // mumbai testnet
    EAS_ADDRESS = '0xaEF4103A04090071165F78D45D83A0C0782c2B2a';
  } else {
    EAS_ADDRESS = '0x0000000000000000000000000000000000000000';
    console.log('EAS Not available on this network');
  }



  let contract = await deploy('DeDe', {
    from: deployer,
    log: true,
    args: [0, 0, EAS_ADDRESS], //TODO: set correct values
  });


};

module.exports.tags = ['DeDe'];
