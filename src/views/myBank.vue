<script setup lang="ts">
const props = defineProps<{
    name: string
    image: string,
    disabled?: boolean
}>()
</script>

<template>
    <div class="bank flex gap-4 items-center" :class="{disabled: props.disabled}">
        <img class="photo" :src="props.image">
        <span class="name font-medium text-lg">{{ props.name }}</span>
    </div>
</template>

<style scoped>
.disabled {
    background: rgba(185, 185, 185, 0.71) !important;
}
.photo{
    height: 100%;
    width: 38px;
}
.bank{
    cursor: pointer;
    border-radius: 6.5px;
    background: rgba(224, 224, 224, 0.71);
    padding: 7px 18px;
    width: 100%;
    height: 52px;
}
</style>
