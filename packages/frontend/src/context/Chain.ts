import { OptimismGoerli } from "@thirdweb-dev/chains";
import { createContext } from "react";

const ChainContext = createContext({
  selectedChain: OptimismGoerli,
  setSelectedChain: (chain: any) => {},
});

export default ChainContext;
