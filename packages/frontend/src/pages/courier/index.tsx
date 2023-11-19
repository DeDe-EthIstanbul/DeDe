/* eslint-disable @next/next/no-img-element */
import { ConnectWallet, lightTheme, useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

import { Avatar } from "@ensdomains/thorin";
import Image from "next/image";
import JobDetails from "@/components/JobDetails";
import LocationIcon from "@/icons/location";
// import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import { useDeliveryRequestAttestations } from "@/utils/graph";
import { useRouter } from "next/router";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

const mockData = [
  {
    pickUp: "Nusr-Et, 34367",
    dropOff: "Galata Kulesi, 34421",
    revenue: "Ξ 0.008",
    userRating: "4.1",
    dedeScore: 50,
    distance: 4,
  },
  {
    pickUp: "Texas, USA",
    dropOff: "Sacramento, USA",
    revenue: "Ξ 0.224",
    userRating: "4.2",
    dedeScore: 250,
    distance: 2210,
  },
  {
    pickUp: "Kuala Lumpur, MY",
    dropOff: "Clarke Quay, SG",
    revenue: "Ξ 0.084",
    userRating: "3.8",
    dedeScore: 25,
    distance: 230,
  },
  {
    pickUp: "Penang, MY",
    dropOff: "Malacca, MY",
    revenue: "Ξ 0.044",
    userRating: "4.5",
    dedeScore: 30,
    distance: 225,
  },
  {
    pickUp: "Subang Jaya, 47610",
    dropOff: "Petaling Jaya, 47500",
    revenue: "Ξ 0.013",
    userRating: "4.8",
    dedeScore: 10,
    distance: 24,
  },
];

export default function CourierHome() {
  const [type, setType] = useState<"user" | "courier" | undefined>();
  const address = useAddress();
  const router = useRouter();

  let requests = useDeliveryRequestAttestations();
  console.log("🚀 | CourierHome | requests:", requests);

  useEffect(() => {
    console.log({ address });
    if (type && address) {
      router.push(`/${type}`);
    }
  }, [type, address, router]);

  return (
    <main className="min-h-screen min-w-screen overflow-auto flex flex-col bg-brand-background text-brand-primary">
      <Navbar />
      <div className="flex flex-col px-6">
        <h1 className="font-bold text-xl font-sans mt-4">Available Jobs</h1>
        <div className="flex flex-col py-4 gap-y-4">
          {mockData.map((data, index) => {
            return (
              <JobDetails
                key={index}
                pickUp={data.pickUp}
                dropOff={data.dropOff}
                revenue={data.revenue}
                userRating={data.userRating}
                dedeScore={data.dedeScore}
                distance={data.distance}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
