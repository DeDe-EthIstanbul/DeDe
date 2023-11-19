import { Disclosure } from "@headlessui/react";
/* eslint-disable @next/next/no-img-element */
import LocationIcon from "@/icons/location";
import StarIcon from "@/icons/star";
import { useSigner } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Tooltip, TooltipProps } from "@ensdomains/thorin";
import clsx from "clsx";

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
  const router = useRouter();
  const currentDeDeScore = 50;

  return (
    <div className="flex flex-col relative">
      {/* <div className="w-full h-full bg-brand-secondary absolute rounded-lg top-1 left-1"></div> */}
      <Disclosure>
        <Disclosure.Button className="flex flex-col w-full bg-brand-text rounded-t-lg rounded-b-lg ui-open:rounded-b-none px-4 py-3 gap-y-3 border-brand-primary border">
          <div className="flex flex-row w-full items-center justify-between">
            <p className="font-bold font-sans">Parcel Delivery</p>
            <p className="font-bold font-sans text-brand-success">{revenue}</p>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex flex-col basis-1/2 items-start">
              <div className="flex flex-row items-center">
                <LocationIcon className="h-4 mr-2 fill-brand-primary" />
                <p className="font-sans text-sm">Pick Up</p>
              </div>
              <p className="font-bold font-sans text-sm">{pickUp}</p>
            </div>
            <div className="flex flex-col basis-1/2 items-start">
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
          <Tooltip
            additionalGap={0}
            content={
              currentDeDeScore >= dedeScore ? (
                <p className="font-sans text-center">You can accept this job</p>
              ) : (
                <p className="font-sans text-center">
                  Your DeDe score is too low
                </p>
              )
            }
            mobilePlacement="top"
            mobileWidth={250}
            placement="top"
            targetId="buttonIdTop"
            width={250}
          >
            <button
              className={clsx(
                "font-bold w-full rounded-lg py-3 text-white font-sans",
                currentDeDeScore >= dedeScore
                  ? "bg-brand-primary"
                  : "bg-brand-secondary cursor-not-allowed"
              )}
              onClick={() => {
                if (currentDeDeScore >= dedeScore) {
                  router.push("/courier/pickup");
                } else {
                  toast.error(
                    "You do not have enough DeDe Score to pick up this job!"
                  );
                }
              }}
            >
              Pick Up
            </button>
          </Tooltip>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}
