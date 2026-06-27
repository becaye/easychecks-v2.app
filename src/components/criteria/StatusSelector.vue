<template>
  <fieldset class="status-selector fr-fieldset" :aria-label="`Statut du critère ${criterionTitle}`">
    <legend class="fr-fieldset__legend sr-only">Statut</legend>
    <div class="fr-fieldset__content status-selector__buttons">
      <label
        v-for="option in options"
        :key="option.value"
        class="status-btn"
        :class="[
          `status-btn--${option.value}`,
          { 'status-btn--active': modelValue === option.value },
        ]"
      >
        <input
          type="radio"
          :name="`status-${criterionId}`"
          :value="option.value"
          :checked="modelValue === option.value"
          class="sr-only"
          @change="$emit('update:modelValue', option.value)"
        />
        <span aria-hidden="true" class="status-btn__dot"></span>
        {{ option.label }}
      </label>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import type { CriterionResult } from '@/types/audit'

defineProps<{
  criterionId: string
  criterionTitle: string
  modelValue: CriterionResult['status']
}>()

defineEmits<{
  'update:modelValue': [value: CriterionResult['status']]
}>()

const options: Array<{ value: Exclude<CriterionResult['status'], null>; label: string }> = [
  { value: 'c', label: 'Conforme' },
  { value: 'nc', label: 'Non conforme' },
  { value: 'nt', label: 'Non testé' },
  { value: 'na', label: 'Non applicable' },
]
</script>

<style scoped>
.status-selector__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border: 2px solid var(--border-default-grey);
  border-radius: 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: border-color 0.15s, background-color 0.15s;
}

.status-btn:has(input:focus-visible) {
  outline: 3px solid #0a76f6;
  outline-offset: 2px;
}

.status-btn__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.3;
}

.status-btn--active .status-btn__dot {
  opacity: 1;
}

/* Conforme */
.status-btn--c { color: #18753c; }
.status-btn--c.status-btn--active {
  background: #b8fec9;
  border-color: #18753c;
}

/* Non conforme */
.status-btn--nc { color: #c9191e; }
.status-btn--nc.status-btn--active {
  background: #ffe9e9;
  border-color: #c9191e;
}

/* Non testé */
.status-btn--nt { color: #666; }
.status-btn--nt.status-btn--active {
  background: #eee;
  border-color: #666;
}

/* Non applicable */
.status-btn--na { color: #3558a2; }
.status-btn--na.status-btn--active {
  background: #dce3f4;
  border-color: #3558a2;
}
</style>
