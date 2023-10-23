<script lang="ts">
	import { page } from '$app/stores'
	import Default from './default.svelte'

	$: user = $page.data.user
</script>

<Default />
