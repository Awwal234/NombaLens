import { fetchWithAuth } from './auth'

const API_URL = import.meta.env.VITE_API_URL || 'https://nombalens-backend.onrender.com/api/v1'

export interface TransactionRecord {
  id: string
  nombaTransactionId?: string | null
  merchantId?: string | null
  customerId?: string | null
  amount: string
  senderName?: string | null
  narration?: string | null
  eventType?: string | null
  direction: 'IN' | 'OUT' | string
  transactionDate: string
  createdAt?: string
  customer?: { name?: string | null } | null
}

export interface TransactionsPagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface TransactionsResponse {
  transactions: TransactionRecord[]
  pagination: TransactionsPagination
}

export const transactionsService = {
  async getTransactions(
    params: {
      page?: number
      limit?: number
      direction?: 'IN' | 'OUT' | 'ALL' | null
      type?: string | null
    } = {},
  ): Promise<TransactionsResponse> {
    const searchParams = new URLSearchParams({
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 20),
    })

    if (params.direction && params.direction !== 'ALL') {
      searchParams.set('direction', params.direction)
    }

    if (params.type) {
      searchParams.set('type', params.type)
    }

    const response = await fetchWithAuth(`${API_URL}/transactions?${searchParams.toString()}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch transactions')
    }

    const result = await response.json()
    const payload = result?.data ?? result
    const list = Array.isArray(payload?.transactions)
      ? payload.transactions
      : Array.isArray(payload)
        ? payload
        : []
    const pagination = payload?.pagination ??
      result?.pagination ?? {
        total: 0,
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        totalPages: 1,
      }

    return {
      transactions: list as TransactionRecord[],
      pagination: {
        total: Number(pagination.total ?? 0),
        page: Number(pagination.page ?? params.page ?? 1),
        limit: Number(pagination.limit ?? params.limit ?? 20),
        totalPages: Number(pagination.totalPages ?? 1),
      },
    }
  },
}
