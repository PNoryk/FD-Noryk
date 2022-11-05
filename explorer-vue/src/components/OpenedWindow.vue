<template>
  <ul v-if="files">
    <li v-for="file of files" :key="file.name">
      <Element :icon="File" :name="file.name" />
    </li>
  </ul>
</template>

<script setup>
import Element from "./Element.vue";
import File from "../assets/icons/blank-file-outline-icon.svg";
import { computed } from "vue";

let props = defineProps({data: {type: Object, required: false}})
let files = computed(() => props.data && props.data.children.filter((el) => el.type === 'FILE'))
</script>
