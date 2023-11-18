import { Client, cacheExchange, fetchExchange, useQuery } from 'urql';

const APIURL = 'https://polygon-mumbai.easscan.org/graphql'


let REQUESTED_SCHEMA = "0x5168144c45bf7c0758dc716151ef449b25c0b1583462da35d242d7a45660cb09"; //TODO
let PICKED_UP_SCHEMA = "0x5c5b112092ac1af2aa778890732f8edf474efd8f1f1db3749f231018e3d0ca8d" //TODO
let DELIVERED_SCHEMA = "0x05aa3b5bf919b9eaa9571ca139248d72297f44b7026d0d5b63e301039fb5271b" //TODO
let COMPLETED_SCHEMA = "0xefdd971c2c78f490a565dcd1d00ffd349827b81d299f8aeee6de086e2b882f97" //TODO


const attestationsQuery = () => `
    query GetAttestations($schemaId: string!) {
        attestations (where: {schemaId: {equals: $schemaId}}) {
          id
        }
    }
`

export const graphClient = new Client({
    url: APIURL,
    exchanges: [cacheExchange, fetchExchange],
})

export async function getAttestationsBySchemaId(schemaId: string) {
    const result = graphClient.query(
        attestationsQuery(),
        { schemaId: schemaId }
    );

    return result
}

export async function getDeliveryRequestAttestations() {
    return await getAttestationsBySchemaId(REQUESTED_SCHEMA)
}

export async function getDeliveryPickupAttestations() {
    return await getAttestationsBySchemaId(PICKED_UP_SCHEMA)
}

export async function getDeliveryDeliveredAttestations() {
    return await getAttestationsBySchemaId(DELIVERED_SCHEMA)
}

export async function getDeliveryCompletedAttestations() {
    return await getAttestationsBySchemaId(COMPLETED_SCHEMA)
}

// Create Hooks for the above functions
export function useDeliveryRequestAttestations() {
    const [result] = useQuery({
        query: attestationsQuery(),
        variables: { schemaId: REQUESTED_SCHEMA }
    })

    return result
}

export function useDeliveryPickupAttestations() {
    const [result] = useQuery({
        query: attestationsQuery(),
        variables: { schemaId: PICKED_UP_SCHEMA }
    })

    return result
}

export function useDeliveryDeliveredAttestations() {
    const [result] = useQuery({
        query: attestationsQuery(),
        variables: { schemaId: DELIVERED_SCHEMA }
    })

    return result
}

export function useDeliveryCompletedAttestations() {
    const [result] = useQuery({
        query: attestationsQuery(),
        variables: { schemaId: COMPLETED_SCHEMA }
    })

    return result
}