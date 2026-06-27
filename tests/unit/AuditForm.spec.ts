import { mount } from '@vue/test-utils'
import AuditForm from '@/components/audit/AuditForm.vue'
import { describe, it, expect } from 'vitest'

describe('AuditForm', () => {
  it('emits submit when programmatic submit is called', async () => {
    const wrapper = mount(AuditForm, {
      props: {
        initial: {
          title: 'Site de test',
          url: 'https://example.com',
          date: '2024-01-01',
          auditor: 'Alice',
          generalComment: 'Contexte',
        },
      },
    })

    // Access the exposed method
    const exposed: any = (wrapper.vm as any).$?.exposed || (wrapper.vm as any).$?.proxy?.$?.exposed
    // Fallback: try wrapper.vm.submit
    const submitFn = exposed?.submit || (wrapper.vm as any).submit
    expect(typeof submitFn).toBe('function')

    // Call programmatic submit
    await submitFn()

    // The component should emit the submit event
    expect(wrapper.emitted()).toHaveProperty('submit')
    const payload = wrapper.emitted('submit')![0][0]
    expect(payload.title).toBe('Site de test')
    expect(payload.url).toBe('https://example.com')
  })
})

