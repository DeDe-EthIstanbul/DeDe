/* eslint-disable @next/next/no-img-element */
import { ConnectWallet, lightTheme, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Avatar } from "@ensdomains/thorin";
import LocationIcon from "@/icons/location";
import JobDetails from "@/components/JobDetails";

const mockData = [
  {
    pickUp: "New York, 45700",
    dropOff: "New York, 45700",
    revenue: "Ξ 0.024",
    userRating: "4.2",
    dedeScore: 250,
    distance: 87,
  },
  {
    pickUp: "New York, 45700",
    dropOff: "New York, 45700",
    revenue: "Ξ 0.024",
    userRating: "4.2",
    dedeScore: 250,
    distance: 87,
  },
  {
    pickUp: "New York, 45700",
    dropOff: "New York, 45700",
    revenue: "Ξ 0.024",
    userRating: "4.2",
    dedeScore: 250,
    distance: 87,
  },
  {
    pickUp: "New York, 45700",
    dropOff: "New York, 45700",
    revenue: "Ξ 0.024",
    userRating: "4.2",
    dedeScore: 250,
    distance: 87,
  },
  {
    pickUp: "New York, 45700",
    dropOff: "New York, 45700",
    revenue: "Ξ 0.024",
    userRating: "4.2",
    dedeScore: 250,
    distance: 87,
  },
];

export default function CourierHome() {
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
    </main>
  );
}
