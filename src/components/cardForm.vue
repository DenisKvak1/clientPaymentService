<script setup lang="ts">
import { Form, useField, useForm } from 'vee-validate';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { validateCardNumber } from '@/helper/cardValidator';
import { isCardDateValid, isDateFormatValid } from '@/helper/dateValidator';

type form = {
    card: number,
    cvv2: number,
    date: string
}
const props = defineProps<{
    serverError?: string
}>()

const emit = defineEmits<{
    (event: 'submit', values: form): void;
}>()

const validations = {
    card: (value: number) => {
        if(!value) return "Введите номер карты";
        if(!validateCardNumber(value)) return "Введите корректный номер карты"

        return true
    },
    cvv2: (value: number) => {
        if(!value) return "Введите CVV2 код"
        if(value < 100 || value > 999) return "Не корректный CVV2"

        return true
    },
    date: (value: string) => {
        if(!value) return "Заполните поле"
        if(!isDateFormatValid(value)) return "Дата не корректна"
        if(!isCardDateValid(value)) return "Ваша карта истекла"

        return true
    }
}
const {handleSubmit, resetForm} = useForm({
    validationSchema: validations
})
const { value: card, errorMessage: cardError } = useField('card');
const { value: cvv2, errorMessage: cvv2Error } = useField('cvv2');
const { value: date, errorMessage: dateError } = useField('date');
const onSubmit = handleSubmit((values)=>{
    resetForm()
    emit('submit', values as form)
})
</script>

<template>
    <form class="flex flex-col w-full">
        <div class="flex flex-col gap-2 items-center justify-center ">
            <div class="grid w-full items-center gap-0.5">
                <Label for="card">Card number</Label>
                <Input
                    id="card"
                    type="number"
                    placeholder="1234-56789-1011"
                    v-model="card as number"
                ></Input>
                <span>{{cardError}}</span>
            </div>
            <div class="flex items-start gap-2 w-full">
                <div class="grid w-full items-center gap-0.5">
                    <Label for="cv<span>{{cardError}}</span>v2">CVV2</Label>
                    <Input
                        id="cvv2"
                        type="number"
                        placeholder="123"
                        v-model="cvv2 as number"
                    ></Input>
                    <span>{{cvv2Error}}</span>
                </div>
                <div class="grid w-full items-center gap-0.5">
                    <Label for="date">Date</Label>
                    <Input
                        id="date"
                        placeholder="01/30"
                        v-model="date as string"
                    ></Input>
                    <span>{{dateError}}</span>
                </div>
            </div>
        </div>
        {{props.serverError}}
        <Button @click="onSubmit" class="mt-2">Подтведрить</Button>
    </form>
</template>

<style scoped>

</style>
