/** Returns a shuffled copy. The array you pass in is left alone. */
export default function shuffle<T>(arr: T[]): T[] {
    const pool = [...arr]
    const newArr: T[] = []
    while (pool.length) {
        const r = Math.floor(Math.random()*pool.length)
        newArr.push(pool.splice(r, 1)[0])
    }
    return newArr
}
