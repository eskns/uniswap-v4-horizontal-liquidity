import { sveltekit } from 'lucia/middleware'
import {lucia} from 'lucia'
import {prisma} from '@lucia-auth/adapter-prisma'
import { dev } from '$app/environment'

import prismaClient from './database'

export const auth = lucia({
	adapter: prisma(prismaClient, {
		user: "authUser",
 		key: "authKey",
		session: "authSession"		
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			// IMPORTANT!!!!
			// `userId` included by default!!
			username: data.username
		};
	},

	// autoDatabaseCleanup: false, <= removed for now
	csrfProtection: true,
	// csrfProtection: {
	//	allowedSubDomains: ["foo"] // allow https://foo.example.com
	// }, // can be boolean
	// generateCustomUserId, <= removed, see `csrfProtection`
	// passwordHash, // previously `hash`
	// origin, <= removed
	sessionCookie: {
		name: "user_session", // session cookie name
		attributes: {
			// moved previous `sessionCookie` value here
			sameSite: "strict"
		}
	},
	// sessionExpiresIn // no change})
})

export type Auth = typeof auth
