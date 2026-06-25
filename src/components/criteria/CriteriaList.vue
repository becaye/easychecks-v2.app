<template>
  <section aria-labelledby="criteria-heading">
    <div class="criteria-header fr-mb-3w">
      <h2 id="criteria-heading" class="fr-h3">Critères à évaluer</h2>
      <p class="fr-text--sm fr-text--grey">{{ filteredCount }} critère{{ filteredCount > 1 ? 's' : '' }} affiché{{ filteredCount > 1 ? 's' : '' }}</p>
    </div>

    <CriterionFilters
      v-model:active-filter="activeFilter"
    />

    <CriterionCard
      v-for="{ criterion, result } in filteredCriteria"
      :key="criterion.id"
      :criterion="criterion"
      :result="result"
      :audit-id="auditId"
      @status-change="onStatusChange"
      @comment-change="onCommentChange"
    />

    <p v-if="filteredCriteria.length === 0" class="fr-text--grey">
      Aucun critère ne correspond au filtre sélectionné.
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuditStore } from '@/stores/auditStore'
import CriterionCard from './CriterionCard.vue'
import CriterionFilters from './CriterionFilters.vue'
import type { CriterionResult } from '@/types/audit'

const props = defineProps<{ auditId: string }>()

const store = useAuditStore()
const activeFilter = ref('all')

const filteredCriteria = computed(() => {
  const all = store.criteriaWithResults
  if (activeFilter.value === 'all') return all
  if (activeFilter.value === 'null') return all.filter((c) => c.result.status === null)
  return all.filter((c) => c.result.status === activeFilter.value)
})

const filteredCount = computed(() => filteredCriteria.value.length)

function onStatusChange(criterionId: string, status: CriterionResult['status']) {
  store.updateCriterionStatus(props.auditId, criterionId, status)
}

function onCommentChange(criterionId: string, comment: string) {
  store.updateCriterionComment(props.auditId, criterionId, comment)
}
</script>
