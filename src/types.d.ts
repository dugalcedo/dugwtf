type Json = (
    | Record<string, Json>
    | string
    | number
    | null
    | boolean
    | Json[]
)

