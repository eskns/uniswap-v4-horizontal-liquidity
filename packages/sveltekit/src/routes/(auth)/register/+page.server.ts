import { fail, redirect } from '@sveltejs/kit'
import { superValidate, setError } from 'sveltekit-superforms/server'

import { auth } from '$lib/server/auth'
import { authSchema } from '$lib/zod/schema'
import { generateRandomString } from "lucia/utils";

const alphabet =
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// if the user exists, redirect authenticated users to the profile page
export async function load({ locals }) {
	const session = await locals.auth.validate()
	if (session) throw redirect(302, '/home')

	// always return `form` in load and form actions
	const form = await superValidate(authSchema)
	return { form }
}

export const actions = {
	async default({ request, locals }) {
		const form = await superValidate(request, authSchema)

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const user = await auth.createUser({
					userId: generateRandomString(15, alphabet),
					key: {
						providerId: 'username',
						providerUserId: form.data.username.toLocaleLowerCase(),
						password: form.data.password,
					},
					attributes: {
						username: form.data.username,
					//admin: false,
					},
			})
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			})
			// const sessionCookie = auth.createSessionCookie(session)
			locals.auth.setSession(session)
		} catch (error) {
			console.log(error)
			return setError(form, 'username', 'Username already in use')
		}
		throw redirect(302, '/login')

	},
}
