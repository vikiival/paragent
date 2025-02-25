import { ToolConfig } from './allTools.js';
import { createViemWalletClient } from '../viem/createViemWalletClient.js';
import { ERC20_ABI, ERC20_BYTECODE } from '../const/contractDetails.js';
import { createViemPublicClient } from '../viem/createViemPublicClient.js';
import { transfer  } from '@paraspell/xcm-router'
import { buildAccount, me } from '../polkadot/index.js'

interface SwapTokenArgs {
    from: string;
    to: string;
    currencyFrom: string;
    currencyTo: string;
    amount: string;
    sender?: string;
    receiver?: string;
}

export const swapTokenTool: ToolConfig<SwapTokenArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'swap_tokens',
            description: 'Swap tokens from one chain to another with defined currency',
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
                    currencyFrom: {
                        type: 'string',
                        description: 'The symbol of the token on the source chain'
                    },
                    currencyTo: {
                        type: 'string',
                        description: 'The symbol of the token on the destination chain'
                    },
                    amount: {
                        type: 'string',
                        description: 'The amount of tokens to swap'
                    },
                    sender: {
                        type: 'string',
                        description: 'The address of the sender, it will be always your address'
                    },
                    receiver: {
                        type: 'string',
                        description: 'The address of the receiver'
                    },
                },
                required: ['from', 'to', 'currencyFrom', 'currencyTo', 'amount']
            }
        }
    },
    handler: async ({ from, to, currencyFrom, currencyTo, amount, sender, receiver }: SwapTokenArgs) => {

        const account = buildAccount()

        await transfer({
         from: 'Polkadot',
         to: 'AssetHubPolkadot',
         currencyFrom: { symbol: 'DOT' },
         currencyTo: { symbol: 'DOT' },
         amount: '1e9',
         slippagePct: '1',
         senderAddress: me(),
         recipientAddress: receiver,
         signer: account as any,
         onStatusChange: (status) => {
            console.log('Transaction status changed to:', status)
         }
        });

        // const x = await transfer({
        //      from: from as any,
        //      to: to as any,
        //      currencyFrom: { symbol: currencyFrom },
        //      currencyTo: { symbol: currencyTo },
        //      amount: amount,
        //      slippagePct: '1',
        //      senderAddress: sender as any,
        //      recipientAddress: receiver,
        //      signer: account as any,
        //      onStatusChange: (status) => {
        //        console.log('Transaction status changed to:', status)
        //      },
        // });
    }
};