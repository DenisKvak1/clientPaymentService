<script setup lang="ts">
import { useTransactionLoad } from '@/hooks/transactionLoad';
import { useIntervalFn } from '@vueuse/core';
import { ref } from 'vue';

const isLoad = useTransactionLoad()
const countdown = ref(10);

const updateCountdown = () => {
    if (countdown.value > 0) {
        countdown.value--;
    } else {
        countdown.value = 10;
    }
};
useIntervalFn(updateCountdown, 1000);


</script>

<template>
<div v-if="isLoad" class="flex h-screen items-center justify-center">
    <div class="flex flex-col items-center justify-center">
        <span class="text-xl font-semibold">Ожидает подтверждение</span>
        <span class="text-xl font-semibold">До проверки <span>{{ countdown }}</span></span>
    </div>
</div>
</template>

<style scoped>

</style>
