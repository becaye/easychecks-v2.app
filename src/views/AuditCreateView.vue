<template>
  <AppLayout>
    <DsfrBreadcrumb :links="breadcrumb" />

    <h1 class="fr-h2">Créer un audit</h1>
    <p class="fr-text--sm fr-text--grey fr-mb-4w">
      Renseignez les informations générales de votre audit. Les champs marqués d'un * sont obligatoires.
    </p>

    <DsfrAlert
      v-if="errorMessage"
      type="error"
      :title="errorMessage"
      class="fr-mb-3w"
    />

    <AuditForm @submit="onCreate" @cancel="router.push('/')" />
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { DsfrBreadcrumb, DsfrAlert } from '@gouvminint/vue-dsfr'
import AppLayout from '@/components/layout/AppLayout.vue'
import AuditForm from '@/components/audit/AuditForm.vue'
import { useAuditStore } from '@/stores/auditStore'

const router = useRouter()
const store = useAuditStore()
const errorMessage = ref('')

const breadcrumb = [
  { text: 'Accueil', to: '/' },
  { text: 'Créer un audit', to: '/audits/new' },
]

function onCreate(data: {
  title: string
  url: string
  date: string
  auditor: string
  generalComment?: string
}) {
  try {
    const id = store.createAudit(data)
    router.push({ name: 'audit-detail', params: { id } })
  } catch {
    errorMessage.value = "Une erreur est survenue lors de la création de l'audit. Veuillez réessayer."
  }
}
</script>
