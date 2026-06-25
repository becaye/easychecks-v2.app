import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Audit, CriterionResult } from '@/types/audit'
import { initialCriteria } from '@/data/initialCriteria'
import { loadAuditsFromStorage, saveAuditsToStorage } from '@/utils/localStorage'
import { calculateSummary } from '@/utils/calculateSummary'
import { exportAuditAsJson } from '@/utils/exportJson'
import { exportAuditAsHtml } from '@/utils/exportHtml'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export const useAuditStore = defineStore('audits', () => {
  const audits = ref<Audit[]>([])
  const currentAudit = ref<Audit | null>(null)
  const saveStatus = ref<SaveStatus>('idle')

  // Getters
  const auditsCount = computed(() => audits.value.length)
  const hasAudits = computed(() => audits.value.length > 0)

  const auditSummary = computed(() => {
    if (!currentAudit.value) return null
    return calculateSummary(currentAudit.value)
  })

  const criteriaWithResults = computed(() => {
    if (!currentAudit.value) return []
    return initialCriteria.map((criterion) => {
      const result = currentAudit.value!.criteriaResults.find(
        (r) => r.criterionId === criterion.id,
      )
      return {
        criterion,
        result: result ?? { criterionId: criterion.id, status: null, comment: '' },
      }
    })
  })

  // Actions
  function loadAudits() {
    audits.value = loadAuditsFromStorage()
  }

  function createAudit(data: {
    title: string
    url: string
    date: string
    auditor: string
    generalComment?: string
  }): string {
    const id = uuidv4()
    const criteriaResults: CriterionResult[] = initialCriteria.map((c) => ({
      criterionId: c.id,
      status: 'nt' as const,
      comment: '',
    }))
    const now = new Date().toISOString()
    const audit: Audit = {
      id,
      ...data,
      criteriaResults,
      createdAt: now,
      updatedAt: now,
    }
    audits.value.push(audit)
    persist()
    return id
  }

  function updateAudit(id: string, data: Partial<Omit<Audit, 'id' | 'criteriaResults' | 'createdAt'>>) {
    const index = audits.value.findIndex((a) => a.id === id)
    if (index === -1) return
    audits.value[index] = {
      ...audits.value[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    if (currentAudit.value?.id === id) {
      currentAudit.value = audits.value[index]
    }
    persist()
  }

  function deleteAudit(id: string) {
    audits.value = audits.value.filter((a) => a.id !== id)
    if (currentAudit.value?.id === id) {
      currentAudit.value = null
    }
    persist()
  }

  function getAuditById(id: string): Audit | undefined {
    return audits.value.find((a) => a.id === id)
  }

  function setCurrentAudit(id: string) {
    currentAudit.value = audits.value.find((a) => a.id === id) ?? null
  }

  function updateCriterionStatus(
    auditId: string,
    criterionId: string,
    status: CriterionResult['status'],
  ) {
    const audit = audits.value.find((a) => a.id === auditId)
    if (!audit) return
    const result = audit.criteriaResults.find((r) => r.criterionId === criterionId)
    if (result) {
      result.status = status
    }
    audit.updatedAt = new Date().toISOString()
    if (currentAudit.value?.id === auditId) {
      currentAudit.value = { ...audit }
    }
    persistWithStatus()
  }

  function updateCriterionComment(auditId: string, criterionId: string, comment: string) {
    const audit = audits.value.find((a) => a.id === auditId)
    if (!audit) return
    const result = audit.criteriaResults.find((r) => r.criterionId === criterionId)
    if (result) {
      result.comment = comment
    }
    audit.updatedAt = new Date().toISOString()
    if (currentAudit.value?.id === auditId) {
      currentAudit.value = { ...audit }
    }
    persistWithStatus()
  }

  function exportAuditAsJsonAction(id: string) {
    const audit = audits.value.find((a) => a.id === id)
    if (!audit) return
    exportAuditAsJson(audit)
  }

  function exportAuditAsHtmlAction(id: string) {
    const audit = audits.value.find((a) => a.id === id)
    if (!audit) return
    exportAuditAsHtml(audit)
  }

  function persist() {
    try {
      saveAuditsToStorage(audits.value)
    } catch {
      saveStatus.value = 'error'
    }
  }

  let saveTimer: ReturnType<typeof setTimeout> | null = null
  function persistWithStatus() {
    saveStatus.value = 'saving'
    persist()
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      saveStatus.value = 'saved'
      saveTimer = setTimeout(() => {
        saveStatus.value = 'idle'
      }, 3000)
    }, 300)
  }

  return {
    audits,
    currentAudit,
    saveStatus,
    auditsCount,
    hasAudits,
    auditSummary,
    criteriaWithResults,
    loadAudits,
    createAudit,
    updateAudit,
    deleteAudit,
    getAuditById,
    setCurrentAudit,
    updateCriterionStatus,
    updateCriterionComment,
    exportAuditAsJson: exportAuditAsJsonAction,
    exportAuditAsHtml: exportAuditAsHtmlAction,
  }
})
