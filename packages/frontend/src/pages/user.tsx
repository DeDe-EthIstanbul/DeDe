/* eslint-disable @next/next/no-img-element */
import {
  ConnectWallet,
  lightTheme,
  useAddress,
  useChainId,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

import { Avatar } from "@ensdomains/thorin";
import BouncingLoader from "@/components/BouncingLoader";
import Image from "next/image";
import LocationIcon from "@/icons/location";
import Modal from "@/components/Modal";
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Spinner } from "@ensdomains/thorin";
// import DeDe Abi
import dedeAbi from "../utils/DeDeABI.json";
import dynamic from "next/dynamic";
import { getDeDe } from "../generated";
import { useEAS } from "@/utils/attestations";
import { useRouter } from "next/router";
import { utils } from "ethers";

// import { useDedeContract } from "@/utils/addresses";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

export default function UserHome() {
  const [loading, setLoading] = useState(false);
  const [inTransaction, setInTransaction] = useState(false);
  const [pickup, setPickup] = useState<string | undefined>();
  const [dropoff, setDropoff] = useState<string | undefined>();
  const [cost, setCost] = useState<string | undefined>();
  const [estimatedCost, setEstimatedCost] = useState<string>("0.00");
  const [isOpen, setIsOpen] = useState(false);
  const chainId = useChainId();
  console.log("🚀 | UserHome | chainId:", chainId);

  let eas = useEAS();
  console.log(eas);

  let dede;

  if (chainId) {
    dede = getDeDe({ chainId: chainId as any });
    console.log("🚀 | UserHome | dede:", dede);
  }
  let { contract } = useContract(dede?.address, dedeAbi);
  console.log("🚀 | UserHome | dede?.address:", dede?.address);

  let { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "requestShipment"
  );

  useEffect(() => {
    if (pickup && dropoff && !loading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setEstimatedCost((Math.random() * 0.03).toFixed(4));
      }, 1000);
    }
  }, [pickup, dropoff]);

  useEffect(() => {
    if (error) {
      setInTransaction(false);
    }
  }, [error]);

  async function handleConfirmJob() {
    console.log("🚀 | handleConfirmJob | error:", error);
    console.log("🚀 | handleConfirmJob | isLoading:", isLoading);

    setInTransaction(true);
    let { receipt } = await mutateAsync({
      args: ["0x6860542E55Fb9292e4c8b478FcEec724d3351C2e"],
      overrides: {
        value: utils.parseEther(cost || "0.00"),
      },
    });
    setInTransaction(false);
  }
  return (
    <main className="min-h-screen min-w-screen overflow-auto flex flex-col bg-brand-background text-brand-primary">
      <Navbar />

      <div className="relative w-full h-full">
        <img
          src={"/assets/map.png"}
          alt="Map"
          className="w-full h-auto absolute top-0 left-0"
        />
        <div className="relative flex flex-col">
          <div className="absolute flex flex-col w-[90%] left-1/2 transform -translate-x-1/2 z-1">
            <div className="flex flex-col rounded-lg bg-brand-text border border-brand-primary p-4 z-10">
              <div className="flex flex-row items-center">
                <LocationIcon className="h-4 fill-brand-primary" />
                <input
                  type="text"
                  placeholder="Enter your pick up location"
                  className="w-full rounded-lg px-3 py-2 placeholder:text-brand-secondary bg-transparent text-brand-primary"
                  onChange={(e) => setPickup(e.target.value)}
                />
              </div>
              <hr className="h-[2px] my-2" />
              <div className="flex flex-row items-center">
                <LocationIcon className="h-4 fill-brand-danger" />
                <input
                  type="text"
                  placeholder="Enter your drop off location"
                  className="w-full rounded-lg px-3 py-2 placeholder:text-brand-secondary bg-transparent text-brand-primary"
                  onChange={(e) => setDropoff(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full h-full bg-brand-secondary absolute rounded-lg top-1 left-1 z-4"></div>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col w-full rounded-t-lg bg-brand-text border border-brand-primary p-6 bottom-0">
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold font-sans text-lg text-brand-primary">
            Estimated Cost
          </p>
          {loading ? (
            <Spinner />
          ) : (
            <p className="font-bold font-sans text-lg text-brand-secondary">
              ~ Ξ {estimatedCost}
            </p>
          )}
        </div>
        <input
          type="text"
          placeholder="Enter your best offer"
          className="w-full rounded-lg border border-brand-primary p-3 placeholder:text-brand-secondary my-4 text-brand-primary"
          onChange={(e) => setCost(e.target.value)}
        />
        <button
          className="font-bold w-full bg-brand-primary rounded-lg py-3 text-white font-sans"
          onClick={() => setIsOpen(true)}
        >
          Create Job
        </button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <p className="font-bold text-xl font-sans text-brand-primary mb-3">
            Confirm Job?
          </p>
          <p className="text-sm font-sans text-brand-primary text-center">
            Upon confirmation, you will have to make your payment and it will be
            instantly accessible to be picked up by any courier around you
          </p>
          <div className="w-28 h-auto my-11">
            {inTransaction && (
              <BouncingLoader
                isInTransaction={inTransaction}
                setInTransaction={setInTransaction}
                isLoading={loading}
              />
            )}
            {!inTransaction && <img src="/assets/dede_logo.png" alt="DeDe" />}
          </div>

          {eas && (
            <button
              className="font-bold w-full bg-brand-primary rounded-lg py-3 text-white font-sans"
              onClick={() => handleConfirmJob()}
            >
              Confirm Job
            </button>
          )}

          <button
            className="font-bold w-full text-brand-primary rounded-lg py-3 font-sans mt-2"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </Modal>
      </div>
    </main>
  );
}
