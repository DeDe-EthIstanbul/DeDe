import 'dotenv/config';

import { ethers } from 'hardhat';

module.exports = async ({ getNamedAccounts, deployments, getChainId }: any) => {
  const { deploy, read, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  let contract = await deploy('DeDe', {
    from: deployer,
    log: true,
    args: [0, 0], //TODO: set correct values
  });


};

module.exports.tags = ['DeDe'];
