<template>
  <div class="Explorer">
    <Tree :data="data" @select="onSelect"/>
    <OpenedWindow :data="selected" />
  </div>
</template>

<script setup>
import Tree from './Tree.vue'
import OpenedWindow from './OpenedWindow.vue'
import { ref } from "vue";

defineProps({ data: Object })

let selected = ref(null)
const onSelect = (data) => {
  selected.value = data
}
</script>