<template>
  <DashboardLayout>
    <div v-if="isLoading" class="flex items-center justify-center h-64 text-gray-500 font-medium">
      <div class="flex flex-col items-center gap-2">
        <svg class="animate-spin h-8 w-8 text-(--au-accent)" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <span>Loading dashboard...</span>
      </div>
    </div>

    <div v-else class="space-y-10">
      <!-- Header and Settlement Account Info -->
      <HeroCard :name="authStore.merchant?.businessName || 'Merchant'"
        :accountNumber="authStore.merchant?.accountNumber || ''" :accountName="authStore.merchant?.accountName || ''"
        :bankName="authStore.merchant?.bankName || ''" :todayRevenue="formatCurrency(summaryData.todayRevenue)"
        :health="healthData.score === 'Excellent' ? 95 : healthData.score === 'Good' ? 80 : healthData.score === 'Average' ? 50 : 20"
        :summary="insightsData.length > 0 ? insightsData[0].message : 'Your business performance is stable today.'"
        :balanceAmount="balanceAmount" :balanceCurrency="balanceCurrency" @send-money="isSendMoneyOpen = true" />

      <!-- Stat Cards Grid (3 pastel cards matching Figma layout style, plus a 4th style-matched pastel card) -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Revenue" :value="formatCurrency(summaryData.todayRevenue)" :trend="summaryData.growth"
          bgColor="#E1F2EC" color="#10B981" :icon="Wallet" />

        <StatCard title="Transactions" :value="summaryData.totalTransactions?.toString() || '0'" :trend="0"
          bgColor="#F7EAD4" color="#F59E0B" :icon="Receipt" />

        <StatCard title="Average Sale"
          :value="formatCurrency((summaryData.todayRevenue || 0) / (summaryData.totalTransactions || 1))" :trend="0"
          bgColor="#ECE8F9" color="#8B5CF6" :icon="Activity" />

        <StatCard title="Business Health" :value="healthData.score || 'Unknown'" :trend="healthData.growth"
          bgColor="#E2EDF9" color="#3B82F6" :icon="HeartPulse" />
      </div>

      <div class="mt-2">
        <RecentTransactions :transactions="transactions" :pagination="pagination" :currentPage="currentPage"
          :selectedFilter="selectedFilter" :loading="transactionsLoading" @filter-change="handleFilterChange"
          @page-change="handlePageChange" />
      </div>

      <!-- Chart and AI summary sections -->
      <div class="grid gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <RevenueChart :total="formatCurrency(summaryData.weeklyRevenue)" :growth="summaryData.growth" :data="[
            summaryData.todayRevenue || 0,
            summaryData.weeklyRevenue ? summaryData.weeklyRevenue * 0.1 : 0,
            summaryData.weeklyRevenue ? summaryData.weeklyRevenue * 0.2 : 0,
            summaryData.weeklyRevenue ? summaryData.weeklyRevenue * 0.15 : 0,
            summaryData.weeklyRevenue ? summaryData.weeklyRevenue * 0.25 : 0,
            summaryData.weeklyRevenue ? summaryData.weeklyRevenue * 0.1 : 0,
            summaryData.weeklyRevenue ? summaryData.weeklyRevenue * 0.2 : 0
          ]" :categories="[
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
          ]" />
        </div>

        <div>
          <AISummaryCard
            :summary="insightsData.length > 0 ? insightsData[0].message : 'Revenue is stable. Keep up the good work.'"
            :recommendation="insightsData.length > 1 ? insightsData[1].message : 'Check your AI Assistant for more detailed recommendations.'"
            :insights="insightsData.map(i => ({ icon: '💡', title: i.type.toUpperCase(), description: i.message })).slice(0, 3)" />
        </div>
      </div>
    </div>

    <!-- Send Money Drawer -->
    <SendMoneyDrawer :isOpen="isSendMoneyOpen" @close="isSendMoneyOpen = false" @success="refreshDashboardData" />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { analyticsService } from "@/services/analytics";
import { nombaService } from "@/services/nomba";
import { transactionsService, type TransactionRecord, type TransactionsPagination } from "@/services/transactions";

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import HeroCard from "@/components/dashboard/HeroCard.vue";

import {
  Wallet,
  Receipt,
  Activity,
  HeartPulse
} from "lucide-vue-next";

import StatCard from "@/components/dashboard/StatCard.vue";
import RevenueChart from "@/components/dashboard/RevenueChart.vue";
import AISummaryCard from "@/components/dashboard/AISummaryCard.vue";
import SendMoneyDrawer from "@/components/dashboard/SendMoneyDrawer.vue";
import RecentTransactions from "@/components/dashboard/RecentTransactions.vue";

const authStore = useAuthStore();
const isLoading = ref(true);
const isSendMoneyOpen = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const summaryData = ref<any>({});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const healthData = ref<any>({});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const insightsData = ref<any[]>([]);
const balanceAmount = ref(0);
const balanceCurrency = ref("NGN");
const transactions = ref<TransactionRecord[]>([]);
const pagination = ref<TransactionsPagination>({ total: 0, page: 1, limit: 20, totalPages: 1 });
const currentPage = ref(1);
const selectedFilter = ref<'ALL' | 'IN' | 'OUT'>('ALL');
const transactionsLoading = ref(false);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value || 0);
};

const loadTransactions = async (page = 1, direction: 'ALL' | 'IN' | 'OUT' = selectedFilter.value) => {
  transactionsLoading.value = true;
  try {
    const response = await transactionsService.getTransactions({ page, limit: 10, direction });
    transactions.value = response.transactions;
    pagination.value = response.pagination;
    currentPage.value = response.pagination.page;
  } catch (error) {
    console.error('Failed to load transactions', error);
    transactions.value = [];
  } finally {
    transactionsLoading.value = false;
  }
};

const handleFilterChange = (filter: 'ALL' | 'IN' | 'OUT') => {
  selectedFilter.value = filter;
  currentPage.value = 1;
  void loadTransactions(1, filter);
};

const handlePageChange = (page: number) => {
  void loadTransactions(page, selectedFilter.value);
};

const refreshDashboardData = async () => {
  isLoading.value = true;

  try {
    if (!authStore.merchant) {
      await authStore.fetchProfile().catch(() => { });
    }

    const [summaryRes, healthRes, insightsRes, balanceRes] = await Promise.all([
      analyticsService.getSummary().catch(() => ({})),
      analyticsService.getHealth().catch(() => ({})),
      analyticsService.getInsights().catch(() => ({ data: [] })),
      authStore.merchant?.subAccountId
        ? nombaService.getSubAccountBalance(authStore.merchant.subAccountId).catch(() => ({ amount: 0, currency: 'NGN' }))
        : Promise.resolve({ amount: 0, currency: 'NGN' })
    ]);

    summaryData.value = summaryRes || {};
    healthData.value = healthRes || {};
    insightsData.value = insightsRes || [];
    balanceAmount.value = balanceRes?.amount || 0;
    balanceCurrency.value = balanceRes?.currency || 'NGN';
    await loadTransactions(1, selectedFilter.value);
  } catch (error) {
    console.error('Failed to load dashboard data', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  void refreshDashboardData();
});

watch(() => authStore.merchant?.subAccountId, (newSubAccountId) => {
  if (newSubAccountId) {
    void refreshDashboardData();
  }
});
</script>
