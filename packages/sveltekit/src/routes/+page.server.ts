import { redirect } from '@sveltejs/kit'

export async function load(data) {
	const {locals} = data
	const { user } = await locals.auth.validate() || {}
	if(user) {
		throw redirect(302, '/home')
	}
	return { user }
}
