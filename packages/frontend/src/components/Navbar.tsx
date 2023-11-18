import { IDKitWidget, ISuccessResult, solidityEncode } from "@worldcoin/idkit"; // add import for solidityEncode
import {
  getChainId,
  useAddress,
  useChain,
  useChainId,
  useContract,
  useContractWrite,
  useENS,
} from "@thirdweb-dev/react";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Avatar, EnsSVG, Button } from "@ensdomains/thorin";
import { BigNumber } from "ethers";
import DeDeABI from "../utils/DeDeABI.json";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import Modal from "./Modal";
import PowerModal from "./PowerModal";
import { defaultAbiCoder as abi } from "ethers/lib/utils";
import { getChainByChainId } from "@thirdweb-dev/chains";
import { getDeDeContractAddress } from "@/utils/addresses";
import { providers } from "ethers";

export const decode = (type: string, encodedString: string) => {
  return abi.decode([type], encodedString)[0];
};

interface INavbar {}

const mockData = [
  {
    name: "Connect ENS",
    points: 50,
  },
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
  const [proof, setProof] = useState<ISuccessResult | null>(null);
  const address = useAddress(); // get the user's wallet address
  console.log("🚀 | Navbar | address:", address);
  const chainId = useChainId();
  const contractAddress = getDeDeContractAddress(chainId);
  const { contract } = useContract(contractAddress, DeDeABI);
  const [ens, setEns] = useState("dedelivery-man.eth");

  useEffect(() => {
    const provider = new providers.InfuraProvider(
      "sepolia",
      process.env.NEXT_PUBLIC_INFURA_KEY
    );
    provider
      .lookupAddress(address || "0xAD3e93F6E6eb04608119B8dB8067c2a9Ff536b06")
      .then((res) => {
        console.log({ res });
      })
      .catch((err: any) => {
        console.log({ err });
      });
  }, []);

  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "verifyWithWorldCoin"
  );

  function onSuccess(result: ISuccessResult) {
    setProof(result);
    console.log(result);
    console.log(proof);

    if (!proof) {
      console.log("smth wrong");
      return;
    }

    mutateAsync({
      args: [
        address!,
        proof?.merkle_root
          ? decode("uint256", proof?.merkle_root ?? "")
          : BigNumber.from(0),
        proof?.nullifier_hash
          ? decode("uint256", proof?.nullifier_hash ?? "")
          : BigNumber.from(0),
        proof?.proof
          ? decode("uint256[8]", proof?.proof ?? "")
          : [
              BigNumber.from(0),
              BigNumber.from(0),
              BigNumber.from(0),
              BigNumber.from(0),
              BigNumber.from(0),
              BigNumber.from(0),
              BigNumber.from(0),
              BigNumber.from(0),
            ],
      ],
    });
  }

  console.log(
    address,
    process.env.NEXT_PUBLIC_WLD_CLIENT_ID,
    process.env.NEXT_PUBLIC_WLD_ACTION
  );

  return (
    <nav className="flex flex-row items-center justify-between w-full px-6 py-5">
      <img
        src={"/assets/dede_logotype.svg"}
        alt="DeDe"
        className="w-20 h-auto"
      />
      <div className="flex flex-row gap-x-2">
        <div className="w-12 h-12" onClick={() => setIsOpen(true)}>
          <Avatar label="User Profile" src={"/assets/profile.png"} />
        </div>
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
        <div className="flex flex-row flex-wrap gap-2 py-4 border-t border-brand-primary mt-8">
          {/* If address is not undefined, display IDKitWidget */}
          <p className="font-bold font-sans">
            Verify/Connect your accounts to increase your DeDe score
          </p>
          {address &&
            process.env.NEXT_PUBLIC_WLD_CLIENT_ID &&
            process.env.NEXT_PUBLIC_WLD_ACTION && (
              <IDKitWidget
                app_id={process.env.NEXT_PUBLIC_WLD_CLIENT_ID} // must be an app set to on-chain
                action={process.env.NEXT_PUBLIC_WLD_ACTION} // must be an action set to on-chain
                signal={address} // prevents tampering with a message
                onSuccess={onSuccess}
                // no use for handleVerify, so it is removed
                // leave credential_types unspecified (orb-only by default), as phone credentials are not supported on-chain
                enableTelemetry
              >
                {({ open }: any) => (
                  <button
                    onClick={() => {
                      open();
                    }}
                  >
                    <Button
                      prefix={
                        <img
                          src="/assets/worldcoin-avatar.png"
                          alt="Worldcoin"
                        />
                      }
                      style={{
                        backgroundColor: "#ffffff",
                        borderColor: "#E5E5E5",
                        color: "#363B44",
                      }}
                    >
                      Verify with World ID
                    </Button>
                  </button>
                )}
              </IDKitWidget>
            )}

          <div style={{ width: "180px" }}>
            <Button
              prefix={<EnsSVG />}
              variant="primary"
              style={{
                backgroundColor: "#023039",
                color: "#FEFEF2",
              }}
            >
              {ens}
            </Button>
          </div>
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
