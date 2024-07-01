import { useTransactionStore } from '@/stores/transactionStore';
import { onMounted, ref } from 'vue';
import { transactionRestAPI } from '@/API/transactionAPI/REST API';
import { useRoute, useRouter } from 'vue-router';

export function useTransactionLoad(callback:Function) {
    const transactionStore = useTransactionStore();
    const route = useRoute()
    const router = useRouter()
    const dataLoaded = ref(false)

    onMounted(async ()=>{
        const transactionID = route.params.id as string

        const transactionInfo = await transactionRestAPI.getInfo(transactionID)

        if(transactionInfo?.transactionInfo){
            transactionStore.setCurrentTransactionID(transactionID)
            transactionStore.setTransactionState(transactionInfo.transactionInfo.state)
            callback()
        } else {
            await router.push(`/notFound`)
        }
        dataLoaded.value = true
    })

    return dataLoaded
}
