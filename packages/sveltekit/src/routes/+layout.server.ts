export async function load(data) {
	const {locals} = data
	const { user } = await locals.auth.validate() || {}
	return { user }
}
