# web3-sveltekit-bundle
Universal web app with traditional and blockchain based backends
After cloning the repo do the following:

```
pnpm install
pnpm foundry:install
pnpm forge init
pnpm forge build
pnpm anvil
```
In a separate window:
```
pnpm dev
```

Goto the website and signup and signin. You will see buttons for Counter etc corresponding to functions from packages/foundry/src/Counter.sol.
