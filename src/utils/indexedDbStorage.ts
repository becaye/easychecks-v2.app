import type { Audit } from '@/types/audit'

const DB_NAME = 'easy-checks-db'
const STORE_NAME = 'audits'
const DB_VERSION = 1

/**
 * IndexedDB wrapper for storing audits with better reliability than localStorage.
 * Handles quota, private browsing, and provides async persistence.
 */
export class IndexedDbStorage {
  private db: IDBDatabase | null = null
  private initialized: Promise<boolean>

  constructor() {
    this.initialized = this.init()
  }

  private async init(): Promise<boolean> {
    if (!this.isSupported()) {
      return false
    }

    try {
      this.db = await this.openDatabase()
      return true
    } catch {
      return false
    }
  }

  private isSupported(): boolean {
    return (
      typeof indexedDB !== 'undefined' &&
      typeof IDBKeyRange !== 'undefined'
    )
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'))
      }

      request.onsuccess = () => {
        resolve(request.result)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }
    })
  }

  async load(): Promise<Audit[]> {
    const ready = await this.initialized
    if (!ready || !this.db) {
      return []
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db!.transaction(STORE_NAME, 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.getAll()

        request.onsuccess = () => {
          const audits = request.result
          resolve(Array.isArray(audits) ? audits : [])
        }

        request.onerror = () => {
          resolve([])
        }
      } catch {
        resolve([])
      }
    })
  }

  async save(audits: Audit[]): Promise<boolean> {
    const ready = await this.initialized
    if (!ready || !this.db) {
      return false
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db!.transaction(STORE_NAME, 'readwrite')
        const store = transaction.objectStore(STORE_NAME)

        // Clear existing data and write new data
        store.clear()
        audits.forEach((audit) => {
          store.add(audit)
        })

        transaction.oncomplete = () => {
          resolve(true)
        }

        transaction.onerror = () => {
          resolve(false)
        }
      } catch {
        resolve(false)
      }
    })
  }

  async clear(): Promise<boolean> {
    const ready = await this.initialized
    if (!ready || !this.db) {
      return false
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db!.transaction(STORE_NAME, 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.clear()

        request.onsuccess = () => {
          resolve(true)
        }

        request.onerror = () => {
          resolve(false)
        }
      } catch {
        resolve(false)
      }
    })
  }
}

export const indexedDbStorage = new IndexedDbStorage()


