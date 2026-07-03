import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '../services/auth'

export interface Merchant {
  id: string
  businessName: string
  phone: string
  subAccountId: string
  accountNumber: string | null
  accountName: string | null
  bankName: string | null
  createdAt: string
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
  const merchant = ref<Merchant | null>(null)

  const setTokens = (access: string, refresh: string) => {
    accessToken.value = access
    refreshToken.value = refresh
    localStorage.setItem('accessToken', access)
    localStorage.setItem('refreshToken', refresh)
  }

  const clearAuth = () => {
    accessToken.value = null
    refreshToken.value = null
    merchant.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const register = async (data: { businessName: string; phone: string; subAccountId: string; pin: string }) => {
    const response = await authService.register(data)
    if (response.success && response.data) {
      setTokens(response.data.accessToken, response.data.refreshToken)
      merchant.value = response.data.merchant
    }
    return response
  }

  const login = async (phone: string, pin: string) => {
    const response = await authService.login(phone, pin)
    if (response.success && response.data) {
      setTokens(response.data.accessToken, response.data.refreshToken)
      merchant.value = response.data.merchant
    }
    return response
  }

  const logout = async () => {
    if (refreshToken.value) {
      try {
        await authService.logout(refreshToken.value)
      } catch (e) {
        console.error('Logout API failed, clearing local state anyway', e)
      }
    }
    clearAuth()
  }

  const fetchProfile = async () => {
    if (!accessToken.value) return null
    try {
      const response = await authService.getMe(accessToken.value)
      if (response.success && response.data) {
        merchant.value = response.data
      }
      return response.data
    } catch (e) {
      console.error('Failed to fetch profile', e)
      clearAuth()
      throw e
    }
  }

  return {
    accessToken,
    refreshToken,
    merchant,
    register,
    login,
    logout,
    fetchProfile,
    clearAuth
  }
})
