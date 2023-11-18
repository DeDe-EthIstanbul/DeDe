/* eslint-disable @next/next/no-img-element */
import { ConnectWallet, lightTheme, useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import Web3Inbox from "@/components/Web3Inbox";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

export default function Home() {
  const [type, setType] = useState<"user" | "courier" | undefined>();
  const address = useAddress();
  const { address: wcAccount, isConnecting, isDisconnected } = useAccount();
  const router = useRouter();
  const { open } = useWeb3Modal();

  return (
    <main className="min-h-screen min-w-screen overflow-auto flex flex-col bg-brand-background text-brand-primary">
      <Navbar />
      <div className="flex flex-col px-6 py-6">
        <p className="font-bold font-sans text-xl">Notifications</p>
        <p className="font-sans">
          This is where your notifications will live. You have the option to opt
          in/out of these notifications.
        </p>
        <div className="my-4">
          <Web3Inbox />
        </div>
      </div>
    </main>
  );
}
