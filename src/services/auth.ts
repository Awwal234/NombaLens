const API_URL = import.meta.env.VITE_API_URL || 'https://nombalens-backend.onrender.com/api/v1'

export const authService = {
  async register(data: { businessName: string; phone: string; subAccountId: string; pin: string }) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to register')
    }
    return response.json()
  },

  async login(phone: string, pin: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, pin }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to login')
    }
    return response.json()
  },

  async refresh(refreshToken: string) {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to refresh token')
    }

    return response.json()
  },

  async logout(refreshToken: string) {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    return response.json()
  },

  async getMe(accessToken: string) {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to fetch profile')
    }
    return response.json()
  },
}

export const fetchWithAuth = async (input: RequestInfo | URL, init: RequestInit = {}) => {
  const headers = new Headers(init.headers || {})
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }
  if (!headers.has('Content-Type') && init.body && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  let response = await fetch(input, { ...init, headers })

  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken) {
      try {
        const refreshed = await authService.refresh(refreshToken)
        if (refreshed?.success && refreshed?.data?.accessToken) {
          localStorage.setItem('accessToken', refreshed.data.accessToken)
          if (refreshed.data.refreshToken) {
            localStorage.setItem('refreshToken', refreshed.data.refreshToken)
          }
          headers.set('Authorization', `Bearer ${refreshed.data.accessToken}`)
          response = await fetch(input, { ...init, headers })
        }
      } catch (error) {
        console.error('Failed to refresh token during authenticated request', error)
      }
    }
  }

  return response
}
