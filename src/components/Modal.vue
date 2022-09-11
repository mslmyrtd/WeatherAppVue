<template>
  <div
  v-show="modalActive"
    class="absolute w-full bg-slate-600 bg-opacity-40 h-screen top-0 left-0 flex justify-center px-8"
  >
    <div 
    v-if="modalActive"
    class="p-4 bg-white self-start mt-32 max-w-screen-md">
      <slot />
      <button class="text-white mt-8 bg-sky-400 py-2 px-6" @click="$emit('close-modal')" >Close</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
    modalActive:{
        type:Boolean,
        default:false
    }
})
defineEmits(['close-modal'])
</script>

<style lang="scss" scoped></style>
