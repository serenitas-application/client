<script setup>
import { ref, watch } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { apiClient } from '../../api';
import { useMessage } from 'naive-ui';
import DiaryForm from './DiaryForm.vue';
import { formatDateToYMD } from '../../common/utils/dates';
import DiaryCreate from './DiaryCreate.vue';
import SecretKeyCheck from '../common/secret-key/SecretKeyCheck.vue';

const qc = useQueryClient();
const message = useMessage();

const diary = ref({ title: '', content: '' });
const isDiaryPrivate = ref(false);
const diaryDateRecords = ref([]);
const selectedDate = ref(Date.now());
const form = ref({
  title: selectedDate.value,
  content: '',
  secret: '',
});

const getDiaryRecords = async () => {
  const result = await apiClient.diary.getDiaryRecords();
  if (!result.data) message.error(result.message, { duration: 5000 });
  return result.data;
};

const getDiaryByDate = async () => {
  const date = formatDateToYMD(selectedDate.value);
  const result = await apiClient.diary.getDiaryByDate(date);
  if (result.message && !result.data) {
    message.error(result.message, { duration: 5000 });
  }
  return result.data;
};

const { data: recordsData } = useQuery({
  queryKey: ['diaryRecords'],
  retry: false,
  queryFn: async () => {
    const data = await getDiaryRecords();
    diaryDateRecords.value = data.map((i) => i.createDate);
    return data;
  },
});

const { data: diaryData, isFetching } = useQuery({
  queryKey: ['diary', () => selectedDate.value],
  retry: false,
  queryFn: async () => {
    const data = await getDiaryByDate();
    diary.value = data;
    if (diary.value) {
      form.value.title = diary.value.title;
      form.value.content = diary.value.content;
    }
    return data;
  },
});

watch(diary, () => {
  const exists = recordsData?.value?.filter((r) => {
    r.createDate === formatDateToYMD(selectedDate.value);
  });
  isDiaryPrivate.value = !!exists;
});

async function onCreated() {
  await qc.invalidateQueries({ queryKey: ['diaryRecords'] });
  await qc.invalidateQueries({ queryKey: ['diary'] });
}
</script>

<template>
  <section>
    <DiaryForm
      v-model:selected-date="selectedDate"
      v-model:title="form.title"
      v-model:content="form.content"
      v-model:secret="form.secret"
      :is-loading="isFetching"
      :diary-records="diaryDateRecords"
      :diary="diaryData"
    >
      <template #content>
        <div v-if="isDiaryPrivate" class="content">
          <SecretKeyCheck
            v-model:private="isDiaryPrivate"
            v-model:encrypted="diary.content"
            v-model:decrypted="form.content"
            class="card"
          />
        </div>
      </template>

      <template #actions>
        <DiaryCreate
          v-if="!diary"
          v-model:title="form.title"
          v-model:content="form.content"
          v-model:secret="form.secret"
          @success="onCreated"
        />
      </template>
    </DiaryForm>
  </section>
</template>

<style scoped>
.card {
  max-width: 400px;
}
.content {
  display: grid;
  place-items: center;
  height: 100%;
}
</style>
