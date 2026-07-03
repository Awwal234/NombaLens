const API_URL = import.meta.env.VITE_API_URL || 'https://nombalens-backend.onrender.com/api/v1'

const getHeaders = () => {
  const token = localStorage.getItem('accessToken')
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

export const analyticsService = {
  async getSummary() {
    const response = await fetch(`${API_URL}/analytics/summary`, {
      method: 'GET',
      headers: getHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch summary')
    return response.json()
  },

  async getHealth() {
    const response = await fetch(`${API_URL}/analytics/health`, {
      method: 'GET',
      headers: getHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch health')
    return response.json()
  },

  async getInsights() {
    const response = await fetch(`${API_URL}/insights`, {
      method: 'GET',
      headers: getHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch insights')
    return response.json()
  }
}
