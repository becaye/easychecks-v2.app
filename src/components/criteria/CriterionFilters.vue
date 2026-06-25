<template>
  <div class="criterion-filters fr-mb-3w" role="group" aria-label="Filtrer les critères">
    <p class="fr-text--bold fr-mb-1w">Filtrer par statut :</p>
    <div class="criterion-filters__buttons">
      <button
        v-for="option in filterOptions"
        :key="option.value"
        type="button"
        class="fr-btn fr-btn--sm"
        :class="activeFilter === option.value ? '' : 'fr-btn--secondary'"
        :aria-pressed="activeFilter === option.value"
        @click="$emit('update:activeFilter', option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeFilter: string
}>()

defineEmits<{
  'update:activeFilter': [value: string]
}>()

const filterOptions = [
  { value: 'all', label: 'Tous' },
  { value: 'c', label: 'Conformes' },
  { value: 'nc', label: 'Non conformes' },
  { value: 'nt', label: 'Non testés' },
  { value: 'na', label: 'Non applicables' },
]
</script>

<style scoped>
.criterion-filters__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
