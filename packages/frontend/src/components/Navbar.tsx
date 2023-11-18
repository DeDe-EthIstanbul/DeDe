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
import protobuf from "protobufjs";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Avatar, EnsSVG, Button } from "@ensdomains/thorin";
import { BigNumber } from "ethers";
import DeDeABI from "../utils/DeDeABI.json";
// import { ENS } from "@ensdomains/ensjs";
import PowerModal from "./PowerModal";
import { defaultAbiCoder as abi } from "ethers/lib/utils";
import { getChainByChainId } from "@thirdweb-dev/chains";
import { getDeDeContractAddress } from "@/utils/addresses";
import { providers } from "ethers";
import { createWakuDecoder, listenToMessages, setupWaku } from "@/utils/waku";
import { PageDirection, LightNode } from "@waku/interfaces";
import {
  useWaku,
  useContentPair,
  useFilterMessages,
  useStoreMessages,
} from "@waku/react";
import toast from "react-hot-toast";

export const decode = (type: string, encodedString: string) => {
  return abi.decode([type], encodedString)[0];
};

interface INavbar {}

const mockData = [
  {
    name: "Own an ENS",
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
  // const [node, setNode] = useState<any>();
  // const [decoder, setDecoder] = useState<any>();
  const { node } = useWaku<LightNode>();
  const { decoder } = useContentPair();
  const {
    messages: newMessages,
    isLoading: filterLoading,
    error: filterError,
  } = useFilterMessages({
    node,
    decoder,
  });
  const { messages: storedMessages } = useStoreMessages({
    node,
    decoder,
    options: {
      pageSize: 5,
      pageDirection: PageDirection.FORWARD,
      timeFilter: {
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        endTime: new Date(),
      },
    },
  });

  useEffect(() => {
    const setup = async () => {
      // Create the subscription
      const node = await setupWaku();
      // setNode(node);
      const decoder = await createWakuDecoder();
      // setDecoder(decoder);

      const ChatMessage = new protobuf.Type("ChatMessage")
        .add(new protobuf.Field("timestamp", 1, "uint64"))
        .add(new protobuf.Field("sender", 2, "string"))
        .add(new protobuf.Field("message", 3, "string"));

      // Create the callback function
      const callback = (wakuMessage: any) => {
        // Check if there is a payload on the message
        if (!wakuMessage.payload) return;
        // Render the messageObj as desired in your application
        const messageObj = ChatMessage.decode(wakuMessage.payload);
        // console.log(wakuMessage);
        // console.log(messageObj);
        toast.success(messageObj.toJSON().message);
      };
      // Listen to messages
      await listenToMessages(node, decoder, callback);
    };

    setup();
  }, []);

  useEffect(() => {
    console.log({ filterLoading });
  }, [filterLoading]);

  useEffect(() => {
    console.log(newMessages);
    if (newMessages.length > 0) {
      const ChatMessage = new protobuf.Type("ChatMessage")
        .add(new protobuf.Field("timestamp", 1, "uint64"))
        .add(new protobuf.Field("sender", 2, "string"))
        .add(new protobuf.Field("message", 3, "string"));

      const message = newMessages.pop();
      if (message) {
        const messageObj = ChatMessage.decode(message.payload);
        toast.success(messageObj.toJSON().message);
      }
    }
  }, [newMessages]);

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
                      variant="primary"
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

          <div>
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
