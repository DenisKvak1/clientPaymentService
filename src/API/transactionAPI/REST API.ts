import { TransactionAPI } from '@/types/API/transactionAPI';
import { ICardRequisites } from '@/types';
import paymentAxios from '../../../axiosConfig';
import { availableBanksResponse, selectBankResponse, transactionInfoResponse } from '@/types/API/REST_API_TYPES';

class TransactionRestAPI implements TransactionAPI{
    async confirmPayment(transactionId: string, requisites: ICardRequisites): Promise<selectBankResponse> {
        const response = await paymentAxios.post<selectBankResponse>(
            `/transaction/confirmPayment`,
            {
                transaction_id: transactionId,
                requisites: requisites
            }
        );
        return response.data
    }

    async getAvailableBanks(transactionId: string): Promise<availableBanksResponse> {
        const response = await paymentAxios.get<availableBanksResponse>(`/transaction/getAvailableBanks/${transactionId}`,);
        return response.data
    }

    async getInfo(transactionId: string): Promise<transactionInfoResponse> {
        const response = await paymentAxios.get<transactionInfoResponse>(`/transaction/getInfo/${transactionId}`);
        return response.data
    }

    async selectBank(transactionId: string, bankName: string): Promise<selectBankResponse> {
        const response = await paymentAxios.post<selectBankResponse>(
            `/transaction/selectBank`,
            {
                transaction_id: transactionId,
                bank_name: bankName
            }
        );
        return response.data
    }
}
export const transactionRestAPI = new TransactionRestAPI();
