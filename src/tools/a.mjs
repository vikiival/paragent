const URL= 'https://api.lightspell.xyz'

const response = await fetch(`${URL}/x-transfer`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      from: "Polkadot", // Or Kusama
      to: "AssetHubPolkadot",   // Replace "Parachain" with destination Parachain, e.g., "Moonbeam" or custom Multilocation
      currency: { symbol: 'DOT', amount: 1e9},
      address: "15BZFbMsCR1ki59mJHo8iAjgAozGJaYHR3oVRPQWNnoEZiL9", // Replace "Address" with destination wallet address (In AccountID32 or AccountKey20 Format) or custom Multilocation
  })
});

const data = await response.json();
console.log(data);