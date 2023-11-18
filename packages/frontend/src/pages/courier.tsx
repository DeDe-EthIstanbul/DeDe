/* eslint-disable @next/next/no-img-element */
import { ConnectWallet, lightTheme, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Avatar } from "@ensdomains/thorin";
import LocationIcon from "@/icons/location";

export default function Home() {
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
    <main className="min-h-screen min-w-screen overflow-auto flex flex-col px-6 bg-brand-background text-brand-primary">
      <nav className="flex flex-row items-center justify-between w-full py-5">
        <img
          src={"/assets/dede_logotype.svg"}
          alt="DeDe"
          className="w-20 h-auto"
        />
        <div className="w-12 h-12">
          <Avatar label="User Profile" src={"/assets/profile.png"} />
        </div>
      </nav>
      <h1 className="font-bold text-xl font-sans mt-4">Available Jobs</h1>
      <div className="flex flex-col py-4 gap-y-4">
        <div className="flex flex-col relative">
          <div className="flex flex-col w-full bg-brand-text rounded-lg px-4 py-3 gap-y-3 z-10 border-brand-primary border">
            <div className="flex flex-row w-full items-center justify-between">
              <p className="font-bold font-sans">Parcel Delivery</p>
              <p className="font-bold font-sans text-brand-success">$420.69</p>
            </div>
            <div className="flex flex-row w-full items-center">
              <div className="flex flex-col basis-1/2">
                <div className="flex flex-row items-center">
                  <LocationIcon className="h-4 mr-2 fill-brand-primary" />
                  <p className="font-sans text-sm">Pick Up</p>
                </div>
                <p className="font-bold font-sans text-sm">New York, 45700</p>
              </div>
              <div className="flex flex-col basis-1/2">
                <div className="flex flex-row items-center">
                  <LocationIcon className="h-4 mr-2 fill-brand-primary" />
                  <p className="font-sans text-sm">Drop Off</p>
                </div>
                <p className="font-bold font-sans text-sm">New York, 45700</p>
              </div>
            </div>
          </div>
          <div className="w-full h-full bg-brand-secondary absolute rounded-lg top-1 left-1"></div>
        </div>
      </div>
    </main>
  );
}
