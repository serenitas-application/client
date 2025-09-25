<script setup>
import { computed, ref } from "vue";
import { CalendarNumberOutline, KeyOutline, SparklesOutline, SaveOutline } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";

const { moods } = defineModel({
  moods: [],
});

const moodsOptions = [
  { label: "Злість", value: "diary" },
  { label: "Радість", value: "private" },
  { label: "Сум", value: "work" },
];

const groupOptions = [
  { label: "Щоденник", value: "diary" },
  { label: "Особисте", value: "private" },
  { label: "Робота", value: "work" },
];

const title = ref("");
const content = ref("");

const isDisabled = computed(() => {
  return !title.value || !content.value;
});
</script>

<template>
  <n-form class="journal-form">
    <div class="flex j-between i-center title-header">
      <n-input
        v-model:value="title"
        class="clear-input title"
        placeholder="Enter title..."
        size="large"
        :bordered="false"
      ></n-input>
      <div class="flex i-center g-8">
        <n-button type="error" class="g-4">
          <template #icon>
            <n-icon>
              <SaveOutline />
            </n-icon>
          </template>
          Clear
        </n-button>
        <n-button type="primary" class="g-4" :disabled="isDisabled" @click="create">
          <template #icon>
            <n-icon>
              <SaveOutline />
            </n-icon>
          </template>
          Create
        </n-button>
      </div>
    </div>

    <div class="flex i-center">
      <div class="flex i-center g-8 input-label">
        <n-icon size="14" class="flex">
          <CalendarNumberOutline />
        </n-icon>
        <n-p>Date</n-p>
      </div>
      <n-date-picker class="clean-input input" />
    </div>

    <div class="flex i-center">
      <div class="flex i-center g-8 input-label">
        <n-icon size="14" class="flex">
          <SparklesOutline />
        </n-icon>
        <n-p>Moods</n-p>
      </div>
      <n-select
        v-model:value="moods"
        placeholder="Moods..."
        multiple
        :fallback-option="trim"
        :options="moodsOptions"
        class="input"
      />
    </div>

    <div class="flex i-center">
      <div class="flex i-center g-8 input-label">
        <n-icon size="14" class="flex">
          <SparklesOutline />
        </n-icon>
        <n-p>Groupe</n-p>
      </div>
      <n-select v-model:value="groups" :options="groupOptions" class="input"></n-select>
    </div>

    <div class="flex i-center">
      <div class="flex i-center g-8 input-label">
        <n-icon size="14" class="flex">
          <KeyOutline />
        </n-icon>
        <n-p>Secret key</n-p>
      </div>
      <n-input placeholder="Secret key..." class="input" type="password" show-password-on="click"></n-input>
    </div>

    <n-divider class="line"></n-divider>
    <n-input
      type="textarea"
      placeholder="Write here your minds..."
      v-model:value="content"
      class="textarea clear-input"
      :bordered="false"
      :resizable="false"
    ></n-input>
  </n-form>
</template>

<style scoped>
.journal-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 750px;
  margin: auto;
  height: calc(100vh - var(--header-height));
}
.title-header {
  margin-bottom: 12px;
}
.textarea {
  height: 100%;
}
.title {
  font-size: 30px;
  font-weight: 600;
}
.input-label {
  width: 100%;
  max-width: 125px;
}
.input {
  width: 100%;
  max-width: 300px;
}
.line {
  margin: 12px 0;
}
</style>
