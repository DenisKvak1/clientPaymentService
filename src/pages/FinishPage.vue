<script setup lang="ts">
import { useTransactionLoad } from '@/hooks/transactionLoad';
import { useTransactionStore } from '@/stores/transactionStore';
import { TransactionSTATE } from '@/types/transaction';

const transactionStore = useTransactionStore();

const isLoad = useTransactionLoad()
</script>

<template>
<div v-if="isLoad" class="h-screen flex flex-col items-center justify-center">
    <span
        class="text-2xl font-semibold"
        v-if="transactionStore.transactionState === TransactionSTATE.FINISHED_SUCCESS_STATE"
    >Транзакция подтвержденна</span>
    <span
        class="text-2xl font-semibold"
        v-if="transactionStore.transactionState === TransactionSTATE.FINISHED_REJECT_STATE"
    >Транзакция отклоненна </span>
</div>
</template>

<style scoped>

</style>
