<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Revenue Insight -->
    <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 transition-all hover:shadow-md hover:border-purple-100 group">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-xl">📈</span>
        <h4 class="font-semibold text-gray-700">Revenue</h4>
      </div>
      <div class="border-b border-gray-200/60 w-full mb-3"></div>
      <div class="text-2xl font-bold text-emerald-600 group-hover:scale-105 transition-transform origin-left">+14%</div>
    </div>

    <!-- Spending Insight -->
    <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 transition-all hover:shadow-md hover:border-purple-100 group">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-xl">💳</span>
        <h4 class="font-semibold text-gray-700">Spending</h4>
      </div>
      <div class="border-b border-gray-200/60 w-full mb-3"></div>
      <div class="text-xl font-bold text-gray-800">Normal</div>
    </div>

    <!-- Best Category Insight -->
    <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 transition-all hover:shadow-md hover:border-purple-100 group">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-xl">🛒</span>
        <h4 class="font-semibold text-gray-700">Best Category</h4>
      </div>
      <div class="border-b border-gray-200/60 w-full mb-3"></div>
      <div class="text-xl font-bold text-purple-700 truncate">Electronics</div>
    </div>

    <!-- Risk Insight -->
    <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 transition-all hover:shadow-md hover:border-purple-100 group">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-xl">⚠</span>
        <h4 class="font-semibold text-gray-700">Risk</h4>
      </div>
      <div class="border-b border-gray-200/60 w-full mb-3"></div>
      <div class="text-xl font-bold text-emerald-600">Low</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// InsightList component logic
</script>
