import type { Audit } from '@/types/audit'
import { initialCriteria } from '@/data/initialCriteria'
import { calculateSummary } from '@/utils/calculateSummary'

export function exportAuditAsJson(audit: Audit): void {
  const summary = calculateSummary(audit)

  const criteriaDetail = audit.criteriaResults.map((result) => {
    const criterion = initialCriteria.find((c) => c.id === result.criterionId)
    return {
      id: result.criterionId,
      title: criterion?.title ?? result.criterionId,
      description: criterion?.description ?? '',
      priority: criterion?.priority ?? null,
      status: result.status,
      statusLabel: statusLabel(result.status),
      comment: result.comment ?? '',
    }
  })

  const exportData = {
    exportDate: new Date().toISOString(),
    audit: {
      id: audit.id,
      title: audit.title,
      url: audit.url,
      date: audit.date,
      auditor: audit.auditor,
      generalComment: audit.generalComment ?? '',
    },
    summary,
    criteria: criteriaDetail,
  }

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  })
  downloadBlob(blob, `audit-${sanitizeFilename(audit.title)}-${audit.date}.json`)
}

function statusLabel(status: string | null): string {
  switch (status) {
    case 'c':
      return 'Conforme'
    case 'nc':
      return 'Non conforme'
    case 'nt':
      return 'Non testé'
    case 'na':
      return 'Non applicable'
    default:
      return 'Non traité'
  }
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9À-ÿ\-_]/g, '-').toLowerCase()
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
