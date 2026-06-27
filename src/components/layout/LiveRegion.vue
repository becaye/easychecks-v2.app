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
  // Provide short, clear messages for screen readers for each saveStatus
  switch (store.saveStatus) {
    case 'saving':
      return "Enregistrement en cours. Vos modifications sont en train d'être sauvegardées."
    case 'saved':
      return 'Modifications enregistrées.'
    case 'error':
      return "Erreur lors de l'enregistrement. Vérifiez votre espace de stockage ou réessayez."
    default:
      return ''
  }
})
</script>
