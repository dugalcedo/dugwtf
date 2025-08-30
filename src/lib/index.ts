export const getErrorMessage = async (res: Response): Promise<string> => {
    try { /* Try getting JSON */
        const { message } = await res.json()
        if (!message) throw null;
        return message
    } catch {
        return `Error ${res.status}: ${res.statusText}`
    }
}