<script setup>
import { useMutation } from '@tanstack/vue-query';
import { apiClient } from '../../api';
import { useMessage } from 'naive-ui';
import { encryptToLatin } from '../../crypto';
import { computed } from 'vue';
import AppIcon from '../common/AppIcon.vue';
import { SaveIcon } from 'lucide-vue-next';

const message = useMessage();

const title = defineModel('title', { type: String });
const content = defineModel('content', { type: String });
const secret = defineModel('secret', { type: String });

const emit = defineEmits({
  onSuccess: null,
});

const isDisabled = computed(() => !title.value || !content.value);

const prepareContentForSave = async () => {
  if (!secret.value) return content.value;
  return await encryptToLatin(content.value, secret.value);
};

const { mutate: createDiaryNote, isPending: isLoading } = useMutation({
  mutationFn: async () => {
    const res = await apiClient.diary.create({
      title: new Date(title.value),
      content: await prepareContentForSave(),
      isPrivate: !!secret.value,
    });

    if (!res.data) throw new Error(res.message);
    message.success('Entity created successfully', { duration: 5000 });
    emit('onSuccess');
    return res.data;
  },
  onError: (err) => {
    message.error(err.message, { duration: 5000 });
  },
});
</script>

<template>
  <n-button
    type="primary"
    class="g-4"
    :disabled="isDisabled || isLoading"
    @click="createDiaryNote"
  >
    <template #icon>
      <AppIcon :icon="SaveIcon" />
    </template>
    Save
  </n-button>
</template>
