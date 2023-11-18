import "@/styles/globals.css";

import {
  ArbitrumSepolia,
  BaseSepoliaTestnet,
  CeloAlfajoresTestnet,
  GnosisChiadoTestnet,
  LineaTestnet,
  MantleTestnet,
  Mumbai,
  OptimismGoerli,
  PolygonZkevmTestnet,
  ScrollSepoliaTestnet,
  TaikoJolnirL2,
} from "@thirdweb-dev/chains";
import {
  ConnectWallet,
  ThirdwebProvider,
  embeddedWallet,
  metamaskWallet,
  safeWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import { ThorinGlobalStyles, lightTheme } from "@ensdomains/thorin";
import toast, { Toaster } from "react-hot-toast";

import type { AppProps } from "next/app";
import ChainContext from "@/context/Chain";
import { ThemeProvider } from "styled-components";
import { useState } from "react";

const theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    foreground: "rgba(0, 255, 255, 0.4)",
  },
};

const config = {
  factoryAddress: "0x9fc5491Dc9D5166edeaCB0C10DB1f87F3312202b",
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  gasless: true,
};

export default function App({ Component, pageProps }: AppProps) {
  // const [selectedChain, setSelectedChain] = useState<any>(Mumbai);

  return (
    <UserProvider>
      {/* <ChainContext.Provider value={{ selectedChain, setSelectedChain }}> */}
      <ThirdwebProvider
        supportedWallets={[
          metamaskWallet(),
          smartWallet(
            embeddedWallet({
              auth: {
                options: ["email", "google"],
              },
            }),
            config
          ),
          // safeWallet({
          //   personalWallets: [
          //     embeddedWallet({
          //       auth: {
          //         options: ["email", "google"],
          //       },
          //     }),
          //   ],
          // }),
        ]}
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        activeChain={Mumbai}
        supportedChains={[
          ArbitrumSepolia,
          PolygonZkevmTestnet,
          LineaTestnet,
          ScrollSepoliaTestnet,
          GnosisChiadoTestnet,
          MantleTestnet,
          CeloAlfajoresTestnet,
          BaseSepoliaTestnet,
        ]}
      >
        <ThemeProvider theme={theme}>
          <ThorinGlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
        <Toaster />
      </ThirdwebProvider>
      {/* </ChainContext.Provider> */}
    </UserProvider>
  );
}
