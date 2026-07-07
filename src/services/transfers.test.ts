import { describe, it, expect, vi, beforeEach } from 'vitest'
import { transfersService } from './transfers'

describe('transfersService', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('normalizes bank lists from nested payloads', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            banks: [{ name: 'GTBank', code: '058', nipCode: null, logo: '' }],
          },
        }),
      }),
    )

    const banks = await transfersService.getBanks()

    expect(banks).toEqual([{ name: 'GTBank', code: '058', nipCode: null, logo: '' }])
  })

  it('normalizes account lookup responses from alternate payload shapes', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'success',
          data: {
            accountNumber: '0123456789',
            accountName: 'Ada Lovelace',
          },
        }),
      }),
    )

    const lookup = await transfersService.bankLookup('0123456789', '058')

    expect(lookup).toEqual({
      accountNumber: '0123456789',
      accountName: 'Ada Lovelace',
    })
  })
})
