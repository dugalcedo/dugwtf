import { redirect } from "@sveltejs/kit"
import type { RequestEvent } from "../$types"

export const GET = (evt: RequestEvent) => {
    const path = (evt.params as any)?.other || '';
    return redirect(302, 'https://vivien-ruinous-efferently.ngrok-free.dev/' + path)
}