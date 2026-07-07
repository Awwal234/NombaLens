import { fetchWithAuth } from './auth'

const API_URL = import.meta.env.VITE_API_URL || 'https://nombalens-backend.onrender.com/api/v1'

export interface AccountBalance {
  amount: number
  currency: string
}

export const nombaService = {
  async getSubAccountBalance(subAccountId: string): Promise<AccountBalance> {
    const response = await fetchWithAuth(`${API_URL}/nomba/accounts/${subAccountId}/balance`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch sub-account balance')
    }

    const result = await response.json()
    const payload = result?.data?.data ?? result?.data ?? result
    const amount = Number(payload?.amount ?? 0)
    const currency = payload?.currency ?? 'NGN'

    return {
      amount: Number.isFinite(amount) ? amount : 0,
      currency,
    }
  },
}
