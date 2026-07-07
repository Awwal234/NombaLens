import { beforeEach, describe, expect, it, vi } from 'vitest'
import { transactionsService } from './transactions'

describe('transactionsService', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns transactions and pagination from the API response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: [
            {
              id: 'tx-1',
              amount: '5000.00',
              direction: 'IN',
              eventType: 'WEBHOOK_BILL_PAYMENT',
              narration: 'Payment',
              transactionDate: '2026-07-07T12:00:00.000Z',
              customer: { name: 'Jane Doe' },
            },
          ],
          pagination: { total: 1, page: 1, limit: 20, totalPages: 1 },
        }),
      }),
    )

    const result = await transactionsService.getTransactions({ page: 1, limit: 20 })

    expect(result.transactions).toHaveLength(1)
    expect(result.pagination.total).toBe(1)
    expect(result.transactions[0].direction).toBe('IN')
  })

  it('supports nested transaction payloads', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            transactions: [
              {
                id: 'tx-2',
                amount: 3000,
                direction: 'OUT',
                eventType: 'TRANSFER',
                narration: 'Transfer to vendor',
                transactionDate: '2026-07-08T08:00:00.000Z',
                customer: { name: 'Acme Ltd' },
              },
            ],
            pagination: { total: 1, page: 1, limit: 20, totalPages: 1 },
          },
        }),
      }),
    )

    const result = await transactionsService.getTransactions({ page: 1, limit: 20 })

    expect(result.transactions).toHaveLength(1)
    expect(result.transactions[0].direction).toBe('OUT')
    expect(result.pagination.total).toBe(1)
  })
})
