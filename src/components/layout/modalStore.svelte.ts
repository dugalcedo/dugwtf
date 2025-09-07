export type ModalType = (
    | 'prompt'
)

interface ModalConfig_base {
    type: ModalType
}

export interface ModalConfig_prompt extends ModalConfig_base {
    type: 'prompt'
    inputType: 'text' | 'color'
    defaultValue: string
    title: string
    onChange: (val: string) => void
    validate?: (val: string) => string | void
}

export type ModalConfig = (
    | ModalConfig_prompt
)

type ModalStore = {
    modal: null | ModalConfig
}

export const modalStore: ModalStore = $state({
    modal: null
})

export const openModal = (config: ModalConfig) => {
    modalStore.modal = config
}

export const closeModal = () => {
    modalStore.modal = null
}