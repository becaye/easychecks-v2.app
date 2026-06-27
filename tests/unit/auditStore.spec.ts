import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuditStore } from '@/stores/auditStore'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('auditStore', () => {
  it('create and update an audit', () => {
    const store = useAuditStore()
    const id = store.createAudit({
      title: 'Test',
      url: 'https://example.com',
      date: '2024-01-01',
      auditor: 'Bob',
    })

    const a = store.getAuditById(id)
    expect(a).toBeTruthy()
    expect(a!.title).toBe('Test')

    store.updateAudit(id, { title: 'Updated' })
    const b = store.getAuditById(id)
    expect(b!.title).toBe('Updated')
  })
})

