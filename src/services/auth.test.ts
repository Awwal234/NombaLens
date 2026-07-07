import { beforeEach, describe, expect, it, vi } from 'vitest'
import { authService } from './auth'

describe('authService', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('refreshes access tokens using the refresh token endpoint', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            accessToken: 'new-access-token',
            refreshToken: 'new-refresh-token',
          },
        }),
      }),
    )

    const result = await authService.refresh('old-refresh-token')

    expect(result.success).toBe(true)
    expect(result.data.accessToken).toBe('new-access-token')
    expect(result.data.refreshToken).toBe('new-refresh-token')
  })
})
