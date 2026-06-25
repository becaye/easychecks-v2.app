<template>
  <DsfrFooter
    logo-text="République Française"
    description-text="Easy Checks — Outil d'audit d'accessibilité inspiré des Easy Checks du W3C."
    :content-description="description"
    :before-mandatory-links="beforeLinks"
    :mandatory-links="mandatoryLinks"
  />
</template>

<script setup lang="ts">
import { DsfrFooter } from '@gouvminint/vue-dsfr'

const description = "Application de réalisation d'audits d'accessibilité rapides."

const beforeLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Créer un audit', to: '/audits/new' },
]

const mandatoryLinks = [
  { label: 'Accessibilité : non conforme', to: '#' },
  { label: 'Mentions légales', to: '#' },
]
</script>
