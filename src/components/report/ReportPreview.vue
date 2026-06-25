<template>
  <div class="report-preview">
    <section aria-labelledby="report-info-heading" class="fr-mb-4w">
      <h2 id="report-info-heading" class="fr-h4">Informations générales</h2>
      <AuditMeta :audit="audit" />
    </section>

    <section aria-labelledby="report-summary-heading" class="fr-mb-4w">
      <h2 id="report-summary-heading" class="fr-h4">Synthèse</h2>
      <SummaryCards :summary="summary" />
    </section>

    <section aria-labelledby="report-criteria-heading">
      <h2 id="report-criteria-heading" class="fr-h4">Détail des critères</h2>
      <SummaryTable />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Audit, AuditSummary } from '@/types/audit'
import AuditMeta from '@/components/audit/AuditMeta.vue'
import SummaryCards from '@/components/summary/SummaryCards.vue'
import SummaryTable from '@/components/summary/SummaryTable.vue'

defineProps<{
  audit: Audit
  summary: AuditSummary
}>()
</script>
