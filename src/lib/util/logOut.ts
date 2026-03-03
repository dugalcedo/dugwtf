export const logOut = async () => {
    const res = await fetch("/api/db/user/logout")
    setTimeout(() => {
        window.location.href = "/"
    }, 100);
}