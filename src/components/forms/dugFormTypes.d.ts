type DugFieldValidator<T> = (value: T, data: any) => (string|void) | Promise<string|void>

interface DF_Base<T> {
    label: string
    name: string
    _class?: string
    style?: string
    validate?: DugFieldValidator<T>
    required?: boolean
    type: (
        | 'text'
        | 'email'
        | 'password'
    )
}

interface DF_Text extends DF_Base<string> {
    type: 'text' | 'email' | 'password'
    min?: number
    max?: number
}

type DugField = (
    | DF_Text
)

type DugFieldSubmitContext = {
    e: SubmitEvent
    data: any
    setFormError: (msg: string) => void
}

type DugFieldHandler = (ctx: DugFieldSubmitContext) => void | Promise<void>

type DugFormConfig = {
    title: string
    submitBtnText: string
    fields: DugField[]
    handler: DugFieldHandler
}