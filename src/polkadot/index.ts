import { ApiPromise, HttpProvider, Keyring } from "@polkadot/api"
import { hexToU8a } from "@polkadot/util"
import { getPolkadotSigner, PolkadotSigner } from "polkadot-api/signer"
import { ed25519 } from "@noble/curves/ed25519"
import { Signer } from "@polkadot/types/types"



const keyring = new Keyring({ ss58Format: 0 })

const AHK_URL = 'https://kusama-asset-hub-rpc.polkadot.io'
const AHP_URL =  'https://sys.ibp.network/asset-hub-polkadot' // 'https://polkadot-asset-hub-rpc.polkadot.io'
const AHR_URL = 'https://rococo-asset-hub-rpc.polkadot.io'

const CHAIN = 'ahp'

const resolveUrl = (chain?: string) => {
  const resolve = chain || CHAIN
  switch (resolve) {
    case 'ahk':
      return AHK_URL
    case 'ahp':
      return AHP_URL
    case 'ahr':
      return AHR_URL
    default:
      return AHK_URL
  } 
}

export const magicApi = (chain?: string) => {
  const BASE_URL = resolveUrl(chain)
  const provider = new HttpProvider(BASE_URL)
  return ApiPromise.create({ provider })
}

export const me = () => {
  return buildAccount().address
}

export const buildAccount = () => {
    const seed = process.env.PRIVATE_KEY
    const pair = keyring.addFromSeed(hexToU8a(seed))
    return pair
}

export function signerOf(): PolkadotSigner {
	const seed = process.env.PRIVATE_KEY!
	const signer = getPolkadotSigner(
		ed25519.getPublicKey(seed),
		"Ed25519",
		(input) => ed25519.sign(input, seed),
	);
	return signer;
}