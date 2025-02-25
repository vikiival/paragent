import { magicApi } from '../polkadot/index.js'
import { ToolConfig } from './allTools.js'

interface ReadContractArgs {
    pallet: string;
    functionName: string;
    args: any[];
}

export const readContractTool: ToolConfig<ReadContractArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'read_contract',
            description: 'Read data from a smart contract',
            parameters: {
                type: 'object',
                properties: {
                    pallet: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The contract address to read from',
                    },
                    functionName: {
                        type: 'string',
                        description: 'The name of the function to call',
                    },
                    args: {
                        type: 'array',
                        description: 'Optional arguments for the function call',
                        items: {
                            type: 'string'
                        }
                    }
                },
                required: ['pallet', 'functionName', 'args']
            }
        }
    },
    handler: async ({ pallet, functionName, args = [] }) => {
        return await readContract(pallet, functionName, args);
    }
};

export async function readContract(
    pallet: string,
    functionName: string,
    args: any[],
) {
    const api = await magicApi('ahp')
    const result = await api.query[pallet][functionName](...args);

    return result.toHuman();
}
