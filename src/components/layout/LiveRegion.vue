<template>
  <div
    role="status"
    aria-live="polite"
    aria-atomic="true"
    class="sr-only"
  >{{ message }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuditStore } from '@/stores/auditStore'

const store = useAuditStore()

const message = computed(() => {
  if (store.saveStatus === 'saved') return 'Modifications enregistrées.'
  if (store.saveStatus === 'error') return 'Erreur lors de l\'enregistrement.'
  return ''
})
</script>
