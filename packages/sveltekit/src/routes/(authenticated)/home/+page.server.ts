import { redirect } from '@sveltejs/kit'
import { CONTRACT_URL } from '$env/static/private'
import { CONTRACT_ADDRESS } from '$env/static/private'

export async function load({ locals }) {
	//const { user } = await locals.auth.validate() || {}
	//if (!user) throw redirect(302, '/login')
	//return { user }
	return { CONTRACT_URL, CONTRACT_ADDRESS }
}
