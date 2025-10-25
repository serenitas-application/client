<script setup>
import { ref, computed, watch } from 'vue';
import { InfoIcon, CheckIcon, XIcon } from 'lucide-vue-next';
import AppIcon from '../../common/AppIcon.vue';
import { appColors } from '../../../common/themes/themeConfig';

const password = defineModel({
  type: String,
});

const valid = defineModel('valid', {
  type: Boolean,
});

const rules = [
  {
    key: 'length',
    text: 'At least 8 characters',
    check: (val) => val.length >= 8,
  },
  {
    key: 'uppercase',
    text: 'Contains uppercase letter',
    check: (val) => /[A-Z]/.test(val),
  },
  {
    key: 'lowercase',
    text: 'Contains lowercase letter',
    check: (val) => /[a-z]/.test(val),
  },
  { key: 'number', text: 'Contains a number', check: (val) => /\d/.test(val) },
  {
    key: 'special',
    text: 'Contains special character',
    check: (val) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val),
  },
];

const statusColor = ref('error');

const checks = computed(() =>
  rules.map((rule) => ({ ...rule, passed: rule.check(password.value) })),
);

watch(checks, (newChecks) => {
  const allPassed = newChecks.every((r) => r.passed);
  statusColor.value = allPassed ? 'success' : 'error';
  valid.value = allPassed;
});
</script>

<template>
  <div class="password-wrapper">
    <n-tooltip trigger="hover" placement="right">
      <template #trigger>
        <div class="status-box">
          <AppIcon :icon="InfoIcon" class="info-icon" />
          <n-text :type="statusColor"> Requires </n-text>
        </div>
      </template>

      <div class="tooltip-content">
        <ul class="requirements-list">
          <li v-for="rule in checks" :key="rule.key" class="requirement-item">
            <component
              :is="rule.passed ? CheckIcon : XIcon"
              :class="
                rule.passed ? appColors.successColor : appColors.errorColor
              "
              size="16"
            />
            <span>{{ rule.text }}</span>
          </li>
        </ul>
      </div>
    </n-tooltip>
  </div>
</template>

<style scoped>
.status-box {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
}
.tooltip-content {
  max-width: 250px;
}
.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
}
.requirement-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}
</style>
