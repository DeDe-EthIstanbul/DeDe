import {
    EAS,
    Offchain,
    SchemaEncoder,
    SchemaRegistry,
} from "@ethereum-attestation-service/eas-sdk";
import {
    type SignerOrProvider,
    useChainId,
    useSigner,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

import { Signer } from "ethers";

let REQUESTED_SCHEMA =
    "0x683fc6462c9e2484ec201797c61b9f75195ec01069bb233d6e0ed522790f7fbc"; //TODO
let PICKED_UP_SCHEMA =
    "0x751bafea76d8fd3dee8e135af26f4c92bb2114ac51d0b3a4f73f9e49d71252cd"; //TODO
let DELIVERED_SCHEMA =
    "0x61e6fd6703a752acd328ebea5b3945c0450e2944834bd97d918e92cf96749b87"; //TODO
let COMPLETED_SCHEMA =
    "0x6c64964491699e72e28862c8225535135d3ea3e887fafa0b719f7e3f654c46b5"; //TODO

function getEASAddress(chainId: string) {
    let EAS_ADDRESS;

    if (chainId == "11155111") {
        EAS_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
    } else if (chainId == "84531") {
        // base testnet
        EAS_ADDRESS = "0x4200000000000000000000000000000000000021";
    } else if (chainId == "534353") {
        // scroll testnet
        EAS_ADDRESS = "0x0000000000000000000000000000000000000001";
        console.log("EAS Not available on Scroll Testnet");
    } else if (chainId == "59140") {
        // linea testnet
        EAS_ADDRESS = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a";
    } else if (chainId == "5001") {
        // mantle testnet
        EAS_ADDRESS = "0x0000000000000000000000000000000000000001";
        console.log("EAS Not available on Mantle Testnet");
    } else if (chainId == "10200") {
        // gnosis testnet
        EAS_ADDRESS = "0x0000000000000000000000000000000000000001";
        console.log("EAS Not available on Gnosis Testnet");
    } else if (chainId == "421613") {
        // arbitrum testnet
        EAS_ADDRESS = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a";
    } else if (chainId == "80001") {
        // mumbai testnet
        EAS_ADDRESS = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a";
    } else {
        EAS_ADDRESS = "0x0000000000000000000000000000000000000001";
        console.log("EAS Not available on this network");
    }

    return EAS_ADDRESS;
}

export const EASContractAddress = getEASAddress("80001"); // Mumbai v0.26

// Initialize the sdk with the address of the EAS Schema contract address
export const eas = new EAS(EASContractAddress);

export const useEAS = (): EAS | undefined => {
    const chainId: number | undefined = useChainId();
    const _signer: SignerOrProvider | undefined = useSigner();
    const [contract, setContract] = useState<EAS>();
    useEffect(() => {
        if (!chainId || !_signer) {
            return;
        }
        try {
            let address = getEASAddress(chainId.toString());
            // Create a new contract instance
            const eas = new EAS(address);
            //@ts-ignore
            setContract(eas.connect(_signer));
        } catch (error) {
            console.error("Error creating contract instance:", error);
        }
    }, [chainId, _signer]);

    return contract;
};

// Initialize the sdk with the address of the EAS Schema contract address
export const attestPickupDelivery = async (
    shipmentId: string,
    senderSignature: string,
    signer: SignerOrProvider,
    recipient: string
) => {
    const schemaEncoder = new SchemaEncoder(
        "bytes32 shipmentId, bytes32 senderSignature"
    );
    const encodedData = schemaEncoder.encodeData([
        { name: "shipmentId", value: shipmentId, type: "bytes32" },
        { name: "senderSignature", value: senderSignature, type: "bytes32" },
    ]);

    const tx = await eas.connect(signer as any).attest({
        schema: PICKED_UP_SCHEMA,
        data: {
            recipient: recipient,
            expirationTime: BigInt(0),
            revocable: true, // Be aware that if your schema is not revocable, this MUST be false
            data: encodedData,
        },
    });
    const newAttestationUID = await tx.wait();

    return newAttestationUID;
};

export const attestDeliverDelivery = async (
    shipmentId: string,
    receiverSignature: string,
    signer: SignerOrProvider,
    recipient: string
) => {
    const schemaEncoder = new SchemaEncoder(
        "bytes32 shipmentId, bytes32 receiverSignature"
    );
    const encodedData = schemaEncoder.encodeData([
        { name: "shipmentId", value: shipmentId, type: "bytes32" },
        { name: "receiverSignature", value: receiverSignature, type: "bytes32" },
    ]);

    const tx = await eas.connect(signer as any).attest({
        schema: DELIVERED_SCHEMA,
        data: {
            recipient: recipient,
            expirationTime: BigInt(0),
            revocable: true, // Be aware that if your schema is not revocable, this MUST be false
            data: encodedData,
        },
    });
    const newAttestationUID = await tx.wait();

    return newAttestationUID;
};
