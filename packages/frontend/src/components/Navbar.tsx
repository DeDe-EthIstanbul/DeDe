/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import { Avatar } from "@ensdomains/thorin";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import Modal from "./Modal";
import PowerModal from "./PowerModal";

interface INavbar {}

const mockData = [
  {
    name: "Successful Delivery",
    points: 10,
  },
  {
    name: "Successful Delivery",
    points: 10,
  },
  {
    name: "Failed Delivery",
    points: -20,
  },
  {
    name: "Failed Delivery",
    points: -20,
  },
  {
    name: "Successful Delivery",
    points: 10,
  },
  {
    name: "Successful Delivery",
    points: 10,
  },
];

export default function Navbar({}: INavbar) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex flex-row items-center justify-between w-full px-6 py-5">
      <img
        src={"/assets/dede_logotype.svg"}
        alt="DeDe"
        className="w-20 h-auto"
      />
      <div className="w-12 h-12" onClick={() => setIsOpen(true)}>
        <Avatar label="User Profile" src={"/assets/profile.png"} />
      </div>
      <PowerModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="font-bold text-xl font-sans text-brand-primary mb-3">
          DeDe Score:
        </p>
        <div className="relative">
          <div className="rounded-lg font-bold items-center justify-center bg-brand-text py-6 px-8 flex flex-col border border-brand-primary z-20">
            {mockData.reduce((acc, curr) => {
              return acc + curr.points;
            }, 0)}
          </div>
          <div className="absolute w-full rounded-lg font-bold items-center justify-center bg-brand-text py-6 px-8 top-0 left-0 flex flex-col border border-brand-primary z-20">
            {mockData.reduce((acc, curr) => acc + curr.points, 0)}
          </div>
          <div className="w-full h-full bg-brand-secondary absolute rounded-lg top-1 left-1 z-10"></div>
        </div>
        <div className="flex flex-row py-4">
          <Link href="/profile">CLICK</Link>
          <div className="flex w-full items-center justify-center">
            Sign in with Worldcoin
          </div>
          Insert Buttons Here
        </div>
        <div className="flex flex-col border-t border-brand-primary py-2">
          {mockData.map((data, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-between py-2 gap-x-8"
              >
                <p className="font-bold font-sans text-brand-primary">
                  {data.name}
                </p>
                <p className={`font-bold font-sans`}>
                  {data.points > 0 ? `+${data.points}` : data.points}
                </p>
              </div>
            );
          })}
        </div>
      </PowerModal>
    </nav>
  );
}
