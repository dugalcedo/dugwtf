export const getErrorMessage = async (res: Response): Promise<string> => {
    try { /* Try getting JSON */
        const data = await res.json()
        console.log("getErrorMessage data:", data)
        
        if (!data.msg) throw null;
        return data.msg
    } catch {
        return `Error ${res.status}: ${res.statusText}`
    }
}