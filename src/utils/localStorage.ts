import type { Audit } from '@/types/audit'

const STORAGE_KEY = 'easy-checks-audits'

export function loadAuditsFromStorage(): Audit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Audit[]
  } catch {
    return []
  }
}

export function saveAuditsToStorage(audits: Audit[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(audits))
  } catch {
    // quota exceeded or private browsing — silent fail
  }
}
