<template>
  <div class="TreeNode" @select="onSelect">
    <div class="Folder" :class="{ 'Folder--with-toggle': hasFolders }" @click="onClick">
      <ArrowToggle class="Folder__toggle-icon" :class=" {'Folder__toggle-icon--is-opened' : isOpened} "
                   v-if="hasFolders"/>
      <Element :icon="currentIcon" :name="data.name"/>
    </div>
    <TreeChild v-if="isOpened" v-for="(folder, index) of folders" :data="folder" :key="`${data.name}__child__${index}`"
               @select="onSelect" />
  </div>
</template>

<script setup>
import ArrowToggle from "../assets/icons/arrow-toggler.svg"
import Folder from "../assets/icons/folder-desktop-icon.svg"
import FolderWithFiles from "../assets/icons/folder-directory-files-icon.svg"

import TreeChild from './Tree.vue'
import Element from "./Element.vue";
import { ref } from "vue";

let props = defineProps({ data: Object })
let isOpened = ref(false)

let hasFiles = !!props.data.children.filter(el => el.type === "FILE").length
let currentIcon = hasFiles ? FolderWithFiles : Folder

let folders = props.data.children.filter(el => el.type === "FOLDER")
let hasFolders = !!folders.length;

let emit = defineEmits([ 'select' ])

let onSelect = (value) => emit('select', value)

let onClick = () => {
  let wasOpened = isOpened.value;
  if (hasFiles) {
    isOpened.value = !isOpened.value;
  }
  emit('select', hasFolders && wasOpened ? null : props.data);
}

</script>
