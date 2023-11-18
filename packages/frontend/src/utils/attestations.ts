import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { type SignerOrProvider, useChainId, useSigner } from "@thirdweb-dev/react";
import { useEffect, useState } from 'react';

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
