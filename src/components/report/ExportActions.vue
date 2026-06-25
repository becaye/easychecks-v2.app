<template>
  <div class="export-actions fr-mt-4w">
    <h2 class="fr-h4">Exporter le rapport</h2>
    <div class="fr-btns-group fr-btns-group--inline">
      <DsfrButton
        label="Exporter en JSON"
        icon="ri-download-2-line"
        secondary
        @click="$emit('export-json')"
      />
      <DsfrButton
        label="Exporter en HTML imprimable"
        icon="ri-printer-line"
        secondary
        @click="$emit('export-html')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DsfrButton } from '@gouvminint/vue-dsfr'

defineEmits<{
  'export-json': []
  'export-html': []
}>()
</script>
