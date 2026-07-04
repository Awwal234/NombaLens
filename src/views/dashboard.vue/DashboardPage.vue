<template>
  <DashboardLayout>
    <div v-if="isLoading" class="flex items-center justify-center h-64 text-gray-500">
      Loading dashboard...
    </div>

    <div v-else>
      <HeroCard :name="authStore.merchant?.businessName || 'Merchant'"
        :accountNumber="authStore.merchant?.accountNumber || ''" :accountName="authStore.merchant?.accountName || ''"
        :bankName="authStore.merchant?.bankName || ''" :todayRevenue="formatCurrency(summaryData.todayRevenue)"
        :health="healthData.score === 'Excellent' ? 95 : healthData.score === 'Good' ? 80 : healthData.score === 'Average' ? 50 : 20"
        :summary="insightsData[0].message" />

      <!--  -->
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mt-16 mb-16">

        <StatCard title="Today's Revenue" :value="formatCurrency(summaryData.todayRevenue)" :trend="summaryData.growth"
          color="#7A003C" :icon="Wallet" />

        <StatCard title="Transactions" :value="summaryData.totalTransactions?.toString() || '0'" :trend="0"
          color="#6D5EF7" :icon="Receipt" />

        <StatCard title="Average Sale"
          :value="formatCurrency((summaryData.todayRevenue || 0) / (summaryData.totalTransactions || 1))" :trend="0"
          color="#F59E0B" :icon="Activity" />

        <StatCard title="Business Health" :value="healthData.score || 'Unknown'" :trend="healthData.growth"
          color="#16A34A" :icon="HeartPulse" />

      </div>
      <!--  -->

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

      <!--  -->
      <div class="mt-16"></div>
      <AISummaryCard
        :summary="insightsData.length > 0 ? insightsData[0].message : 'Revenue is stable. Keep up the good work.'"
        :recommendation="insightsData.length > 1 ? insightsData[1].message : 'Check your AI Assistant for more detailed recommendations.'"
        :insights="insightsData.map(i => ({ icon: '💡', title: i.type.toUpperCase(), description: i.message })).slice(0, 3)" />
      <!--  -->
      <div class="mt-16"></div>
      <div class="hidden">
        <RecentTransactions :transactions="transactions" />
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { analyticsService } from "@/services/analytics";

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import HeroCard from "@/components/dashboard/HeroCard.vue";
import type { Transaction } from "@/components/dashboard/RecentTransactions.vue";

import {
  Wallet,
  Receipt,
  Activity,
  HeartPulse
} from "lucide-vue-next";

import StatCard from "@/components/dashboard/StatCard.vue";
import RevenueChart from "@/components/dashboard/RevenueChart.vue";
import AISummaryCard from "@/components/dashboard/AISummaryCard.vue";
import RecentTransactions from "@/components/dashboard/RecentTransactions.vue"

const authStore = useAuthStore();
const isLoading = ref(true);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const summaryData = ref<any>({});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const healthData = ref<any>({});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const insightsData = ref<any[]>([]);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value || 0);
};

onMounted(async () => {
  try {
    const [summaryRes, healthRes, insightsRes] = await Promise.all([
      analyticsService.getSummary().catch(() => ({})),
      analyticsService.getHealth().catch(() => ({})),
      analyticsService.getInsights().catch(() => ({ data: [] }))
    ]);

    summaryData.value = summaryRes || {};
    healthData.value = healthRes || {};
    insightsData.value = insightsRes || [];

    if (!authStore.merchant) {
      await authStore.fetchProfile().catch(() => { });
    }
  } catch (error) {
    console.error('Failed to load dashboard data', error);
  } finally {
    isLoading.value = false;
  }
});


//
const transactions: Transaction[] = [
  {
    id: 1,
    customer: "John Doe",
    amount: "₦25,000",
    method: "POS",
    status: "success",
    date: "2 mins ago",
    reference: "TXN-983712"
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    amount: "₦12,500",
    method: "Transfer",
    status: "success",
    date: "15 mins ago",
    reference: "TXN-983713"
  },
  {
    id: 3,
    customer: "Michael Ade",
    amount: "₦8,000",
    method: "Card",
    status: "failed",
    date: "35 mins ago",
    reference: "TXN-983714"
  }
]
</script>
