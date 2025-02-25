import { ToolConfig } from './allTools.js';
import { me } from '../polkadot/index.js'

// No arguments needed since we're getting the connected wallet
interface GetWalletAddressArgs { }

export const getWalletAddressTool: ToolConfig<GetWalletAddressArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_wallet_address',
            description: 'Get the connected wallet address',
            // No parameters needed since we're getting the connected wallet
            parameters: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    },
    handler: async () => {
        return await getWalletAddress();
    }
};

async function getWalletAddress(): Promise<string> {
    return me();
}