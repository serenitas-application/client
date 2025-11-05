<script setup>
import { useMessage } from 'naive-ui';
import { computed } from 'vue';
import { modsList } from './action-mods';
import { apiClient } from '../../api';
import { formatDateToYMD } from '../../common/utils/dates';
import { useMutation } from '@tanstack/vue-query';

const message = useMessage();

const { id = 0, title = '🤔' } = defineProps({
  id: Number,
  title: String,
});

const mode = defineModel('mode', { type: String });
const selectedDate = defineModel('selectedDate', { type: Number });

const emit = defineEmits({
  onSuccess: null,
});

const isVisible = computed(() => mode.value === modsList.delete);
const deleteTitle = computed(
  () => `Delete diary from ${formatDateToYMD(title)} 🤔`,
);

const { mutate: deleteDiaryNote, isPending: isLoading } = useMutation({
  mutationFn: async () => {
    const res = await apiClient.diary.delete(id);
    if (!res.data) throw new Error(res.message);

    const today = Date.now();
    selectedDate.value = today;
    mode.value = modsList.create;
    message.success('Entity deleted successfully', { duration: 5000 });
    emit('onSuccess');
    return res.data;
  },
  onError: (err) => {
    message.error(err.message, { duration: 5000 });
  },
});
</script>

<template>
  <n-modal v-model:show="isVisible" class="delete-modal">
    <n-card :title="deleteTitle" class="flex col g-8">
      <n-p class="text">
        Warning: deletion is
        <n-text strong type="error"> permanent </n-text> and
        <n-text strong type="error"> irreversible </n-text>.
      </n-p>

      <div class="flex j-between a-center">
        <n-button type="primary" ghost @click="mode = modsList.view">
          Cancel
        </n-button>
        <n-button type="error" :disabled="isLoading" @click="deleteDiaryNote">
          Delete
        </n-button>
      </div>
    </n-card>
  </n-modal>
</template>

<style scoped>
.delete-modal {
  max-width: 450px;
}
.text {
  margin-bottom: 24px;
}
</style>
