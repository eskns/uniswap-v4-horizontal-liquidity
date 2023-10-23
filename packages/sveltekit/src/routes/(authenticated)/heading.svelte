<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton'
	import { LeafyGreen } from 'lucide-svelte'

	$: user = $page.data.user
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a class="flex gap-1" href="/home">
			<LeafyGreen /> Web3 Enterprise
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">

			<a href="/pricing">Pricing</a>
			<a href="/profile">Profile</a>
			<form method="POST" action="/logout" use:enhance>
				<button type="submit">Sign out</button>
			</form>
		<LightSwitch />
	</svelte:fragment>
</AppBar>
