export interface Criterion {
  id: string
  title: string
  description: string
  help: string
  priority?: 'bloquant' | 'majeur' | 'mineur'
}
