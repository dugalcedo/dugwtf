let currentId = 0

export const nextId = () => {
    currentId++
    return currentId
}