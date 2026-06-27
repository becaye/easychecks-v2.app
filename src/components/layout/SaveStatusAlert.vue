<template>
  <Transition name="slide-fade">
    <DsfrAlert
      v-if="store.saveStatus !== 'idle'"
      :type="alertType"
      :title="alertTitle"
      :description="alertDescription"
      class="save-status-alert"
      :closeable="false"
      small
    />
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DsfrAlert } from '@gouvminint/vue-dsfr'
import { useAuditStore } from '@/stores/auditStore'

const store = useAuditStore()

const alertType = computed(() => {
  switch (store.saveStatus) {
    case 'saving':
      return 'info'
    case 'saved':
      return 'success'
    case 'error':
      return 'error'
    default:
      return 'info'
  }
})

const alertTitle = computed(() => {
  switch (store.saveStatus) {
    case 'saving':
      return 'Enregistrement en cours...'
    case 'saved':
      return 'Modifications enregistrées'
    case 'error':
      return 'Erreur lors de l\'enregistrement'
    default:
      return ''
  }
})

const alertDescription = computed(() => {
  switch (store.saveStatus) {
    case 'saving':
      return 'Vos modifications sont en cours de sauvegarde.'
    case 'saved':
      return 'Vos modifications ont été enregistrées avec succès.'
    case 'error':
      return 'Une erreur s\'est produite lors de la sauvegarde. Vérifiez votre espace de stockage.'
    default:
      return ''
  }
})
</script>

<style scoped>
.save-status-alert {
  position: relative;
  z-index: 10;
}

/* Transition d'apparition/disparition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>

