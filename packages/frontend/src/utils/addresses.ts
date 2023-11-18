import { SignerOrProvider, useChainId, useSigner } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

import { Contract } from "ethers";

export const getDeDeContractAddress = (
  chainId: number | undefined
): string | undefined => {
  let contractAddress = "";

  if (chainId === undefined) {
    // throw new Error('chainId is undefined');
    return undefined;
  }

  switch (chainId) {
    case 42: // Mantle
      contractAddress = "0xdf48692003Dd581b7E3715A26a6244f49B2e56da"; // Replace with the actual Mainnet contract address
      break;
    case 5001: // Ropsten
      contractAddress = "0x0987654321"; // Replace with the actual Ropsten contract address
      break;
    case 80001: // Mumbai
      contractAddress = "0xdf48692003Dd581b7E3715A26a6244f49B2e56da"; // Replace with the actual Mumbai contract address
      break;
    case 11155111: // Sepolia
      contractAddress = "0x4f361a3b293130E1c13A7B780eb49764a6F7B7DB"; // Replace with the actual Sepolia contract address
      break;
    case 84531: // Base
      contractAddress = "0xdf48692003Dd581b7E3715A26a6244f49B2e56da"; // Replace with the actual Base contract address
      break;
    case 534353: // Scroll
      contractAddress = "0xdf48692003Dd581b7E3715A26a6244f49B2e56da"; // Replace with the actual Scroll contract address
      break;
    case 59140: // Linea
      contractAddress = "0xdf48692003Dd581b7E3715A26a6244f49B2e56da"; // Replace with the actual Linea contract address
      break;
    case 10200: // Gnosis
      contractAddress = "0x1234567890"; // Replace with the actual Gnosis contract address
      break;
    case 421613: // Arbitrum
      contractAddress = "0x1234567890"; // Replace with the actual Arbitrum contract address
      break;
    case 5: // Goerli
      contractAddress = "0x1234567890"; // Replace with the actual Goerli contract address
      break;
    case 44787: // Celo
      contractAddress = "0xdf48692003Dd581b7E3715A26a6244f49B2e56da"; // Replace with the actual Goerli contract address
      break;
    case 1442: // Polygon zkEVM
      contractAddress = "0x1234567890"; // Replace with the actual Goerli contract address
      break;
    // Add more cases for other chainIds if needed
    default:
      throw new Error(`Unsupported chainId: ${chainId}`);
  }

  return contractAddress;
};

export function useDedeContract() {
  const chainId: number | undefined = useChainId();
  const [contract, setContract] = useState<string>();
  useEffect(() => {
    if (!chainId) {
      return;
    }
    try {
      let address = getDeDeContractAddress(chainId);
      setContract(address);
    } catch (error) {
      console.error(error);
    }
  }, [chainId]);

  return contract;
}
