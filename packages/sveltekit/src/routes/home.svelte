<script lang="ts">
	import { page } from '$app/stores'
	import {Counter__factory} from '@web3skeb-1/foundry'
    import { ethers } from 'ethers'

    let provider: ethers.BrowserProvider | ethers.JsonRpcApiProvider | null;
		let signer: ethers.JsonRpcSigner;
		let address: string;
		let number: string = "";
		let array: string[] = [];
		const CONTRACT_URL = 'http://127.0.0.1:8545'; //anvil url
		const CONTRACT_ADDRESS = '0x...' //copy contract address from anvil output to here

    $: user = $page.data.user

    const handleConnectWallet = async () => {
        // ethers.BrowserProvider is a provider for state changes. It will trigger MetaMask
        provider = window.ethereum? new ethers.BrowserProvider(window.ethereum) :
					new ethers.JsonRpcProvider(CONTRACT_URL);
		console.log('provider: ', provider)
        // setProvider(myProvider) // You must define the setProvider function just like HW1
        if (provider) { // TypeScript is strict with types and you must check for `undefined` variables
            await provider.send('eth_requestAccounts', [])
            signer = await provider.getSigner()
						address = await signer.getAddress()
						console.log(address)
            // setAddress(await signer.getAddress())
        }
    }

const getNumber = async () => {
	// ethers.JsonRpcProvider is for non-state changing operations. It will NOT trigger MetaMask. This uses the TypeChain output.
	// const provider = new ethers.JsonRpcProvider()
	if(!provider) {
		await handleConnectWallet()
	}
	const counter = Counter__factory.connect(CONTRACT_ADDRESS, provider)
		console.log('counter: ', counter)
		const n = await counter.number()
		number = ethers.formatUnits(n)
		console.log('number: ', ethers.formatUnits(n), n) // Or other operations
	}
	
	const handleIncrement = async () => {
		console.log('increment')
		if(!provider) {
			await handleConnectWallet()
		}
		const signer = await provider.getSigner()
		const counter = Counter__factory.connect(CONTRACT_ADDRESS, signer)
		await counter.increment()
		await getNumber()
		}
		
	const handleGetArray = async () => {
		if(!provider) {
			await handleConnectWallet()
		}
		const counter = Counter__factory.connect(CONTRACT_ADDRESS, provider)
		array = await counter.getArray()
		console.log(array) // Entire array
		console.log(array[0]) // First element of array
	}
</script>

<div class="mt-16 grid justify-items-center text-center">
{#if number}
	<span> Number: {number} </span>
{/if}
{#each array as item}
<span>{item}</span>
{/each}
<button class="justify-self-right" on:click={handleConnectWallet} > Connect </button>
<button class="justify-self-right" on:click={getNumber} > Get Number </button>
<button class="justify-self-right" on:click={handleIncrement} > Increment Number </button>
<button class="justify-self-right" on:click={handleGetArray} > Get Array </button>

</div>	
