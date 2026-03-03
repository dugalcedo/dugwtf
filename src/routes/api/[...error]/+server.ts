export const fallback = () => {
    return Response.json({
        msg: "not found"
    }, {
        status: 404
    })
}