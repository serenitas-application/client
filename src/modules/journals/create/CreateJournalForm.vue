<script setup>
import { computed, ref } from "vue";
import JournalForm from "../common/JournalForm.vue";

const journalData = ref({
  title: "",
  content: "",
  moods: "",
});
const group = ref([]);

const isDisabled = computed(() => {
  return !title.value || !content.value;
});
</script>

<template>
  <JournalForm :journal-data="journalData" :group="group" />
</template>

<style scoped></style>
