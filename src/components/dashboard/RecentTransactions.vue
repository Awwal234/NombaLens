<template>
  <section class="rounded-[30px] border border-[#ECE6E2] bg-white shadow-sm">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-[#F3EFEC] p-6">
      <div>
        <h2 class="text-xl font-semibold text-neutral-900">
          Recent Transactions
        </h2>

        <p class="mt-1 text-sm text-neutral-500">
          Latest payment activity from your business
        </p>
      </div>

      <button class="rounded-xl border border-[#ECE6E2] px-4 py-2 text-sm font-medium transition hover:bg-[#FAF8F6]">
        View All
      </button>
    </div>

    <!-- List -->
    <div>
      <div v-if="!transactions || transactions.length === 0" class="flex flex-col items-center justify-center p-12 text-center">
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 mb-4">
          <svg class="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-neutral-900">No transactions yet</h3>
        <p class="mt-1 text-sm text-neutral-500">When you receive payments, they will appear here.</p>
      </div>

      <div v-else v-for="transaction in transactions" :key="transaction.id"
        class="group flex flex-col gap-4 border-b border-[#F5F2EF] p-6 transition-colors hover:bg-[#FCFBFA] md:flex-row md:items-center md:justify-between last:border-b-0 cursor-pointer">
        <!-- Left -->
        <div class="flex items-center gap-4">

          <div class="flex h-14 w-14 items-center justify-center rounded-2xl" :class="transaction.status === 'success'
            ? 'bg-green-100 text-green-600'
            : 'bg-red-100 text-red-500'">
            {{ transaction.status === "success" ? "✓" : "!" }}
          </div>

          <div>

            <h3 class="font-semibold text-neutral-900">
              {{ transaction.customer }}
            </h3>

            <p class="mt-1 text-sm text-neutral-500">
              {{ transaction.reference }}
            </p>

          </div>

        </div>

        <!-- Middle -->
        <div class="text-left md:text-center">

          <p class="font-semibold text-neutral-900">
            {{ transaction.amount }}
          </p>

          <p class="mt-1 text-sm text-neutral-500">
            {{ transaction.method }}
          </p>

        </div>

        <!-- Right -->
        <div class="text-left md:text-right flex flex-col items-start md:items-end">

          <span class="rounded-full px-3 py-1 text-[11px] uppercase tracking-wider font-bold transition-transform group-hover:scale-105" :class="transaction.status === 'success'
            ? 'bg-green-50 text-green-700 border border-green-200/50'
            : 'bg-red-50 text-red-700 border border-red-200/50'">
            {{ transaction.status }}
          </span>

          <p class="mt-2 text-sm text-neutral-500">
            {{ transaction.date }}
          </p>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Transaction {
  id: number
  customer: string
  amount: string
  method: string
  status: "success" | "failed"
  date: string
  reference: string
}

defineProps<{
  transactions: Transaction[]
}>()
</script>
