<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from 'radix-vue';
import { ref } from 'vue';
import MyBank from '@/views/myBank.vue';
import { Button } from '@/components/ui/button';
import { bankInfo } from '@/types';

const emit = defineEmits<{
    (event: 'submit', bank: string): void;
}>();
const toggleStateSingle = ref('');

const props = defineProps<{
    banks: bankInfo[],
    disabled?: boolean
}>();

const processSubmit = () => {
    if (props?.disabled) return;
    if (!toggleStateSingle.value) return;
    emit('submit', toggleStateSingle.value);
    toggleStateSingle.value = '';
};
</script>

<template>
    <div class="selectBank">
        <div class="text-2xl font-medium mb-3" v-if="props?.disabled">
            Банк уже выбран
        </div>
        <div class="text-2xl font-medium mb-3" v-if="!(props?.disabled)">Выберите банк:</div>
        <ToggleGroupRoot type="single" class="gap-2 flex flex-col" v-model="toggleStateSingle">
            <ToggleGroupItem
                v-for="item in props.banks"
                :as="'div'"
                :value="item.isAvailable ? item.id : ''"
                :disabled="!item.isAvailable"
            >
                <my-bank
                    :class="{select: toggleStateSingle === item.id}"
                    :name="item.name" :image="item.image"
                    :disabled="!item.isAvailable"
                >
                </my-bank>
            </ToggleGroupItem>
        </ToggleGroupRoot>
        <Button :disabled="props?.disabled" @click="processSubmit" class="mt-4">Выбрать</Button>
    </div>
</template>

<style scoped>
.selectBank {
    padding: 10px 20px;
    background: rgba(226, 226, 226, 0.32);
}

.select {
    background: rgba(0, 0, 0, 0.22);
}
</style>
