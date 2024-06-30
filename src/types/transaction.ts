export enum TransactionSTATE {
    NONE = "NONE",
    NOT_FOUNDED= 'NOT_FOUNDED',
    SELECT_BANK_STATE = 'SELECT_BANK_STATE',
    WAITING_FOR_REQUISITES_STATE = 'WAITING_FOR_REQUISITES_STATE',
    WAITING_CONFIRMATION_STATE = 'WAITING_CONFIRMATION_STATE',
    FINISHED_SUCCESS_STATE = 'FINISHED_SUCCESS_STATE',
    FINISHED_REJECT_STATE = 'FINISHED_REJECT_STATE',
    DELETED_STATE = 'DELETED_STATE'
}
export type TransactionInfo = {
    state: TransactionSTATE
    meta: Meta
    sum: number
}
export type Meta = {
    name: string
    description: string
}
