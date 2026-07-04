<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px] flex flex-col transition-all duration-500">
    
    <!-- Empty State -->
    <div v-if="state === 'empty'" class="flex-1 flex flex-col items-center justify-center text-center animate-fade-in py-12">
      <div class="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6">
        <span class="text-3xl">✨</span>
      </div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Generate your first AI summary</h3>
      <p class="text-gray-500 max-w-sm mb-8">Choose a date range and let AI analyze your financial activity.</p>
      <button 
        @click="$emit('generate')" 
        class="bg-white border-2 border-purple-100 text-purple-700 font-medium py-2.5 px-8 rounded-xl hover:bg-purple-50 transition-all active:scale-[0.98] shadow-sm"
      >
        Generate
      </button>
    </div>

    <!-- Loading State -->
    <div v-else-if="state === 'loading'" class="flex-1 flex flex-col justify-center max-w-md mx-auto w-full animate-fade-in py-8">
      <div class="space-y-8">
        <div class="space-y-2">
          <div class="flex justify-between text-sm font-medium text-gray-600">
            <span class="animate-pulse">Analyzing transactions...</span>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-purple-400 to-indigo-500 w-1/2 rounded-full animate-progress-1"></div>
          </div>
        </div>

        <div class="space-y-2 opacity-75">
          <div class="flex justify-between text-sm font-medium text-gray-500">
            <span class="animate-pulse" style="animation-delay: 0.5s">Finding spending patterns...</span>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-purple-400 to-indigo-500 w-3/4 rounded-full animate-progress-2"></div>
          </div>
        </div>

        <div class="space-y-2 opacity-50">
          <div class="flex justify-between text-sm font-medium text-gray-400">
            <span class="animate-pulse" style="animation-delay: 1s">Generating recommendations...</span>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-purple-400 to-indigo-500 w-full rounded-full animate-progress-3"></div>
          </div>
        </div>

        <p class="text-center text-sm font-medium text-purple-600 animate-pulse mt-8">Almost done...</p>
      </div>
    </div>

    <!-- Result State -->
    <div v-else-if="state === 'result'" class="animate-fade-in flex flex-col gap-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
          <h4 class="text-indigo-100 text-sm font-medium mb-1">Today's Revenue</h4>
          <div class="text-3xl font-bold">${{ summaryData?.todayRevenue.toLocaleString() }}</div>
        </div>
        <div class="bg-white border border-gray-200 rounded-2xl p-6">
          <h4 class="text-gray-500 text-sm font-medium mb-1">Total Transactions</h4>
          <div class="text-3xl font-bold text-gray-900">{{ summaryData?.totalTransactions }}</div>
        </div>
      </div>
      
      <InsightList :insights="insights" />
      <RecommendationCard />
      <ActionButtons @generate="$emit('generate')" />
    </div>

  </div>
</template>

<script setup lang="ts">
import InsightList from './InsightList.vue'
import RecommendationCard from './RecommendationCard.vue'
import ActionButtons from './ActionButtons.vue'

defineProps<{
  state: 'empty' | 'loading' | 'result'
  summaryData?: SummaryData
  insights?: InsightItem[]
}>()

defineEmits(['generate'])

interface SummaryData {
  todayRevenue: number
  weeklyRevenue: number
  monthlyRevenue: number
  growth: number
  totalTransactions: number
}

interface InsightItem {
  merchantId: string
  type: string
  title: string
  message: string
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-progress-1 {
  animation: progress 2s ease-in-out infinite alternate;
}
.animate-progress-2 {
  animation: progress 2.5s ease-in-out infinite alternate-reverse;
}
.animate-progress-3 {
  animation: progress 3s ease-in-out infinite alternate;
}

@keyframes progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
