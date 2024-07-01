import {defineStore} from "pinia";
import { Meta, TransactionSTATE } from '@/types/transaction';

type state = {
    currentTransactionID: string,
    transactionState: TransactionSTATE,
    transactionMeta: Meta
}
export const useTransactionStore = defineStore('transaction', {
    state: ():state => ({
        currentTransactionID: '',
        transactionState: TransactionSTATE.NONE,
        transactionMeta: {name: '', description: ''},
    }),
    actions: {
        setTransactionState(state: TransactionSTATE) {
            this.transactionState = state
        },
        setCurrentTransactionID(id: string){
            this.currentTransactionID = id
        },
        setTransactionMeta(meta: Meta){
            this.transactionMeta = meta
        }
    }
})

