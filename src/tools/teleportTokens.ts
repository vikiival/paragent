import { ToolConfig } from './allTools.js';
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ERC20_ABI, ERC20_BYTECODE } from '../const/contractDetails.js';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { transfer  } from '@paraspell/xcm-router'
import { buildAccount, magicApi, me } from '../polkadot/index.js'
import { Builder } from '@paraspell/sdk-pjs'

interface TeleportTokenArgs {
    from: string;
    to: string;
    symbol: string;
    amount: string;
    sender?: string;
    receiver?: string;
}

export const teleportTokenTool: ToolConfig<TeleportTokenArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'teleport_tokens',
            description: 'Teleport tokens from one chain to another with defined currency',
            parameters: {
                type: 'object',
                properties: {
                    from: {
                        type: 'string',
                        description: 'The name of the source chain'
                    },
                    to: {
                        type: 'string',
                        description: 'The name of the destination chain'
                    },
                    symbol: {
                        type: 'string',
                        description: 'The symbol of the token on the source chain'
                    },
                    amount: {
                        type: 'string',
                        description: 'The amount of tokens to swap, multiply the amount by 1e10'
                    }
                },
                required: ['from', 'to', 'symbol', 'amount']
            }
        }
    },
    handler: async ({ from, to, symbol, amount, sender, receiver }: TeleportTokenArgs) => {

        const account = buildAccount()
        const api = await magicApi('ahp')

        const URL= 'https://api.lightspell.xyz'

        const response = await fetch(`${URL}/x-transfer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: "Polkadot", // Or Kusama
            from: "AssetHubPolkadot",   // Replace "Parachain" with destination Parachain, e.g., "Moonbeam" or custom Multilocation
            currency: { symbol: 'DOT', amount: 1e9},
            address: "15BZFbMsCR1ki59mJHo8iAjgAozGJaYHR3oVRPQWNnoEZiL9", // Replace "Address" with destination wallet address (In AccountID32 or AccountKey20 Format) or custom Multilocation
        })
        });

        const hash = await response.json();
        
        const call = api.tx(hash)

        const tx = await call.signAndSend(account)

        console.log('tx hash is:', tx.toString())
    }
};