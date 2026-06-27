import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    reporters: ['dot'],
    globals: true,
    include: ['tests/unit/**/*.spec.ts', 'tests/unit/**/*.spec.tsx'],
  },
})

