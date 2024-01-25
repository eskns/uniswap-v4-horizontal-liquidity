# uniswap-v4-horizontal-liquidity
Uniswap-v4 is an exciting new development in the DeFi sector of the Ethereum ecosystem. It is still under development. Draft versions of the codebase is available on github.

We are excited about their singleton architecture for holding all pools, and their new features like hooks and flash accounting. We have highlighted the [possibilities V4 opens up for liquidity providers](https://www.linkedin.com/posts/essential-knowledge-systems-llc_defi-horizontal-and-vertical-liquidity-activity-7152029239293136896-GBXx) on LinkedIn. 

This repo is under development and, when completed, it will provide LPs the capabilities to perform what-if scenarios before changing their positions on one or more of their pools using their browsers. Once satisfied they can interact with our hooks contracts on the Ethereum blockchain to adjust their positions horizontally and vertically. 

## For developers
One advantage of using this package is that you can store sensitive data in .env files. The included .gitignore file will exclude the .env files from being uploaded to online repositories.

packages/foundry/create.js uses your private key from packages/foundry/.env to deploy your contract(s) to anvil.

packages/sveltekit/src/routes/\(authenticated/\)/home/+page.server.ts reads data from packages/sveltekit/.env and sends it to the client.

**Initial Setup**

After cloning the repo do the following:

```
mkdir -p ./packages/foundry/out
pnpm install
pnpm foundry:install
```

Follow the output of the last command to complete the installation of foundry. Essentially, this involves running the command foundryup. Then, run:

```bash
# Note: If you get an error when running init, see below.
pnpm forge:init
pnpm forge:build
pnpm anvil
```
---
**Error while running `pnpm forge:init`**: If you get an error while running the init function, you need to setup github name and email. Temporarily, you could do the following:

```bash
git config user.name test
git config user.email test@test.com
```
---

The last command above (`pnpm anvil`) creates a local blockchain with a chain-id 1337. This command will also output 10 accounts and their corresponding private keys. 

In a seperate window or using your IDE create the file packages/foundry/.env and add the following two entries:

```
PRIVATE_KEY="0x..."
RPC_URL="http://127.0.0.1:8545"
```

Replace "0x..." above with a private key from the output of anvil.

In a separate window, if necessary, run the following command:

```
pnpm forge:create src/Counter.sol:Counter
```

This command will read the .env file you just created and deploy the Counter contract from packages/foundry/src/Counter.sol at the RPC_URL using the specified PRIVATE_KEY. It will also create a contract_address.json file. 

Next run:

```
pnpm db:init
```

This command will initialize the database and create a pre-populated packages/sveltekit/.env file. Edit this file and copy the contract address from packages/foundry/contract_address.json to CONTRACT_ADDRESS. Make sure that the CONTRACT_URL is the same as the RPC_URL in packages/foundry/.env.

Now run:

```
pnpm dev
```

Goto the website using your browser and signup and signin. You will see buttons for Connect etc corresponding to functions from packages/foundry/src/Counter.sol.

If you terminate/kill anvil you need to start it again and redeploy the contract. Whenever you redeploy the contract, the contract address will be different even if you didn't modify the contract.

**Regular Chores**

When neither anvil nor the webserver (vite) are running then you need to start both. When you stop anvil it doens't save its state. This means if you restart anvil, you need to redeploy your contract(s).

You need to
 - Start anvil
    - pnpm anvil
 - Deploy the contract
    - pnpm forge:create src/Counter.sol:Counter
        - This command will deploy the contract and update contract_address.json
 - Copy the contract address from packages/foundry/contract_address.json to CONTRACT_ADDRESS in packages/sveltekit/.env
 - Start vite
    - pnpm dev
 - Visit the website and continue developing!

Also keep in mind that if you modify the .env files then you need to restart either anvil or vite depending upon which .env file you modified.

Happy coding!
