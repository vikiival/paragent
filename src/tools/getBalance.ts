import { formatUnits } from 'viem'
import { magicApi } from '../polkadot/index.js'
import { ToolConfig } from './allTools.js'

interface GetBalanceArgs {
    wallet: string;
}

export const getBalanceTool: ToolConfig<GetBalanceArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_balance',
            description: 'Get the balance of a wallet (denominated in DOT)',
            parameters: {
                type: 'object',
                properties: {
                    wallet: {
                        type: 'string',
                        pattern: '^1[a-fA-F0-9]{48,}$',
                        description: 'The wallet address to get the balance of',
                    }
                },
                required: ['wallet']
            }
        }
    },
    handler: async ({ wallet }) => {
        return await getBalance(wallet);
    }
};

async function getBalance(wallet: string) {
    const api = await magicApi('ahp')
    // const publicClient = createViemPublicClient();
    const balance: any = await api.query.system.account(wallet);
    return formatUnits(balance.data.free.toString(), 10);
}