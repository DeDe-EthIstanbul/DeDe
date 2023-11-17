import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 1,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 4,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      chainId: 5,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    matic: {
      url: "https://polygon-rpc.com/",
      chainId: 137,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      chainId: 80001,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    optimism_mainnet: {
      url: "https://mainnet.optimism.io",
      chainId: 10,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    optimism_testnet: {
      url: "https://goerli.optimism.io",
      chainId: 420,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    arbitrum_mainnet: {
      url: "https://arb1.arbitrum.io/rpc",
      chainId: 42161,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    arbitrum_testnet: {
      url: "https://goerli-rollup.arbitrum.io/rpc",
      chainId: 421613,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    cronos_testnet: {
      url: `https://evm-t3.cronos.org`,
      chainId: 338,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    cronos_mainnet: {
      url: `https://mainnet.cronoslabs.com/v1/55e37d8975113ae7a44603ef8ce460aa/`,
      chainId: 25,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      blockGasLimit: 1000000000000,
    },
    scroll_testnet: {
      url: "https://alpha-rpc.scroll.io/l2",
      chainId: 534353,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    metis_testnet: {
      url: "https://goerli.gateway.metisdevops.link",
      chainId: 599,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    base_testnet: {
      url: "https://goerli.base.org",
      chainId: 84531,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    mantle_testnet: {
      url: "https://rpc.testnet.mantle.xyz",
      chainId: 5001,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    taiko_testnet: {
      url: "https://rpc.test.taiko.xyz",
      chainId: 167005,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
      gasPrice: 5,
    },
    gnosis: {
      url: "https://rpc.gnosischain.com/",
      chainId: 100,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
      gasPrice: 3000000000,
    },
    gnosis_testnet: {
      url: "https://rpc.chiadochain.net",
      chainId: 10200,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    sepolia: {
      url: "https://rpc.sepolia.org",
      chainId: 11155111,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
    thundercore_testnet: {
      url: "https://testnet-rpc.thundercore.com",
      chainId: 18,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // saveDeployments: true,
    },
  },
};

export default config;
