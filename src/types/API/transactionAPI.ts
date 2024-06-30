import { ICardRequisites } from '@/types';

export interface TransactionAPI {
    getInfo(transactionId: string): Promise<any>,
    getAvailableBanks(transactionId: string): Promise<any>,
    selectBank(transactionId: string, bankName: string): Promise<any>,
    confirmPayment(transactionId: string, requisites: ICardRequisites): Promise<any>,
}
