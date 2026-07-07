<template>
  <section class="rounded-[30px] border border-[#ECE6E2] bg-white shadow-sm">
    <div class="flex flex-col gap-4 border-b border-[#F3EFEC] p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-xl font-semibold text-neutral-900">Transaction History</h2>
        <p class="mt-1 text-sm text-neutral-500">Incoming revenue and outgoing transfers from your merchant account</p>
      </div>

      <div class="flex items-center gap-2 rounded-full border border-[#ECE6E2] bg-[#FAF8F6] p-1">
        <button v-for="option in filters" :key="option.value"
          class="rounded-full px-3 py-1.5 text-sm font-semibold transition"
          :class="selectedFilter === option.value ? 'bg-(--au-accent) text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'"
          @click="emit('filter-change', option.value)">
          {{ option.label }}
        </button>
      </div>
    </div>

    <div>
      <div v-if="loading" class="flex items-center justify-center p-12 text-sm text-neutral-500">Loading transactions...
      </div>

      <div v-else-if="!transactions || transactions.length === 0"
        class="flex flex-col items-center justify-center p-12 text-center">
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 mb-4">
          <svg class="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-neutral-900">No transactions yet</h3>
        <p class="mt-1 text-sm text-neutral-500">When activity appears, it will show up here.</p>
      </div>

      <div v-else>
        <div v-for="transaction in transactions" :key="transaction.id"
          class="group flex flex-col gap-4 border-b border-[#F5F2EF] p-6 transition-colors hover:bg-[#FCFBFA] md:flex-row md:items-center md:justify-between last:border-b-0">
          <div class="flex w-full items-center gap-4 md:w-[400px]">
            <div class="flex h-10 w-10 md:h-14 md:w-[56px] items-center justify-center rounded-2xl"
              :class="transaction.direction === 'IN' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'">
              {{ transaction.direction === 'IN' ? '↗' : '↘' }}
            </div>

            <div class="w-[calc(100%-56px)]">
              <h3 class="font-semibold text-neutral-900">
                {{ transaction.customer?.name || transaction.senderName || transaction.narration || 'Transaction' }}
              </h3>
              <p class="mt-1 text-sm text-neutral-500">
                {{ transaction.narration || transaction.eventType || 'Nomba transaction' }}
              </p>
            </div>
          </div>

          <div class="text-left md:text-center">
            <p class="font-semibold" :class="transaction.direction === 'IN' ? 'text-emerald-600' : 'text-rose-600'">
              {{ transaction.direction === 'IN' ? '+' : '-' }}{{ formatAmount(transaction.amount) }}
            </p>
            <p class="mt-1 text-sm text-neutral-500">{{ transaction.eventType || 'Transfer' }}</p>
          </div>

          <div class="text-left md:text-right flex flex-col items-start md:items-end">
            <span class="rounded-full px-3 py-1 text-[11px] uppercase tracking-wider font-bold"
              :class="transaction.direction === 'IN' ? 'bg-green-50 text-green-700 border border-green-200/50' : 'bg-red-50 text-red-700 border border-red-200/50'">
              {{ transaction.direction === 'IN' ? 'Incoming' : 'Outgoing' }}
            </span>
            <p class="mt-2 text-sm text-neutral-500">{{ formatDate(transaction.transactionDate) }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between border-t border-[#F3EFEC] px-6 py-4 text-sm text-neutral-500">
          <span>Showing {{ transactions.length }} of {{ pagination.total }}</span>
          <div class="flex items-center gap-2">
            <button
              class="rounded-lg border border-[#ECE6E2] px-3 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="currentPage === 1" @click="emit('page-change', currentPage - 1)">
              Previous
            </button>
            <button
              class="rounded-lg border border-[#ECE6E2] px-3 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="currentPage >= pagination.totalPages" @click="emit('page-change', currentPage + 1)">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TransactionRecord, TransactionsPagination } from '@/services/transactions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  transactions: TransactionRecord[]
  pagination: TransactionsPagination
  currentPage: number
  selectedFilter: 'ALL' | 'IN' | 'OUT'
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'filter-change', value: 'ALL' | 'IN' | 'OUT'): void
  (e: 'page-change', value: number): void
}>()

const filters = [
  { label: 'All', value: 'ALL' as const },
  { label: 'In', value: 'IN' as const },
  { label: 'Out', value: 'OUT' as const },
]

const formatAmount = (amount: string) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(Number(amount || 0))
}

const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
