export type NeodugData_FE = {
    user?: NeodugUser_FE
    emailVerification?: NeodugEmailVerification_FE
    error?: string
}

export type NeodugUser_FE = {
    _id: string
    username: string
    email: string
    verified: boolean
    commentboxes: NeodugCommentBox_FE[]
}

export type NeodugCommentBox_FE = {
    _id: string
    name: string
    comments: NeodugComment_FE
    user_id: string
    banned_ips?: string[]
    comments_require_approval?: boolean
}

export type NeodugComment_FE = {
    _id: string
    author: string
    body: string
    commentbox_id: string
    ip: string
    approved?: boolean
}

export type NeodugEmailVerification_FE = {
    email: string
    lastEmail: string
}

export type BlogPageData = {
    date: string
    md: string | null
}