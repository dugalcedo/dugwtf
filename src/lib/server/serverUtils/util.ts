const CHARS = "qwertyuiopasdfghjklzxcbvnmQWERTYUIOPASDFGHJKLZXCVNM1234567890"
export const genCode = () => {
    let code = ""
    for (let i = 0; i < 20; i++) {
        code += CHARS[Math.floor(Math.random()*CHARS.length)]
    }
    return code
}