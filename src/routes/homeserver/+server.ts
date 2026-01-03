import { redirect } from "@sveltejs/kit"

export const GET = () => {
    return redirect(302, 'https://vivien-ruinous-efferently.ngrok-free.dev/')
}