import {defineStore} from "pinia";
import {TransactionSTATE} from "@/types/transaction";

type state = {
    currentTransactionID: string,
    transactionState: TransactionSTATE
}
export const useTransactionStore = defineStore('transaction', {
    state: ():state => ({
        currentTransactionID: '',
        transactionState: TransactionSTATE.NONE,
    }),
    actions: {
        setTransactionState(state: TransactionSTATE) {
            this.transactionState = state
        },
        setCurrentTransactionID(id: string){
            this.currentTransactionID = id
        }
    }
})

