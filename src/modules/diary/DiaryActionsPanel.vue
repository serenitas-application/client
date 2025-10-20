<script setup>
import { PencilOutline, TrashOutline } from '@vicons/ionicons5';
import { modsList } from './action-mods';

const mode = defineModel('mode', { type: String });
</script>

<template>
  <div class="flex a-center g-12">
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button class="icon-button" quaternary @click="mode = modsList.edit">
          <template #icon>
            <n-icon size="24">
              <PencilOutline />
            </n-icon>
          </template>
        </n-button>
      </template>
      Click to edit
    </n-tooltip>

    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button
          class="icon-button"
          quaternary
          @click="mode = modsList.delete"
        >
          <template #icon>
            <n-icon size="24">
              <TrashOutline />
            </n-icon>
          </template>
        </n-button>
      </template>
      Click to delete
    </n-tooltip>
  </div>
</template>
