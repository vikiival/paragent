# Onchain Agent

An AI-powered blockchain agent that can interact with the Abstract Testnet blockchain. Built with OpenAI's Assistant API and Polkadot-js.

## Features

- AI Assistant powered by [OpenAI's Assistant API](https://platform.openai.com/docs/assistants/overview) with custom personality
- Direct blockchain interactions through PolkadotJS
- Support for:
  - Teleportation
  - Balance checking

## Prerequisites

- Node.js (v18 or higher)
- TypeScript
- An OpenAI API key
- A wallet private key for the agent

## Getting Started

1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the repository:

```bash
cd onchain-agent
```

2. Install dependencies:

```bash
npm install
```

3. Create the `.env` file and add your OpenAI API key and wallet private key:

```bash
OPENAI_API_KEY=your_openai_api_key
PRIVATE_KEY=your_wallet_private_key
```

4. Run the agent:

```bash
npm start
```
