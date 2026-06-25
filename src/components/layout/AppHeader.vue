<template>
  <DsfrHeader
    logo-text="République Française"
    service-title="Easy Checks"
    service-description="Outil d'audit d'accessibilité"
    home-to="/"
    :quick-links="quickLinks"
  >
    <template #mainnav>
      <DsfrNavigation :nav-items="navItems" />
    </template>
  </DsfrHeader>
</template>

<script setup lang="ts">
import { DsfrHeader, DsfrNavigation } from '@gouvminint/vue-dsfr'

const quickLinks = [
  {
    label: 'Nouvel audit',
    to: '/audits/new',
    icon: 'ri-add-line',
    iconAttrs: { scale: 0.9 },
  },
]

const navItems = [
  { text: 'Accueil', to: '/' },
  { text: 'Créer un audit', to: '/audits/new' },
]
</script>
