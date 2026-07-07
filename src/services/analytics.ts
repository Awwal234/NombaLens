import { fetchWithAuth } from './auth'

const API_URL = import.meta.env.VITE_API_URL || 'https://nombalens-backend.onrender.com/api/v1'

export const analyticsService = {
  async getSummary() {
    const response = await fetchWithAuth(`${API_URL}/analytics/summary`, {
      method: 'GET',
    })
    if (!response.ok) throw new Error('Failed to fetch summary')
    return response.json()
  },

  async getHealth() {
    const response = await fetchWithAuth(`${API_URL}/analytics/health`, {
      method: 'GET',
    })
    if (!response.ok) throw new Error('Failed to fetch health')
    return response.json()
  },

  async getInsights() {
    const response = await fetchWithAuth(`${API_URL}/insights`, {
      method: 'GET',
    })
    if (!response.ok) throw new Error('Failed to fetch insights')
    return response.json()
  },
}
