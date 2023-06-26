function openModal(options) {
    let {
        confirm = 'ok',
        cancel = 'cancel',
        onConfirm = ()=>{},
        hasCancel = true,
        heading,
        content
    } = options

    createComponent({
        attr: {
            class: 'blackout',
        },
        children: [
            {
                attr: {
                    class: 'modal'
                },
                children: [
                    {
                        attr: {class: 'modal_heading'},
                        content: heading
                    },
                    {
                        attr: {class: 'modal_body'},
                        content
                    },
                    {
                        attr: {class: 'modal_footer'},
                        children: [
                            {
                                if: hasCancel,
                                tag: 'button',
                                content: cancel,
                                events: {
                                    click: closeModal
                                }
                            },
                            {
                                tag: 'button',
                                content: confirm,
                                events: {
                                    click: () => {
                                        onConfirm()
                                        closeModal()
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }, document.body)
}

function closeModal() {
    let blackout = _('.blackout')
    blackout.remove()
}

export default openModal