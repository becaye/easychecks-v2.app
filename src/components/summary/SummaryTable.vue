<template>
  <div>
    <CriterionFilters v-model:active-filter="activeFilter" />

    <div class="fr-table fr-table--bordered">
      <table aria-label="Tableau de synthèse des critères">
        <caption class="sr-only">Résultats par critère</caption>
        <thead>
          <tr>
            <th scope="col">Critère</th>
            <th scope="col">Priorité</th>
            <th scope="col">Statut</th>
            <th scope="col">Commentaire</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ criterion, result } in filteredRows" :key="criterion.id">
            <td>{{ criterion.title }}</td>
            <td>
              <DsfrBadge
                v-if="criterion.priority"
                :label="priorityLabel(criterion.priority)"
                :type="priorityType(criterion.priority)"
                small
              />
              <span v-else class="fr-text--grey">—</span>
            </td>
            <td>
              <span :class="statusClass(result.status)" class="status-pill">
                {{ statusLabel(result.status) }}
              </span>
            </td>
            <td>{{ result.comment || '—' }}</td>
          </tr>
          <tr v-if="filteredRows.length === 0">
            <td colspan="4" class="fr-text--grey">Aucun critère ne correspond au filtre.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { DsfrBadge } from '@gouvminint/vue-dsfr'
import CriterionFilters from '@/components/criteria/CriterionFilters.vue'
import { useAuditStore } from '@/stores/auditStore'
import type { CriterionResult } from '@/types/audit'

const store = useAuditStore()
const activeFilter = ref('all')

const filteredRows = computed(() => {
  const all = store.criteriaWithResults
  if (activeFilter.value === 'all') return all
  if (activeFilter.value === 'null') return all.filter((c) => c.result.status === null)
  return all.filter((c) => c.result.status === activeFilter.value)
})

function statusLabel(status: CriterionResult['status']): string {
  switch (status) {
    case 'c': return 'Conforme'
    case 'nc': return 'Non conforme'
    case 'nt': return 'Non testé'
    case 'na': return 'Non applicable'
    default: return 'Non traité'
  }
}

function statusClass(status: CriterionResult['status']): string {
  switch (status) {
    case 'c': return 'status-pill--ok'
    case 'nc': return 'status-pill--nc'
    case 'nt': return 'status-pill--nt'
    case 'na': return 'status-pill--na'
    default: return 'status-pill--none'
  }
}

function priorityLabel(priority: string): string {
  switch (priority) {
    case 'bloquant': return 'Bloquant'
    case 'majeur': return 'Majeur'
    case 'mineur': return 'Mineur'
    default: return priority
  }
}

function priorityType(priority: string): 'error' | 'warning' | 'info' {
  switch (priority) {
    case 'bloquant': return 'error'
    case 'majeur': return 'warning'
    default: return 'info'
  }
}
</script>

<style scoped>
.status-pill {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
}
.status-pill--ok { background: #b8fec9; color: #18753c; }
.status-pill--nc { background: #ffe9e9; color: #c9191e; }
.status-pill--nt { background: #eee; color: #444; }
.status-pill--na { background: #dce3f4; color: #3558a2; }
.status-pill--none { background: #f0f0f0; color: #666; }
</style>
