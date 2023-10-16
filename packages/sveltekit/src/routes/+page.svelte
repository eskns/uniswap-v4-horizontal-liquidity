<script lang="ts">
	import { page } from '$app/stores'
	import Default from './default.svelte'
	import Home from './home.svelte'

	$: user = $page.data.user
</script>

{#if user}
	<Home />
{/if}

<Default />
