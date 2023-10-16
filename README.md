# web3-sveltekit-bundle
Universal web app with traditional and blockchain based backends
After cloning the repo do the following:

```
pnpm install
pnpm foundry:install
pnpm forge:init
pnpm forge:build
pnpm anvil
```

Edit the createCounter command in the scripts section of packages/foundry/package.json to add a private key from anvil output. DO NOT hardwire a private key in production builds.

In a separate window:

```
pnpm forge:createCounter
```
This command is hardwired to deploy the Counter contract on the local blockchain. It will print the address at which the contract is deployed on the local blockchain. Copy this address to CONTRACT_ADDRESS in
packages/sveltekit/src/routes/home.svelte.
Then, in a seperate window:

```
pnpm dev
```

Goto the website and signup and signin. You will see buttons for Counter etc corresponding to functions from packages/foundry/src/Counter.sol.
