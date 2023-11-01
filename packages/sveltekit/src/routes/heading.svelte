<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton'
	import { LeafyGreen } from 'lucide-svelte'

	$: user = $page.data.user
</script>

{#if !user}
<AppBar>
	<svelte:fragment slot="lead">
		<a class="flex gap-1" href="/">
			<LeafyGreen /> Web3 Enterprise
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">

			<a href="/login">Log in</a>
			<a href="/register">Register</a>

		<LightSwitch />
	</svelte:fragment>
</AppBar>
{/if}
