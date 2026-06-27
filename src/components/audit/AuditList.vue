<template>
  <section aria-labelledby="audits-list-heading">
    <h2 id="audits-list-heading" class="fr-h3">Audits existants</h2>

    <p v-if="!store.hasAudits" class="fr-text--lg fr-text--grey">
      Aucun audit pour l'instant. Créez votre premier audit.
    </p>

    <ul v-else class="fr-grid-row fr-grid-row--gutters fr-pl-0" style="list-style: none;">
      <li
        v-for="audit in store.audits"
        :key="audit.id"
        class="fr-col-12 fr-col-md-6 fr-col-lg-4"
      >
        <DsfrCard
          :title="audit.title"
          :description="cardDescription(audit)"
          :link="`/audits/${audit.id}`"
          size="sm"
          class="audit-card"
        >
          <template #footer>
            <div class="fr-mt-2w">
              <DsfrButton
                label="Supprimer"
                icon="ri-delete-bin-line"
                secondary
                size="sm"
                :aria-label="`Supprimer l'audit ${audit.title}`"
                @click="confirmDelete(audit)"
              />
            </div>
          </template>
        </DsfrCard>
      </li>
    </ul>

    <DsfrModal
      v-if="auditToDelete"
      :opened="!!auditToDelete"
      title="Supprimer l'audit"
      :actions="modalActions"
      @close="auditToDelete = null"
    >
      <p>
        Êtes-vous sûr·e de vouloir supprimer l'audit
        <strong>{{ auditToDelete.title }}</strong> ?
        Cette action est irréversible.
      </p>
    </DsfrModal>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DsfrButton, DsfrCard, DsfrModal } from '@gouvminint/vue-dsfr'
import { useAuditStore } from '@/stores/auditStore'
import type { Audit } from '@/types/audit'

const store = useAuditStore()

const auditToDelete = ref<Audit | null>(null)

function cardDescription(audit: Audit): string {
  const date = new Date(audit.date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  const total = audit.criteriaResults.length
  const evaluated = audit.criteriaResults.filter((r) => r.status && r.status !== 'nt' && r.status !== 'na').length
  return `Audit du ${date} — ${evaluated}/${total} critères évalués — ${audit.auditor}`
}

function confirmDelete(audit: Audit) {
  auditToDelete.value = audit
}

const modalActions = [
  {
    label: 'Supprimer',
    onClick: () => {
      if (auditToDelete.value) {
        store.deleteAudit(auditToDelete.value.id)
        auditToDelete.value = null
      }
    },
  },
  {
    label: 'Annuler',
    secondary: true,
    onClick: () => {
      auditToDelete.value = null
    },
  },
]
</script>
