<script setup>
import { computed, ref } from 'vue';
import PageForm from '../common/PageForm.vue';

const pageData = ref({
  title: '',
  content: '',
  moods: '',
});
const group = ref([]);

const isDisabled = computed(() => {
  return !pageData.value.title || !pageData.value.content;
});

console.log(isDisabled);
</script>

<template>
  <PageForm :journal-data="journalData" :group="group" />
</template>

<style scoped></style>
