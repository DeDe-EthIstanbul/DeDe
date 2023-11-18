import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { type SignerOrProvider, useChainId, useSigner } from "@thirdweb-dev/react";
import { useEffect, useState } from 'react';

import { Signer } from "ethers";

let REQUESTED_SCHEMA = "0x5168144c45bf7c0758dc716151ef449b25c0b1583462da35d242d7a45660cb09"; //TODO
let PICKED_UP_SCHEMA = "0x5c5b112092ac1af2aa778890732f8edf474efd8f1f1db3749f231018e3d0ca8d" //TODO
let DELIVERED_SCHEMA = "0x05aa3b5bf919b9eaa9571ca139248d72297f44b7026d0d5b63e301039fb5271b" //TODO
let COMPLETED_SCHEMA = "0xefdd971c2c78f490a565dcd1d00ffd349827b81d299f8aeee6de086e2b882f97" //TODO


function getEASAddress(chainId: string) {
    let EAS_ADDRESS;

    if (chainId == '11155111') {
        EAS_ADDRESS = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
    } else if (chainId == '84531') {
        // base testnet
        EAS_ADDRESS = '0x4200000000000000000000000000000000000021';
    } else if (chainId == '534353') {
        // scroll testnet
        EAS_ADDRESS = '0x0000000000000000000000000000000000000001';
        console.log('EAS Not available on Scroll Testnet');
    } else if (chainId == '59140') {
        // linea testnet
        EAS_ADDRESS = '0xaEF4103A04090071165F78D45D83A0C0782c2B2a';
    } else if (chainId == '5001') {
        // mantle testnet
        EAS_ADDRESS = '0x0000000000000000000000000000000000000001';
        console.log('EAS Not available on Mantle Testnet');
    } else if (chainId == '10200') {
        // gnosis testnet
        EAS_ADDRESS = '0x0000000000000000000000000000000000000001';
        console.log('EAS Not available on Gnosis Testnet');
    } else if (chainId == '421613') {
        // arbitrum testnet
        EAS_ADDRESS = '0xaEF4103A04090071165F78D45D83A0C0782c2B2a';
    } else if (chainId == '80001') {
        // mumbai testnet
        EAS_ADDRESS = '0xaEF4103A04090071165F78D45D83A0C0782c2B2a';
    } else {
        EAS_ADDRESS = '0x0000000000000000000000000000000000000001';
        console.log('EAS Not available on this network');
    }

    return EAS_ADDRESS;
}


export const EASContractAddress = getEASAddress('80001'); // Mumbai v0.26

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
            console.error('Error creating contract instance:', error);
        }
    }, [chainId, _signer]);

    return contract;
};

// Initialize the sdk with the address of the EAS Schema contract address
export const attestPickupDelivery = async (shipmentId: string, senderSignature: string, signer: SignerOrProvider, recipient: string) => {


    const schemaEncoder = new SchemaEncoder("bytes32 shipmentId, bytes32 senderSignature");
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
}

export const attestDeliverDelivery = async (shipmentId: string, receiverSignature: string, signer: SignerOrProvider, recipient: string) => {
    const schemaEncoder = new SchemaEncoder("bytes32 shipmentId, bytes32 receiverSignature");
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
}
