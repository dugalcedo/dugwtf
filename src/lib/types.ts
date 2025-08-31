type NeodugData_FE = {
    user?: NeodugUser_FE
    emailVerification?: NeodugEmailVerification_FE
    error?: string
}

type NeodugUser_FE = {
    _id: string
    username: string
    email: string
    verified: boolean
    commentboxes: NeodugCommentBox_FE[]
}

type NeodugCommentBox_FE = {
    _id: string
    name: string
    comments: NeodugComment_FE
    user_id: string
}

type NeodugComment_FE = {
    _id: string
    author: string
    body: string
    commentbox_id: string
}

type NeodugEmailVerification_FE = {
    email: string
    lastEmail: string
}