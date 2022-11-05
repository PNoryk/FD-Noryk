<template>
  <div style="display: flex">
    <component :is="icon" :width="20" v-if="!isIconLast"/>
    {{ name }}
    <component :is="icon" :width="20" v-if="isIconLast"/>
  </div>
</template>


<script setup>
defineProps({
  name: String,
  isIconLast: Boolean,
  icon: Object,
})
</script>
