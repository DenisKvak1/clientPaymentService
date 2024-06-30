import { TransactionInfo } from '@/types/transaction';
import { bankInfo } from '@/types';

type transactionStateResponse = 'error' | 'ok'
type transactionResponse = {
    status: transactionStateResponse,
    errorText?: string
}
export type transactionInfoResponse = transactionResponse & {
    transactionInfo: TransactionInfo
}
export type availableBanksResponse =  transactionResponse & {
    availableBanks: bankInfo[]
}
export type selectBankResponse =  transactionResponse
export type confirmPaymentResponse =  transactionResponse
export type cancelPaymentResponse =  transactionResponse


