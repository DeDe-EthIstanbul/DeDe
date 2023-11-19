import {
  getContract,
  GetContractArgs,
  readContract,
  ReadContractConfig,
  writeContract,
  WriteContractMode,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
  watchContractEvent,
  WatchContractEventConfig,
  WatchContractEventCallback,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DeDe
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Mantle Testnet Mantle Testnet Explorer__](https://explorer.testnet.mantle.xyz/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Alfajores Celo Explorer__](https://explorer.celo.org/alfajores/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Linea Goerli Testnet Etherscan__](https://goerli.lineascan.build/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x35127d0ACc9Ad5A055b699B762aaab70B16AA0ee)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Arbitrum Sepolia Blockscout__](https://sepolia-explorer.arbitrum.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x09E0e9d31657efa5222D2A0c9fC2fDbEe1781621)
 */
export const deDeABI = [
  {
    stateMutability: 'payable',
    type: 'constructor',
    inputs: [
      { name: '_settlementDuration', internalType: 'uint256', type: 'uint256' },
      { name: '_eas', internalType: 'contract IEAS', type: 'address' },
      { name: '_worldId', internalType: 'contract IWorldID', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'AccessDenied' },
  { type: 'error', inputs: [], name: 'InsufficientValue' },
  { type: 'error', inputs: [], name: 'InvalidEAS' },
  { type: 'error', inputs: [], name: 'InvalidLength' },
  { type: 'error', inputs: [], name: 'InvalidNullifier' },
  { type: 'error', inputs: [], name: 'NotPayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'shipmentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'courier',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ShipmentCompleted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'shipmentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'courier',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ShipmentDelivered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'shipmentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'courier',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ShipmentPickedUp',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'shipmentId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'deadline',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bounty',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ShipmentRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'UserVerifiedWithWorldCoin',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'COMPLETED_SCHEMA',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DELIVERED_SCHEMA',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DISPUTED_SCHEMA',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'PICKED_UP_SCHEMA',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestation',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'attest',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_shipmentId', internalType: 'uint256', type: 'uint256' }],
    name: 'completeShipment',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'currentId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: '_shipmentId', internalType: 'uint256', type: 'uint256' }],
    name: 'deliverShipment',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_shipmentId', internalType: 'uint256', type: 'uint256' }],
    name: 'disburse',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_shipmentId', internalType: 'uint256', type: 'uint256' },
      { name: 'disputer', internalType: 'address', type: 'address' },
    ],
    name: 'dispute',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'fulfilledShipments',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'isPayable',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestations',
        internalType: 'struct Attestation[]',
        type: 'tuple[]',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'multiAttest',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestations',
        internalType: 'struct Attestation[]',
        type: 'tuple[]',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'multiRevoke',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'pickedUpShipments',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'requestShipment',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestation',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'revoke',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_schema', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setCompletedSchema',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_schema', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setDeliveredSchema',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_schema', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setDisputedSchema',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_schema', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setPickedUpSchema',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_shipmentId', internalType: 'uint256', type: 'uint256' }],
    name: 'settle',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'settlementDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'shipments',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'state', internalType: 'enum DeDe.ShipmentState', type: 'uint8' },
      { name: 'bounty', internalType: 'uint256', type: 'uint256' },
      { name: 'settlementDeadline', internalType: 'uint256', type: 'uint256' },
      { name: 'courier', internalType: 'address', type: 'address' },
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'valid', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signal', internalType: 'address', type: 'address' },
      { name: 'root', internalType: 'uint256', type: 'uint256' },
      { name: 'nullifierHash', internalType: 'uint256', type: 'uint256' },
      { name: 'proof', internalType: 'uint256[8]', type: 'uint256[8]' },
    ],
    name: 'verifyWithWorldCoin',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'withdrawableBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

/**
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Mantle Testnet Mantle Testnet Explorer__](https://explorer.testnet.mantle.xyz/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Alfajores Celo Explorer__](https://explorer.celo.org/alfajores/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Linea Goerli Testnet Etherscan__](https://goerli.lineascan.build/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x35127d0ACc9Ad5A055b699B762aaab70B16AA0ee)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Arbitrum Sepolia Blockscout__](https://sepolia-explorer.arbitrum.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x09E0e9d31657efa5222D2A0c9fC2fDbEe1781621)
 */
export const deDeAddress = {
  1442: '0xdf48692003Dd581b7E3715A26a6244f49B2e56da',
  5001: '0xdf48692003Dd581b7E3715A26a6244f49B2e56da',
  10200: '0xdf48692003Dd581b7E3715A26a6244f49B2e56da',
  44787: '0xdf48692003Dd581b7E3715A26a6244f49B2e56da',
  59140: '0xdf48692003Dd581b7E3715A26a6244f49B2e56da',
  80001: '0x35127d0ACc9Ad5A055b699B762aaab70B16AA0ee',
  84531: '0xdf48692003Dd581b7E3715A26a6244f49B2e56da',
  421614: '0xdf48692003Dd581b7E3715A26a6244f49B2e56da',
  534351: '0xdf48692003Dd581b7E3715A26a6244f49B2e56da',
  11155111: '0x09E0e9d31657efa5222D2A0c9fC2fDbEe1781621',
} as const

/**
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Mantle Testnet Mantle Testnet Explorer__](https://explorer.testnet.mantle.xyz/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Alfajores Celo Explorer__](https://explorer.celo.org/alfajores/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Linea Goerli Testnet Etherscan__](https://goerli.lineascan.build/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x35127d0ACc9Ad5A055b699B762aaab70B16AA0ee)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Arbitrum Sepolia Blockscout__](https://sepolia-explorer.arbitrum.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x09E0e9d31657efa5222D2A0c9fC2fDbEe1781621)
 */
export const deDeConfig = { address: deDeAddress, abi: deDeABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IEAS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ieasABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'attester',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'uid', internalType: 'bytes32', type: 'bytes32', indexed: false },
      {
        name: 'schemaUID',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'Attested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'attester',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'uid', internalType: 'bytes32', type: 'bytes32', indexed: false },
      {
        name: 'schemaUID',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'Revoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'revoker',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'data', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'timestamp',
        internalType: 'uint64',
        type: 'uint64',
        indexed: true,
      },
    ],
    name: 'RevokedOffchain',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'data', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'timestamp',
        internalType: 'uint64',
        type: 'uint64',
        indexed: true,
      },
    ],
    name: 'Timestamped',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'request',
        internalType: 'struct AttestationRequest',
        type: 'tuple',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct AttestationRequestData',
            type: 'tuple',
            components: [
              { name: 'recipient', internalType: 'address', type: 'address' },
              {
                name: 'expirationTime',
                internalType: 'uint64',
                type: 'uint64',
              },
              { name: 'revocable', internalType: 'bool', type: 'bool' },
              { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'attest',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'delegatedRequest',
        internalType: 'struct DelegatedAttestationRequest',
        type: 'tuple',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct AttestationRequestData',
            type: 'tuple',
            components: [
              { name: 'recipient', internalType: 'address', type: 'address' },
              {
                name: 'expirationTime',
                internalType: 'uint64',
                type: 'uint64',
              },
              { name: 'revocable', internalType: 'bool', type: 'bool' },
              { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'signature',
            internalType: 'struct Signature',
            type: 'tuple',
            components: [
              { name: 'v', internalType: 'uint8', type: 'uint8' },
              { name: 'r', internalType: 'bytes32', type: 'bytes32' },
              { name: 's', internalType: 'bytes32', type: 'bytes32' },
            ],
          },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'attestByDelegation',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'uid', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getAttestation',
    outputs: [
      {
        name: '',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'revoker', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getRevokeOffchain',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getSchemaRegistry',
    outputs: [
      { name: '', internalType: 'contract ISchemaRegistry', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getTimestamp',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'uid', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isAttestationValid',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'multiRequests',
        internalType: 'struct MultiAttestationRequest[]',
        type: 'tuple[]',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct AttestationRequestData[]',
            type: 'tuple[]',
            components: [
              { name: 'recipient', internalType: 'address', type: 'address' },
              {
                name: 'expirationTime',
                internalType: 'uint64',
                type: 'uint64',
              },
              { name: 'revocable', internalType: 'bool', type: 'bool' },
              { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'multiAttest',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'multiDelegatedRequests',
        internalType: 'struct MultiDelegatedAttestationRequest[]',
        type: 'tuple[]',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct AttestationRequestData[]',
            type: 'tuple[]',
            components: [
              { name: 'recipient', internalType: 'address', type: 'address' },
              {
                name: 'expirationTime',
                internalType: 'uint64',
                type: 'uint64',
              },
              { name: 'revocable', internalType: 'bool', type: 'bool' },
              { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
              { name: 'data', internalType: 'bytes', type: 'bytes' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'signatures',
            internalType: 'struct Signature[]',
            type: 'tuple[]',
            components: [
              { name: 'v', internalType: 'uint8', type: 'uint8' },
              { name: 'r', internalType: 'bytes32', type: 'bytes32' },
              { name: 's', internalType: 'bytes32', type: 'bytes32' },
            ],
          },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'multiAttestByDelegation',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'multiRequests',
        internalType: 'struct MultiRevocationRequest[]',
        type: 'tuple[]',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct RevocationRequestData[]',
            type: 'tuple[]',
            components: [
              { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'multiRevoke',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'multiDelegatedRequests',
        internalType: 'struct MultiDelegatedRevocationRequest[]',
        type: 'tuple[]',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct RevocationRequestData[]',
            type: 'tuple[]',
            components: [
              { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'signatures',
            internalType: 'struct Signature[]',
            type: 'tuple[]',
            components: [
              { name: 'v', internalType: 'uint8', type: 'uint8' },
              { name: 'r', internalType: 'bytes32', type: 'bytes32' },
              { name: 's', internalType: 'bytes32', type: 'bytes32' },
            ],
          },
          { name: 'revoker', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'multiRevokeByDelegation',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes32[]', type: 'bytes32[]' }],
    name: 'multiRevokeOffchain',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes32[]', type: 'bytes32[]' }],
    name: 'multiTimestamp',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'request',
        internalType: 'struct RevocationRequest',
        type: 'tuple',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct RevocationRequestData',
            type: 'tuple',
            components: [
              { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'revoke',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'delegatedRequest',
        internalType: 'struct DelegatedRevocationRequest',
        type: 'tuple',
        components: [
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'data',
            internalType: 'struct RevocationRequestData',
            type: 'tuple',
            components: [
              { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
              { name: 'value', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'signature',
            internalType: 'struct Signature',
            type: 'tuple',
            components: [
              { name: 'v', internalType: 'uint8', type: 'uint8' },
              { name: 'r', internalType: 'bytes32', type: 'bytes32' },
              { name: 's', internalType: 'bytes32', type: 'bytes32' },
            ],
          },
          { name: 'revoker', internalType: 'address', type: 'address' },
          { name: 'deadline', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    name: 'revokeByDelegation',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes32', type: 'bytes32' }],
    name: 'revokeOffchain',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes32', type: 'bytes32' }],
    name: 'timestamp',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ISchemaRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iSchemaRegistryABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'uid', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'registerer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'schema',
        internalType: 'struct SchemaRecord',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'resolver',
            internalType: 'contract ISchemaResolver',
            type: 'address',
          },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'schema', internalType: 'string', type: 'string' },
        ],
        indexed: false,
      },
    ],
    name: 'Registered',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'uid', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getSchema',
    outputs: [
      {
        name: '',
        internalType: 'struct SchemaRecord',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'resolver',
            internalType: 'contract ISchemaResolver',
            type: 'address',
          },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'schema', internalType: 'string', type: 'string' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'schema', internalType: 'string', type: 'string' },
      {
        name: 'resolver',
        internalType: 'contract ISchemaResolver',
        type: 'address',
      },
      { name: 'revocable', internalType: 'bool', type: 'bool' },
    ],
    name: 'register',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ISchemaResolver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iSchemaResolverABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestation',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'attest',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'isPayable',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestations',
        internalType: 'struct Attestation[]',
        type: 'tuple[]',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'multiAttest',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestations',
        internalType: 'struct Attestation[]',
        type: 'tuple[]',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'multiRevoke',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestation',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'revoke',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IWorldID
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iWorldIdABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'root', internalType: 'uint256', type: 'uint256' },
      { name: 'groupId', internalType: 'uint256', type: 'uint256' },
      { name: 'signalHash', internalType: 'uint256', type: 'uint256' },
      { name: 'nullifierHash', internalType: 'uint256', type: 'uint256' },
      {
        name: 'externalNullifierHash',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'proof', internalType: 'uint256[8]', type: 'uint256[8]' },
    ],
    name: 'verifyProof',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SchemaResolver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const schemaResolverABI = [
  { type: 'error', inputs: [], name: 'AccessDenied' },
  { type: 'error', inputs: [], name: 'InsufficientValue' },
  { type: 'error', inputs: [], name: 'InvalidEAS' },
  { type: 'error', inputs: [], name: 'InvalidLength' },
  { type: 'error', inputs: [], name: 'NotPayable' },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestation',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'attest',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'isPayable',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestations',
        internalType: 'struct Attestation[]',
        type: 'tuple[]',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'multiAttest',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestations',
        internalType: 'struct Attestation[]',
        type: 'tuple[]',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'multiRevoke',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'attestation',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'time', internalType: 'uint64', type: 'uint64' },
          { name: 'expirationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'revocationTime', internalType: 'uint64', type: 'uint64' },
          { name: 'refUID', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'attester', internalType: 'address', type: 'address' },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'revoke',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Semver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const semverABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'major', internalType: 'uint256', type: 'uint256' },
      { name: 'minor', internalType: 'uint256', type: 'uint256' },
      { name: 'patch', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WorldIDEnabled
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const worldIdEnabledABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_worldId', internalType: 'contract IWorldID', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'InvalidNullifier' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'UserVerifiedWithWorldCoin',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'signal', internalType: 'address', type: 'address' },
      { name: 'root', internalType: 'uint256', type: 'uint256' },
      { name: 'nullifierHash', internalType: 'uint256', type: 'uint256' },
      { name: 'proof', internalType: 'uint256[8]', type: 'uint256[8]' },
    ],
    name: 'verifyWithWorldCoin',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link deDeABI}__.
 *
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Mantle Testnet Mantle Testnet Explorer__](https://explorer.testnet.mantle.xyz/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Alfajores Celo Explorer__](https://explorer.celo.org/alfajores/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Linea Goerli Testnet Etherscan__](https://goerli.lineascan.build/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x35127d0ACc9Ad5A055b699B762aaab70B16AA0ee)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Arbitrum Sepolia Blockscout__](https://sepolia-explorer.arbitrum.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x09E0e9d31657efa5222D2A0c9fC2fDbEe1781621)
 */
export function getDeDe(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof deDeAddress
  },
) {
  return getContract({
    abi: deDeABI,
    address: deDeAddress[config.chainId as keyof typeof deDeAddress],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link deDeABI}__.
 *
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Mantle Testnet Mantle Testnet Explorer__](https://explorer.testnet.mantle.xyz/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Alfajores Celo Explorer__](https://explorer.celo.org/alfajores/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Linea Goerli Testnet Etherscan__](https://goerli.lineascan.build/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x35127d0ACc9Ad5A055b699B762aaab70B16AA0ee)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Arbitrum Sepolia Blockscout__](https://sepolia-explorer.arbitrum.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x09E0e9d31657efa5222D2A0c9fC2fDbEe1781621)
 */
export function readDeDe<
  TAbi extends readonly unknown[] = typeof deDeABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof deDeAddress
  },
) {
  return readContract({
    abi: deDeABI,
    address: deDeAddress[config.chainId as keyof typeof deDeAddress],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link deDeABI}__.
 *
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Mantle Testnet Mantle Testnet Explorer__](https://explorer.testnet.mantle.xyz/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Alfajores Celo Explorer__](https://explorer.celo.org/alfajores/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Linea Goerli Testnet Etherscan__](https://goerli.lineascan.build/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x35127d0ACc9Ad5A055b699B762aaab70B16AA0ee)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Arbitrum Sepolia Blockscout__](https://sepolia-explorer.arbitrum.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x09E0e9d31657efa5222D2A0c9fC2fDbEe1781621)
 */
export function writeDeDe<
  TFunctionName extends string,
  TMode extends WriteContractMode,
  TChainId extends number = keyof typeof deDeAddress,
>(
  config:
    | (Omit<
        WriteContractPreparedArgs<typeof deDeABI, TFunctionName>,
        'abi' | 'address'
      > & {
        mode: TMode
        chainId?: TMode extends 'prepared' ? TChainId : keyof typeof deDeAddress
      })
    | (Omit<
        WriteContractUnpreparedArgs<typeof deDeABI, TFunctionName>,
        'abi' | 'address'
      > & {
        mode: TMode
        chainId?: TMode extends 'prepared' ? TChainId : keyof typeof deDeAddress
      }),
) {
  return writeContract({
    abi: deDeABI,
    address: deDeAddress[config.chainId as keyof typeof deDeAddress],
    ...config,
  } as unknown as WriteContractArgs<typeof deDeABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link deDeABI}__.
 *
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Mantle Testnet Mantle Testnet Explorer__](https://explorer.testnet.mantle.xyz/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Alfajores Celo Explorer__](https://explorer.celo.org/alfajores/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Linea Goerli Testnet Etherscan__](https://goerli.lineascan.build/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x35127d0ACc9Ad5A055b699B762aaab70B16AA0ee)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Arbitrum Sepolia Blockscout__](https://sepolia-explorer.arbitrum.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x09E0e9d31657efa5222D2A0c9fC2fDbEe1781621)
 */
export function prepareWriteDeDe<
  TAbi extends readonly unknown[] = typeof deDeABI,
  TFunctionName extends string = string,
>(
  config: Omit<
    PrepareWriteContractConfig<TAbi, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof deDeAddress },
) {
  return prepareWriteContract({
    abi: deDeABI,
    address: deDeAddress[config.chainId as keyof typeof deDeAddress],
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link deDeABI}__.
 *
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Mantle Testnet Mantle Testnet Explorer__](https://explorer.testnet.mantle.xyz/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Alfajores Celo Explorer__](https://explorer.celo.org/alfajores/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Linea Goerli Testnet Etherscan__](https://goerli.lineascan.build/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x35127d0ACc9Ad5A055b699B762aaab70B16AA0ee)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Arbitrum Sepolia Blockscout__](https://sepolia-explorer.arbitrum.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xdf48692003Dd581b7E3715A26a6244f49B2e56da)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x09E0e9d31657efa5222D2A0c9fC2fDbEe1781621)
 */
export function watchDeDeEvent<
  TAbi extends readonly unknown[] = typeof deDeABI,
  TEventName extends string = string,
>(
  config: Omit<
    WatchContractEventConfig<TAbi, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof deDeAddress },
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  return watchContractEvent(
    {
      abi: deDeABI,
      address: deDeAddress[config.chainId as keyof typeof deDeAddress],
      ...config,
    } as WatchContractEventConfig<TAbi, TEventName>,
    callback,
  )
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link ieasABI}__.
 */
export function getIeas(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: ieasABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ieasABI}__.
 */
export function readIeas<
  TAbi extends readonly unknown[] = typeof ieasABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return readContract({
    abi: ieasABI,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ieasABI}__.
 */
export function writeIeas<TFunctionName extends string>(
  config:
    | Omit<WriteContractPreparedArgs<typeof ieasABI, TFunctionName>, 'abi'>
    | Omit<WriteContractUnpreparedArgs<typeof ieasABI, TFunctionName>, 'abi'>,
) {
  return writeContract({
    abi: ieasABI,
    ...config,
  } as unknown as WriteContractArgs<typeof ieasABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link ieasABI}__.
 */
export function prepareWriteIeas<
  TAbi extends readonly unknown[] = typeof ieasABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({
    abi: ieasABI,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ieasABI}__.
 */
export function watchIeasEvent<
  TAbi extends readonly unknown[] = typeof ieasABI,
  TEventName extends string = string,
>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi'>,
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  return watchContractEvent(
    { abi: ieasABI, ...config } as WatchContractEventConfig<TAbi, TEventName>,
    callback,
  )
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link iSchemaRegistryABI}__.
 */
export function getISchemaRegistry(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: iSchemaRegistryABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iSchemaRegistryABI}__.
 */
export function readISchemaRegistry<
  TAbi extends readonly unknown[] = typeof iSchemaRegistryABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return readContract({
    abi: iSchemaRegistryABI,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iSchemaRegistryABI}__.
 */
export function writeISchemaRegistry<TFunctionName extends string>(
  config:
    | Omit<
        WriteContractPreparedArgs<typeof iSchemaRegistryABI, TFunctionName>,
        'abi'
      >
    | Omit<
        WriteContractUnpreparedArgs<typeof iSchemaRegistryABI, TFunctionName>,
        'abi'
      >,
) {
  return writeContract({
    abi: iSchemaRegistryABI,
    ...config,
  } as unknown as WriteContractArgs<typeof iSchemaRegistryABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link iSchemaRegistryABI}__.
 */
export function prepareWriteISchemaRegistry<
  TAbi extends readonly unknown[] = typeof iSchemaRegistryABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({
    abi: iSchemaRegistryABI,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iSchemaRegistryABI}__.
 */
export function watchISchemaRegistryEvent<
  TAbi extends readonly unknown[] = typeof iSchemaRegistryABI,
  TEventName extends string = string,
>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi'>,
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  return watchContractEvent(
    { abi: iSchemaRegistryABI, ...config } as WatchContractEventConfig<
      TAbi,
      TEventName
    >,
    callback,
  )
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link iSchemaResolverABI}__.
 */
export function getISchemaResolver(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: iSchemaResolverABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iSchemaResolverABI}__.
 */
export function readISchemaResolver<
  TAbi extends readonly unknown[] = typeof iSchemaResolverABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return readContract({
    abi: iSchemaResolverABI,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iSchemaResolverABI}__.
 */
export function writeISchemaResolver<TFunctionName extends string>(
  config:
    | Omit<
        WriteContractPreparedArgs<typeof iSchemaResolverABI, TFunctionName>,
        'abi'
      >
    | Omit<
        WriteContractUnpreparedArgs<typeof iSchemaResolverABI, TFunctionName>,
        'abi'
      >,
) {
  return writeContract({
    abi: iSchemaResolverABI,
    ...config,
  } as unknown as WriteContractArgs<typeof iSchemaResolverABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link iSchemaResolverABI}__.
 */
export function prepareWriteISchemaResolver<
  TAbi extends readonly unknown[] = typeof iSchemaResolverABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({
    abi: iSchemaResolverABI,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link iWorldIdABI}__.
 */
export function getIWorldId(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: iWorldIdABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iWorldIdABI}__.
 */
export function readIWorldId<
  TAbi extends readonly unknown[] = typeof iWorldIdABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return readContract({
    abi: iWorldIdABI,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link schemaResolverABI}__.
 */
export function getSchemaResolver(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: schemaResolverABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link schemaResolverABI}__.
 */
export function readSchemaResolver<
  TAbi extends readonly unknown[] = typeof schemaResolverABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return readContract({
    abi: schemaResolverABI,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link schemaResolverABI}__.
 */
export function writeSchemaResolver<TFunctionName extends string>(
  config:
    | Omit<
        WriteContractPreparedArgs<typeof schemaResolverABI, TFunctionName>,
        'abi'
      >
    | Omit<
        WriteContractUnpreparedArgs<typeof schemaResolverABI, TFunctionName>,
        'abi'
      >,
) {
  return writeContract({
    abi: schemaResolverABI,
    ...config,
  } as unknown as WriteContractArgs<typeof schemaResolverABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link schemaResolverABI}__.
 */
export function prepareWriteSchemaResolver<
  TAbi extends readonly unknown[] = typeof schemaResolverABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({
    abi: schemaResolverABI,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link semverABI}__.
 */
export function getSemver(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: semverABI, ...config })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link semverABI}__.
 */
export function readSemver<
  TAbi extends readonly unknown[] = typeof semverABI,
  TFunctionName extends string = string,
>(config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return readContract({
    abi: semverABI,
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link worldIdEnabledABI}__.
 */
export function getWorldIdEnabled(config: Omit<GetContractArgs, 'abi'>) {
  return getContract({ abi: worldIdEnabledABI, ...config })
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link worldIdEnabledABI}__.
 */
export function writeWorldIdEnabled<TFunctionName extends string>(
  config:
    | Omit<
        WriteContractPreparedArgs<typeof worldIdEnabledABI, TFunctionName>,
        'abi'
      >
    | Omit<
        WriteContractUnpreparedArgs<typeof worldIdEnabledABI, TFunctionName>,
        'abi'
      >,
) {
  return writeContract({
    abi: worldIdEnabledABI,
    ...config,
  } as unknown as WriteContractArgs<typeof worldIdEnabledABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link worldIdEnabledABI}__.
 */
export function prepareWriteWorldIdEnabled<
  TAbi extends readonly unknown[] = typeof worldIdEnabledABI,
  TFunctionName extends string = string,
>(config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi'>) {
  return prepareWriteContract({
    abi: worldIdEnabledABI,
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link worldIdEnabledABI}__.
 */
export function watchWorldIdEnabledEvent<
  TAbi extends readonly unknown[] = typeof worldIdEnabledABI,
  TEventName extends string = string,
>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi'>,
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  return watchContractEvent(
    { abi: worldIdEnabledABI, ...config } as WatchContractEventConfig<
      TAbi,
      TEventName
    >,
    callback,
  )
}
