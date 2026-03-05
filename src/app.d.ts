// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			user?: {
				displayName: string
				email: string
				verified: boolean
				lastVerificationCodeSentAt?: Date
				isAdmin: boolean
			}
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
