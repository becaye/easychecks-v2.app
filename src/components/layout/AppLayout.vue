<template>
  <div class="app-layout">
    <AppHeader />
    <main id="content" tabindex="-1" class="fr-container fr-py-4w">
      <slot />
    </main>
    <AppFooter />
    <LiveRegion />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import LiveRegion from './LiveRegion.vue'
</script>
