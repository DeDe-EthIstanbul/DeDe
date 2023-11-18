import { Mumbai } from "@thirdweb-dev/chains";
import { createContext } from "react";

const ChainContext = createContext({
  selectedChain: Mumbai,
  setSelectedChain: (chain: any) => { },
});

export default ChainContext;
