/* eslint-disable @next/next/no-img-element */
import { ConnectWallet, lightTheme, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import Navbar from "@/components/Navbar";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import * as animationData from "../../../public/assets/tick.json";

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

export default function CourierDropoff() {
  const address = useAddress();
  const router = useRouter();
  const [res, setRes] = useState<ScannedResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const initiateScan = async () => {
    let command = {
      name: "sign",
      keyNo: 1,
      message:
        "26de1600a24288a1d33ee39914b4ce23f82b7e91d72bd99e99cec3ec25b573b9", // TODO: retrieve this from state
    };

    let res;

    try {
      // --- request NFC command execution ---
      res = await execHaloCmdWeb(command, {
        statusCallback: (cause: any) => {
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
      });
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

  const confirmDropoff = () => {
    // Send the signature to the smart contract
    console.log(res);
    toast.success("Delivery confirmed!");
    setSuccess(true);
  };

  return (
    <main className="min-h-screen min-w-screen overflow-auto flex flex-col bg-brand-background text-brand-primary">
      <Navbar />
      <div className="flex flex-col w-full items-center justify-center px-6">
        <h1 className="font-bold text-xl font-sans mt-4">
          Tap Delivery NFC Tag
        </h1>
        <p className="font-sans text-center my-12">
          You can find the NFC tag on the door, gate, locker or within the
          vicinity of your delivery location.
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
              Delivery Confirmed!
            </p>
            <p className="text-sm font-sans text-brand-primary text-center">
              Congratulations! It is that easy to earn money with DeDe.
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
              Confirm Delivery?
            </p>
            <p className="text-sm font-sans text-brand-primary text-center">
              Please ensure that your delivery items are correct. This action is
              irreversible. Your DeDe score will be updated and your payment
              will be awarded once the shipment is settled.
            </p>
            <img
              src="/assets/dede_logo.png"
              alt="DeDe"
              className="w-28 h-auto my-11"
            />
            <button
              className="font-bold w-full bg-brand-primary rounded-lg py-3 text-white font-sans"
              onClick={confirmDropoff}
            >
              Confirm Delivery
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
