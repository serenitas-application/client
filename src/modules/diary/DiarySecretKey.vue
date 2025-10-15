<script setup>
import { LockClosedOutline, LockOpenOutline } from '@vicons/ionicons5';
import { ref } from 'vue';

const secretKey = defineModel('secret', {
  type: String,
});

const secretKeyModal = ref(false);

const clearSecret = () => {
  secretKey.value = '';
  secretKeyModal.value = false;
};
</script>

<template>
  <div>
    <n-tooltip v-if="secretKey" trigger="hover">
      <template #trigger>
        <n-button class="icon-button" quaternary @click="secretKeyModal = true">
          <template #icon>
            <n-icon size="24">
              <LockClosedOutline />
            </n-icon>
          </template>
        </n-button>
      </template>
      Click to change secret key
    </n-tooltip>

    <n-tooltip v-else trigger="hover">
      <template #trigger>
        <n-button class="icon-button" quaternary @click="secretKeyModal = true">
          <template #icon>
            <n-icon size="24">
              <LockOpenOutline />
            </n-icon>
          </template>
        </n-button>
      </template>
      Click to set secret key
    </n-tooltip>

    <n-modal v-model:show="secretKeyModal" class="secret-modal">
      <n-card title="Secret key" class="flex col g-8">
        <n-input
          v-model:value="secretKey"
          type="password"
          placeholder="Enter secret key"
          style="margin-bottom: 24px"
        />
        <div class="flex j-between a-center">
          <n-button type="error" ghost @click="clearSecret">
            Clear secret
          </n-button>
          <n-button type="primary" ghost @click="secretKeyModal = false">
            Save secret
          </n-button>
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<style scoped>
.secret-modal {
  max-width: 400px;
}
</style>
