<script setup>
import { modsList } from './action-mods';
import { SquarePen, Trash } from 'lucide-vue-next';
import AppIcon from '../common/AppIcon.vue';

const mode = defineModel('mode', { type: String });
</script>

<template>
  <div class="flex a-center g-12">
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button class="icon-button" quaternary @click="mode = modsList.edit">
          <template #icon>
            <AppIcon :icon="SquarePen" />
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
            <AppIcon :icon="Trash" />
          </template>
        </n-button>
      </template>
      Click to delete
    </n-tooltip>
  </div>
</template>
