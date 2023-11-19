import * as animationData from "../../../public/assets/tick.json";

/* eslint-disable @next/next/no-img-element */
import {
  ConnectWallet,
  lightTheme,
  useAddress,
  useSigner,
} from "@thirdweb-dev/react";
import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";
import Lottie from "react-lottie";
import Modal from "@/components/Modal";
import { attestDeliverDelivery } from "@/utils/attestations";
import dynamic from "next/dynamic";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import BouncingLoader from "@/components/BouncingLoader";
import ReactCanvasConfetti from "react-canvas-confetti";
import Link from "next/link";

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

export default function CourierDropoff() {
  const address = useAddress();
  const router = useRouter();
  const [res, setRes] = useState<ScannedResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const signer = useSigner();
  const shipmentId = "1"; // This would come from the app after they create a job
  const pickupAttestationUID =
    "26de1600a24288a1d33ee39914b4ce23f82b7e91d72bd99e99cec3ec25b573b9"; // This would come from the app after they create a job
  const [courierAttestion, setCourierAttestation] = useState<string | null>(
    null
  );

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  };

  const refAnimationInstance = useRef<any>(null);

  const getInstance = useCallback((instance: null) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const initiateScan = async () => {
    let res;

    try {
      // --- request NFC command execution ---
      res = await execHaloCmdWeb(
        {
          name: "sign",
          keyNo: 1,
          message: pickupAttestationUID,
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

  const confirmDropoff = async () => {
    setLoading(true);
    toast.success("Confirming delivery!");
    console.log(res);
    // Send the signature to the smart contract
    if (signer && address && res) {
      // Sign Transaction here
      console.log("Signing transaction...", res.signature.raw.s);
      const attestationUID = await attestDeliverDelivery(
        ethers.utils.formatBytes32String(shipmentId),
        `0x${res.signature.raw.s}`,
        signer,
        address // This would come from the frontend when we select the job
      );
      setCourierAttestation(attestationUID);
      console.log({ attestationUID });
    }
    fetch("/api/dropoff")
      .then(() => {
        setSuccess(true);
        setIsOpen(false);
        fire();
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="min-h-screen min-w-screen overflow-auto flex flex-col bg-brand-background text-brand-primary">
      <Navbar />
      {success ? (
        <div className="flex flex-col w-full items-center justify-center px-6 py-8">
          <Lottie options={defaultOptions} height={128} width={128} />
          <h1 className="font-bold text-xl font-sans mt-4">
            Your delivery was successful!
          </h1>
          <p className="font-sans text-center my-12">
            Congratulations on your delivery! It is that easy to earn money with
            DeDe. Thank you letting us be a part of your journey to success. ❤️
          </p>
          <img
            src="/assets/dede_logo.png"
            alt="DeDe"
            className="w-28 h-auto my-6"
          />
          <Link href={"/courier"}>
            <button className="font-bold w-full bg-brand-primary rounded-lg py-3 px-6 text-brand-text font-sans mt-6">
              Back to home
            </button>
          </Link>
        </div>
      ) : (
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
      )}
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
            <p className="text-sm font-sans text-brand-primary text-center mb-11">
              Please ensure that your delivery items are correct. This action is
              irreversible. Your DeDe score will be updated and your payment
              will be awarded once the shipment is settled.
            </p>
            {loading ? (
              <BouncingLoader
                isInTransaction={loading}
                setInTransaction={setLoading}
                isLoading={loading}
              />
            ) : (
              <img
                src="/assets/dede_logo.png"
                alt="DeDe"
                className="w-28 h-auto"
              />
            )}
            <button
              disabled={loading}
              className="font-bold w-full bg-brand-primary rounded-lg py-3 text-white font-sans mt-11 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={confirmDropoff}
            >
              {loading ? "Confirming..." : "Confirm Delivery"}
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
      <ReactCanvasConfetti
        refConfetti={getInstance as any}
        style={canvasStyles as any}
      />
    </main>
  );
}
