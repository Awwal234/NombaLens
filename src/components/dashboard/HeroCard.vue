<template>
  <div class="mb-10">
    <!-- Header Row -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-4xl font-extrabold tracking-tight text-neutral-900">
          Dashboard
        </h1>
        <p class="text-sm font-medium text-neutral-500 mt-1">
          Welcome back, {{ name }}
        </p>
      </div>

      <!-- Action Button -->
      <div>
        <button @click="$emit('send-money')"
          class="flex items-center gap-2 rounded-xl bg-[var(--au-accent)] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[var(--au-accent)]/20 hover:bg-[var(--au-accent-dark)] transition cursor-pointer">
          <PlusCircle :size="18" />
          SEND MONEY
        </button>
      </div>
    </div>

    <!-- Info Section & settlement card -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Left Welcome / Summary panel -->
      <div
        class="lg:col-span-2 flex flex-col justify-between p-6 bg-white rounded-[24px] border border-[var(--au-border)] shadow-sm">
        <div>
          <span
            class="inline-flex items-center gap-1.5 rounded-full bg-[var(--au-accent-light)] px-3.5 py-1.5 text-xs font-semibold text-[var(--au-accent)]">
            ✨ AI Insights
          </span>
          <p class="mt-4 text-base md:text-lg leading-relaxed text-neutral-700 font-medium">
            "{{ summary }}"
          </p>
        </div>

        <div class="mt-6 pt-6 border-t border-[var(--au-border)] flex items-center justify-between flex-wrap gap-4">
          <div>
            <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Today's Revenue</p>
            <p class="text-2xl font-black text-neutral-900 mt-1">{{ todayRevenue }}</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Business Health</p>
              <p class="text-xl font-bold text-neutral-900 mt-1">{{ health }}%</p>
            </div>
            <div class="h-10 w-24 overflow-hidden rounded-full bg-neutral-100 flex items-center p-1">
              <div class="h-full rounded-full bg-emerald-500 transition-all duration-700"
                :style="{ width: `${health}%` }" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Settlement Account Card (Figma Credit Card style) -->
      <div
        class="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#7A003C] via-[#c4387eb1] to-[#c10563] p-6 text-white shadow-[0_15px_40px_rgba(44,165,214,0.15)] flex flex-col justify-between min-h-[220px]">
        <div class="relative z-10 mb-4 flex items-start justify-between gap-2">
          <div>
            <p class="text-[9px] text-white/60 tracking-wider uppercase font-semibold">Available Balance</p>
            <p class="text-2xl font-black mt-1">{{ formatCurrency(balanceAmount) }}</p>
          </div>
          <span class="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
            {{ balanceCurrency }}
          </span>
        </div>
        <!-- Card background pattern decoration -->
        <div class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div class="absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

        <div class="relative z-10 flex items-center justify-between">
          <span class="text-sm font-bold tracking-wider opacity-90">Settlement Card</span>
          <!-- Bank Icon / Logo placeholder -->
          <span class="text-xl font-black italic tracking-tighter opacity-80">{{ bankName || 'BANK' }}</span>
        </div>

        <div class="relative z-10 my-6">
          <p class="text-[10px] text-white/60 tracking-wider uppercase font-semibold">Account Number</p>
          <p class="text-xl md:text-2xl font-bold tracking-widest mt-1">
            {{ formatAccountNumber(accountNumber) }}
          </p>
        </div>

        <div class="relative z-10 flex items-end justify-between">
          <div>
            <p class="text-[9px] text-white/60 tracking-wider uppercase font-semibold">Account Name</p>
            <p class="text-sm font-bold mt-0.5 truncate max-w-[180px]">{{ accountName || name }}</p>
          </div>
          <!-- Card circular accent -->
          <div class="flex -space-x-2 opacity-80">
            <div class="w-8 h-8 rounded-full bg-red-500/90" />
            <div class="w-8 h-8 rounded-full bg-amber-500/95" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusCircle } from "lucide-vue-next";

interface Props {
  name?: string;
  todayRevenue?: string;
  summary?: string;
  health?: number;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  balanceAmount?: number;
  balanceCurrency?: string;
}

withDefaults(defineProps<Props>(), {
  name: "Merchant",
  todayRevenue: "₦0",
  health: 100,
  summary: "No summaries today. Transactions are functioning properly.",
  accountNumber: "",
  accountName: "",
  bankName: "",
  balanceAmount: 0,
  balanceCurrency: "NGN"
});

defineEmits(['send-money']);

const formatCurrency = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "₦0";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);
};

const formatAccountNumber = (num?: string) => {
  if (!num) return "**** ****";
  // Format as groups of 4 digits if possible
  const cleaned = num.replace(/\s+/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return cleaned;
};
</script>
