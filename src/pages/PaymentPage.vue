<script setup lang="ts">
import MySelectBank from '@/components/My-SelectBank.vue';
import { computed, onMounted, Ref, ref } from 'vue';
import { transactionRestAPI } from '@/API/transactionAPI/REST API';
import { useTransactionStore } from '@/stores/transactionStore';
import { bankInfo } from '@/types';
import { useTransactionLoad } from '@/hooks/transactionLoad';
import CardForm from '@/components/cardForm.vue';
import { TransactionSTATE } from '@/types/transaction';

const transactionStore = useTransactionStore();
const banks: Ref<bankInfo[]> = ref([]);
const isSelectBanksState = computed(()=> transactionStore.transactionState !== TransactionSTATE.SELECT_BANK_STATE)
const serverCardError = ref('')

const isLoaded = useTransactionLoad(async ()=>{
    const response = await transactionRestAPI.getAvailableBanks(transactionStore.currentTransactionID);
    banks.value = response.availableBanks
})
const submitSelectBank = async (bankID: string)=> {
    const response = await transactionRestAPI.selectBank(transactionStore.currentTransactionID, bankID);
    if(response.status === 'ok'){
        transactionStore.setTransactionState(TransactionSTATE.WAITING_FOR_REQUISITES_STATE)
    }
}
const submitPayment = async (values: {card: number, cvv2: number, date: string })=> {
    const response = await transactionRestAPI.confirmPayment(
        transactionStore.currentTransactionID,
        {
        number: values.card,
        cvv2: values.cvv2,
        date: values.date,
    })
    if(response.status === "ok"){
        transactionStore.setTransactionState(TransactionSTATE.WAITING_CONFIRMATION_STATE)
        serverCardError.value = ''
    } else {
        serverCardError.value = response.errorText as string
    }
}

</script>

<template>
    <div v-if="isLoaded" class="root flex gap-20">
        <my-select-bank :disabled="isSelectBanksState" @submit="submitSelectBank" class="banks" :banks="banks"></my-select-bank>
        <card-form :server-error="serverCardError" @submit="submitPayment" class="requisites"></card-form>
    </div>
</template>

<style scoped>
.root{
    margin-top: 100px;
}
.banks {
    width: 300px;
}
.requisites {
    width: 400px;
}
</style>
