export interface Audit {
  id: string
  title: string
  url: string
  date: string
  auditor: string
  generalComment?: string
  criteriaResults: CriterionResult[]
  createdAt: string
  updatedAt: string
}

export interface CriterionResult {
  criterionId: string
  status: 'c' | 'nc' | 'nt' | 'na' | null
  comment?: string
}

export interface AuditSummary {
  total: number
  c: number
  nc: number
  nt: number
  na: number
  okPercentage: number
}
