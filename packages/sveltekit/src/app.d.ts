// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/auth').Auth
		type DatabaseUserAttributes = {
			username: string
		}
		type DatabaseSessionAttributes = {}
	}
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
