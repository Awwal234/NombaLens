import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nombaService } from './nomba'

describe('nombaService', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('normalizes the balance payload from the nested API response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            code: '00',
            description: 'SUCCESS',
            message: 'SUCCESS',
            status: true,
            data: {
              amount: '50.0',
              currency: 'NGN',
              timeCreated: '2026-06-24T14:02:26.000Z',
            },
          },
        }),
      }),
    )

    const balance = await nombaService.getSubAccountBalance('sub-123')

    expect(balance).toEqual({ amount: 50, currency: 'NGN' })
  })
})
