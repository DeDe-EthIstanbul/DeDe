import { Disclosure } from "@headlessui/react";
/* eslint-disable @next/next/no-img-element */
import LocationIcon from "@/icons/location";
import StarIcon from "@/icons/star";
import { useSigner } from "@thirdweb-dev/react";
import Link from "next/link";

interface IJobDetails {
  pickUp: string;
  dropOff: string;
  revenue: string;
  dedeScore: number;
  distance: number;
  userRating: string;
  className?: string;
}

export default function JobDetails({
  pickUp,
  dropOff,
  revenue,
  dedeScore,
  distance,
  userRating,
}: IJobDetails) {
  let signer = useSigner();

  return (
    <div className="flex flex-col relative">
      {/* <div className="w-full h-full bg-brand-secondary absolute rounded-lg top-1 left-1"></div> */}
      <Disclosure>
        <Disclosure.Button className="flex flex-col w-full bg-brand-text rounded-t-lg rounded-b-lg ui-open:rounded-b-none px-4 py-3 gap-y-3 border-brand-primary border">
          <div className="flex flex-row w-full items-center justify-between">
            <p className="font-bold font-sans">Parcel Delivery</p>
            <p className="font-bold font-sans text-brand-success">{revenue}</p>
          </div>
          <div className="flex flex-row w-full items-center">
            <div className="flex flex-col basis-1/2">
              <div className="flex flex-row items-center">
                <LocationIcon className="h-4 mr-2 fill-brand-primary" />
                <p className="font-sans text-sm">Pick Up</p>
              </div>
              <p className="font-bold font-sans text-sm">{pickUp}</p>
            </div>
            <div className="flex flex-col basis-1/2">
              <div className="flex flex-row items-center">
                <LocationIcon className="h-4 mr-2 fill-brand-primary" />
                <p className="font-sans text-sm">Drop Off</p>
              </div>
              <p className="font-bold font-sans text-sm">{dropOff}</p>
            </div>
          </div>
        </Disclosure.Button>
        <Disclosure.Panel className="flex flex-col w-full bg-brand-text rounded-b-lg px-4 py-3 gap-y-3 border-t-0 border-brand-primary border">
          <div className="grid grid-cols-2 w-full gap-3">
            <div className="flex flex-col">
              <p className="font-bold font-sans">User Rating</p>
              <div className="flex flex-row items-center gap-x-1">
                <p className="font-sans">{userRating}</p>
                <StarIcon className="fill-brand-accent w-4" />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="font-bold font-sans">Distance</p>
              <p className="font-sans">{distance} km</p>
            </div>
            <div className="flex flex-col col-span-2">
              <p className="font-bold font-sans">Minimum DeDe Score Required</p>
              <p className="font-sans">{dedeScore} DeDe</p>
            </div>
          </div>
          <Link href="/courier/pickup">
            <button className="font-bold w-full bg-brand-primary rounded-lg py-3 text-white font-sans">
              Pick Up
            </button>
          </Link>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}
