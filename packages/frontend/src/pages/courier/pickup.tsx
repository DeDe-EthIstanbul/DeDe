/* eslint-disable @next/next/no-img-element */
import { ConnectWallet, lightTheme, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Avatar } from "@ensdomains/thorin";
import LocationIcon from "@/icons/location";
import JobDetails from "@/components/JobDetails";
import Navbar from "@/components/Navbar";

export default function CourierPickup() {
  const [type, setType] = useState<"user" | "courier" | undefined>();
  const address = useAddress();
  const router = useRouter();

  useEffect(() => {
    console.log({ address });
    if (type && address) {
      router.push(`/${type}`);
    }
  }, [type, address, router]);

  return (
    <main className="min-h-screen min-w-screen overflow-auto flex flex-col bg-brand-background text-brand-primary">
      <Navbar />
      <div className="flex flex-col w-full items-center justify-center px-6">
        <h1 className="font-bold text-xl font-sans mt-4">
          Tap Pick Up NFC Tag
        </h1>
        <p className="font-sans text-center my-12">
          You can find the NFC tag on the locker box of your pickup location.
        </p>
        <div className="flex rounded-lg overflow-hidden">
          <video autoPlay muted loop playsInline>
            <source src="https://cdn.shopify.com/videos/c/o/v/dec57e414a004196b03a49f3fafc4e7c.mp4" />
          </video>
        </div>
        <button className="font-bold w-full bg-brand-primary rounded-lg py-3 text-brand-text font-sans mt-14">
          Initiate Scan
        </button>
      </div>
    </main>
  );
}
