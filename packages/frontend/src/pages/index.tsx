/* eslint-disable @next/next/no-img-element */
import { ConnectWallet, lightTheme, useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export default function Home() {
  const [type, setType] = useState<"user" | "courier" | undefined>();
  const address = useAddress();
  const { address: wcAccount, isConnecting, isDisconnected } = useAccount();
  const router = useRouter();
  const { open } = useWeb3Modal();

  useEffect(() => {
    if (address || wcAccount) {
      router.push(`/courier`);
    }
  }, [type, address, router]);

  return (
    <main className="min-h-screen min-w-screen overflow-auto flex flex-col justify-between py-14 bg-brand-background text-brand-primary">
      <div className="flex flex-col items-center">
        <img src={"/assets/dede_logo.png"} alt="DeDe" className="px-16" />
        <img
          src={"/assets/dede_logotype.svg"}
          alt="DeDe"
          className="mt-12 w-40 h-auto"
        />
        <h1 className="mt-7 font-sans">Your Decentralized Delivery Network</h1>
      </div>
      <div className="flex flex-col items-center w-full gap-y-5">
        <div
          className="w-full items-center justify-center flex flex-row"
          onClick={() => setType("user")}
        >
          <ConnectWallet
            theme={lightTheme({
              colors: {
                modalBg: "#FEFEF2",
                dropdownBg: "#FEFEF2",
                primaryText: "#022D36",
                secondaryText: "#659098",
                borderColor: "#023039",
                separatorLine: "#023039",
                accentText: "#023039",
                accentButtonBg: "#023039",
                danger: "#F75C5A",
                success: "#30a46c",
                primaryButtonBg: "#022D36",
                accentButtonText: "#FFFEF1",
                primaryButtonText: "#FFFEF1",
                secondaryButtonBg: "#97CED9",
                secondaryButtonText: "#023039",
                connectedButtonBg: "#FFFEF1",
                secondaryButtonHoverBg: "#659098",
              },
              fontFamily: "Poppins, sans-serif",
            })}
            btnTitle={"Sign In With Email"}
            modalTitle={"Sign In To DeDe"}
            switchToActiveChain={true}
            modalSize={"compact"}
            modalTitleIconUrl={"/assets/dede_logo.png"}
            className="font-bold py-3 w-full font-sans"
          />
        </div>
        <button
          onClick={() => open()}
          className="font-bold w-full rounded-lg py-3 text-brand-primary font-sans"
        >
          Sign In With WalletConnect
        </button>
      </div>
    </main>
  );
}
