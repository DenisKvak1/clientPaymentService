import { useTransactionStore } from '@/stores/transactionStore';
import { onMounted, onUnmounted, ref } from 'vue';
import { transactionRestAPI } from '@/API/transactionAPI/REST API';
import { useRoute, useRouter } from 'vue-router';
import { TransactionSTATE } from '@/types/transaction';

export function useTransactionLoad(callback?:Function) {
    const transactionStore = useTransactionStore();
    const route = useRoute()
    const router = useRouter()
    const dataLoaded = ref(false)
    let intervalID:number
    onMounted(async ()=>{
        const transactionID = route.params.id as string

        const transactionInfo = await transactionRestAPI.getInfo(transactionID)

        if(transactionInfo?.transactionInfo){
            transactionStore.setCurrentTransactionID(transactionID)
            transactionStore.setTransactionState(transactionInfo.transactionInfo.state)
            transactionStore.setTransactionMeta(transactionInfo.transactionInfo.meta)

            if(transactionInfo?.transactionInfo.state === TransactionSTATE.WAITING_CONFIRMATION_STATE){
                if(route.path !== `/awaitConfirm/${transactionID}`) {
                    await router.push(`/awaitConfirm/${transactionID}`)
                }
                intervalID = setInterval(async () => {
                    const info = (await transactionRestAPI.getInfo(transactionID)).transactionInfo
                    if(
                        info.state === TransactionSTATE.FINISHED_REJECT_STATE ||
                        info.state === TransactionSTATE.FINISHED_SUCCESS_STATE ||
                        info.state === TransactionSTATE.DELETED_STATE
                    ) {
                        await router.push(`/finished/${transactionID}`)
                        clearInterval(intervalID)
                    }
                }, 10000)
            }

            if(
                transactionInfo.transactionInfo.state === TransactionSTATE.FINISHED_REJECT_STATE ||
                transactionInfo.transactionInfo.state === TransactionSTATE.FINISHED_SUCCESS_STATE ||
                transactionInfo.transactionInfo.state === TransactionSTATE.DELETED_STATE
            ) {
                await router.push(`/finished/${transactionID}`)
                clearInterval(intervalID)
            }

            if(callback) callback()
        }  else {
            await router.push(`/notFound`)
        }
        dataLoaded.value = true
    })
    onUnmounted(()=> clearInterval(intervalID))
    return dataLoaded
}
