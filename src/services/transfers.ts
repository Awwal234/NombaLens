import { fetchWithAuth } from './auth'

const API_URL = import.meta.env.VITE_API_URL || 'https://nombalens-backend.onrender.com/api/v1'

const parseApiPayload = <T>(payload: unknown): T => {
  if (!payload || typeof payload !== 'object') return [] as T

  const data = (payload as { data?: unknown }).data
  if (Array.isArray(data)) return data as T
  if (data && typeof data === 'object') return data as T

  return payload as T
}

const normalizeBankList = (payload: unknown): Bank[] => {
  const parsed = parseApiPayload<unknown>(payload)

  if (Array.isArray(parsed)) {
    return parsed.filter((item): item is Bank =>
      Boolean(item && typeof item === 'object'),
    ) as Bank[]
  }

  if (parsed && typeof parsed === 'object') {
    const record = parsed as Record<string, unknown>
    const candidates = [record.banks, record.data, record.result, record.items]

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate.filter((item): item is Bank =>
          Boolean(item && typeof item === 'object'),
        ) as Bank[]
      }
    }
  }

  return []
}

const normalizeLookupResult = (payload: unknown): BankLookupResult => {
  const parsed = parseApiPayload<Record<string, unknown>>(payload)
  const record = parsed && typeof parsed === 'object' ? parsed : {}
  const accountNumber = typeof record.accountNumber === 'string' ? record.accountNumber : ''
  const accountName = typeof record.accountName === 'string' ? record.accountName : ''

  return { accountNumber, accountName }
}

export interface Bank {
  name: string
  code: string
  nipCode: string | null
  logo: string
}

export interface BankLookupResult {
  accountNumber: string
  accountName: string
}

export interface TransferResponse {
  id: string
  status: 'SUCCESS' | 'PENDING_BILLING' | string
  amount: number | string
  fee: number
  merchantTxRef: string
  recipientName?: string
  bankName?: string
  accountNumber?: string
  timeCreated: string
}

export const transfersService = {
  async getBanks(): Promise<Bank[]> {
    const response = await fetchWithAuth(`${API_URL}/transfers/banks`, {
      method: 'GET',
    })
    if (!response.ok) throw new Error('Failed to fetch banks')
    const result = await response.json()
    return normalizeBankList(result)
  },

  async bankLookup(accountNumber: string, bankCode: string): Promise<BankLookupResult> {
    const response = await fetchWithAuth(`${API_URL}/transfers/bank/lookup`, {
      method: 'POST',
      body: JSON.stringify({ accountNumber, bankCode }),
    })
    const result = await response.json()
    const payload = result?.data ?? result
    const isSuccess = response.ok && result?.success !== false && result?.status !== 'error'
    if (!isSuccess) {
      throw new Error(result?.message || 'Bank account lookup failed')
    }
    return normalizeLookupResult(payload)
  },

  async bankTransferSubAccount(payload: {
    amount: number
    accountNumber: string
    accountName: string
    bankCode: string
    merchantTxRef: string
    senderName?: string
    narration?: string
  }): Promise<TransferResponse> {
    const response = await fetchWithAuth(`${API_URL}/transfers/bank/sub-account`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    const result = await response.json()
    if (!response.ok || !result.success) {
      const err = new Error(result.message || 'Sub-account bank transfer failed')
      // Attach code if present (e.g. INSUFFICIENT_BALANCE)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(err as any).code = result.code
      throw err
    }
    return result.data
  },

  async walletTransferSubAccount(payload: {
    amount: number
    receiverAccountId: string
    merchantTxRef: string
    narration?: string
  }): Promise<TransferResponse> {
    const response = await fetchWithAuth(`${API_URL}/transfers/wallet/sub-account`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    const result = await response.json()
    if (!response.ok || !result.success) {
      const err = new Error(result.message || 'Sub-account wallet transfer failed')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(err as any).code = result.code
      throw err
    }
    return result.data
  },
}
