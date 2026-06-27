<template>
  <AppLayout>
    <DsfrBreadcrumb :links="breadcrumb" />

    <div v-if="!audit">
      <DsfrAlert type="error" title="Audit introuvable" description="Cet audit n'existe pas ou a été supprimé." />
      <RouterLink to="/" class="fr-btn fr-mt-3w">Retour à l'accueil</RouterLink>
    </div>

    <template v-else>
      <div class="audit-detail-header fr-mb-4w">
        <h1 class="fr-h2">{{ audit.title }}</h1>

        <div class="fr-btns-group fr-btns-group--inline fr-mb-2w">
          <RouterLink
            :to="`/audits/${audit.id}/summary`"
            class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-bar-chart-line"
          >
            Synthèse
          </RouterLink>
          <RouterLink
            :to="`/audits/${audit.id}/report`"
            class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-file-text-line"
          >
            Rapport
          </RouterLink>
         </div>

        <SaveStatusAlert />
       </div>

      <AuditMeta :audit="audit" />

      <CriteriaList :audit-id="audit.id" />
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { DsfrBreadcrumb, DsfrAlert } from '@gouvminint/vue-dsfr'
import AppLayout from '@/components/layout/AppLayout.vue'
import SaveStatusAlert from '@/components/layout/SaveStatusAlert.vue'
import AuditMeta from '@/components/audit/AuditMeta.vue'
import CriteriaList from '@/components/criteria/CriteriaList.vue'
import { useAuditStore } from '@/stores/auditStore'

const route = useRoute()
const store = useAuditStore()

onMounted(() => {
  store.loadAudits()
  store.setCurrentAudit(route.params.id as string)
})

const audit = computed(() => store.currentAudit)

const breadcrumb = computed(() => [
  { text: 'Accueil', to: '/' },
  { text: audit.value?.title ?? 'Audit', to: `/audits/${route.params.id}` },
])
</script>
