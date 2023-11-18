import * as animationData from "../../../public/assets/tick.json";

/* eslint-disable @next/next/no-img-element */
import {
  ConnectWallet,
  lightTheme,
  useAddress,
  useSigner,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

import Image from "next/image";
import Lottie from "react-lottie";
import Modal from "@/components/Modal";
import { attestPickupDelivery } from "@/utils/attestations";
import dynamic from "next/dynamic";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { ethers } from "ethers";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

interface ScannedResult {
  signature: {
    raw: {
      r: string;
      s: string;
      v: string;
    };
  };
  etherAddress: string;
}

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function CourierPickup() {
  const address = useAddress();
  const router = useRouter();
  const [res, setRes] = useState<ScannedResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const signer = useSigner();
  const shipmentId = "1"; // This would come from the app after they create a job
  const receiverAttestationUID =
    "26de1600a24288a1d33ee39914b4ce23f82b7e91d72bd99e99cec3ec25b573b9"; // This would come from the app after they create a job
  const [courierAttestion, setCourierAttestation] = useState<string | null>(
    null
  );

  const initiateScan = async () => {
    let command = {
      name: "sign",
      keyNo: 1,
      message: courierAttestion,
    };

    let res;

    if (!signer || !address) {
      toast("Please wait a moment before trying again");
    }

    setLoading(true);
    toast("Attesting the delivery, this may take awhile...");
    const attestationUID = await attestPickupDelivery(
      ethers.utils.formatBytes32String(shipmentId),
      `0x${receiverAttestationUID}`,
      signer!,
      address! // This would come from the frontend when we select the job
    );
    setLoading(false);
    toast.success("Attestation complete! Please tap the NFC tag");
    setCourierAttestation(attestationUID);
    // Do I need to put this on chain?

    try {
      // --- request NFC command execution ---
      console.log({
        name: "sign",
        keyNo: 1,
        message: attestationUID,
      });
      res = await execHaloCmdWeb(
        {
          name: "sign",
          keyNo: 1,
          message: attestationUID.slice(2),
        },
        {
          statusCallback: async (cause: any) => {
            if (cause === "init") {
              toast(
                "Please tap the tag to the back of your smartphone and hold it..."
              );
            } else if (cause === "retry") {
              toast.error(
                "Something went wrong, please try to tap the tag again..."
              );
            } else if (cause === "scanned") {
              toast.success(
                "Tag scanned successfully, post-processing the result..."
              );
            } else {
              // toast(cause);
            }
          },
        }
      );
      // the command has succeeded, display the result to the user
      // toast(JSON.stringify(res, null, 4));
      setRes(res);
      setIsOpen(true);
    } catch (e) {
      // the command has failed, display error to the user
      toast.error(
        "Scanning failed, click on the button again to retry. Details: " +
          String(e)
      );
    }
  };

  const confirmPickup = async () => {
    toast.success("Confirming pickup!");
    // Send the signature to the smart contract
    console.log(res);

    // What do I do with the result?
    if (signer && address && res) {
      // Sign Transaction here
      console.log("Signing transaction...", res.signature.raw.s);
      const attestationUID = await attestPickupDelivery(
        ethers.utils.formatBytes32String(shipmentId),
        `0x${res.signature.raw.s}`,
        signer,
        address // This would come from the frontend when we select the job
      );
      console.log({ attestationUID }); // Put this on chain?
    }
    fetch("/api/pickup")
      .then(() => setSuccess(true))
      .finally(() => setLoading(false));
    setLoading(true);
  };

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
        <button
          className="font-bold w-full bg-brand-primary rounded-lg py-3 text-brand-text font-sans mt-14"
          onClick={initiateScan}
        >
          Initiate Scan
        </button>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {success ? (
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-xl font-sans text-brand-primary mb-3">
              Pickup Confirmed!
            </p>
            <p className="text-sm font-sans text-brand-primary text-center">
              Deliver your parcel before 12pm on 25th December 2023 to
              successfully complete your task!
            </p>

            <Lottie options={defaultOptions} height={128} width={128} />
            <button
              className="font-bold w-full bg-brand-primary rounded-lg py-3 text-white font-sans"
              onClick={() => setIsOpen(false)}
            >
              Okay
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-xl font-sans text-brand-primary mb-3">
              Confirm Pickup?
            </p>
            <p className="text-sm font-sans text-brand-primary text-center">
              Failure to deliver your parcel will result in a penalty. Your DeDe
              score will be reduced and you may be charged a fee based on the
              item value.
            </p>
            <img
              src="/assets/dede_logo.png"
              alt="DeDe"
              className="w-28 h-auto my-11"
            />
            <button
              className="font-bold w-full bg-brand-primary rounded-lg py-3 text-white font-sans"
              onClick={confirmPickup}
            >
              Confirm Pick Up
            </button>
            <button
              className="font-bold w-full text-brand-primary rounded-lg py-3 font-sans mt-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </Modal>
    </main>
  );
}
