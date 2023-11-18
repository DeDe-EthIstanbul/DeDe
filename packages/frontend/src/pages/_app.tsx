import "@/styles/globals.css";
import { ThemeProvider } from "styled-components";
import { ThorinGlobalStyles, lightTheme } from "@ensdomains/thorin";
import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  ConnectWallet,
  embeddedWallet,
  smartWallet,
  safeWallet,
} from "@thirdweb-dev/react";
import {
  OptimismGoerli,
  TaikoJolnirL2,
  MantleTestnet,
  ArbitrumSepolia,
  PolygonZkevmTestnet,
  LineaTestnet,
  ScrollSepoliaTestnet,
  GnosisChiadoTestnet,
  CeloAlfajoresTestnet,
  BaseSepoliaTestnet,
} from "@thirdweb-dev/chains";
import { useState } from "react";
import ChainContext from "@/context/Chain";

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
  const [selectedChain, setSelectedChain] = useState<any>(ArbitrumSepolia);

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      <ThirdwebProvider
        supportedWallets={[
          smartWallet(
            embeddedWallet({
              auth: {
                options: ["email", "google"],
              },
            }),
            config
          ),
          safeWallet({
            personalWallets: [
              embeddedWallet({
                auth: {
                  options: ["email", "google"],
                },
              }),
            ],
          }),
        ]}
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        activeChain={selectedChain}
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
      </ThirdwebProvider>
    </ChainContext.Provider>
  );
}
