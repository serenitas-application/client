<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: { type: [Function, Object], required: true },
  size: { type: [Number, String], default: 20 },
  strokeWidth: { type: [Number, String], default: 1.5 },
});

const iconProps = computed(() => ({
  size: props.size,
  strokeWidth: props.strokeWidth,
}));
</script>

<template>
  <n-icon :size="props.size">
    <component :is="icon" v-bind="iconProps" />
  </n-icon>
</template>
