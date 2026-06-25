<template>
  <div class="summary-cards fr-grid-row fr-grid-row--gutters fr-mb-4w" role="list" aria-label="Indicateurs de synthèse">
    <div class="fr-col-6 fr-col-md-4 fr-col-lg-2" role="listitem">
      <div class="summary-card">
        <p class="summary-card__number">{{ summary.total }}</p>
        <p class="summary-card__label">Critères au total</p>
      </div>
    </div>
    <div class="fr-col-6 fr-col-md-4 fr-col-lg-2" role="listitem">
      <div class="summary-card summary-card--ok">
        <p class="summary-card__number">{{ summary.c }}</p>
        <p class="summary-card__label">Conformes</p>
      </div>
    </div>
    <div class="fr-col-6 fr-col-md-4 fr-col-lg-2" role="listitem">
      <div class="summary-card summary-card--nc">
        <p class="summary-card__number">{{ summary.nc }}</p>
        <p class="summary-card__label">Non conformes</p>
      </div>
    </div>
    <div class="fr-col-6 fr-col-md-4 fr-col-lg-2" role="listitem">
      <div class="summary-card summary-card--nt">
        <p class="summary-card__number">{{ summary.nt }}</p>
        <p class="summary-card__label">Non testés</p>
      </div>
    </div>
    <div class="fr-col-6 fr-col-md-4 fr-col-lg-2" role="listitem">
      <div class="summary-card summary-card--na">
        <p class="summary-card__number">{{ summary.na }}</p>
        <p class="summary-card__label">Non applicables</p>
      </div>
    </div>
    <div class="fr-col-6 fr-col-md-4 fr-col-lg-2" role="listitem">
      <div class="summary-card summary-card--rate">
        <p class="summary-card__number">{{ summary.okPercentage }}&nbsp;%</p>
        <p class="summary-card__label">Taux de conformité</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AuditSummary } from '@/types/audit'
defineProps<{ summary: AuditSummary }>()
</script>

<style scoped>
.summary-card {
  border: 2px solid var(--border-default-grey);
  border-radius: 4px;
  padding: 1rem;
  text-align: center;
  height: 100%;
}

.summary-card__number {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  line-height: 1;
}

.summary-card__label {
  font-size: 0.8125rem;
  color: var(--text-mention-grey);
  margin: 0;
}

.summary-card--ok { border-color: #18753c; color: #18753c; }
.summary-card--nc { border-color: #c9191e; color: #c9191e; }
.summary-card--nt { border-color: #666; color: #666; }
.summary-card--na { border-color: #3558a2; color: #3558a2; }
.summary-card--rate { border-color: #000091; color: #000091; }
</style>
