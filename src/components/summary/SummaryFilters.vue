<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-end gap-4 justify-between w-full">
    <div class="flex flex-col md:flex-row gap-4 flex-1">
      <div class="flex flex-col gap-1.5 flex-1">
        <label class="text-sm font-medium text-gray-600">Date Range</label>
        <div class="relative">
          <select class="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-800 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium">
            <option>Today</option>
            <option>Last 7 Days</option>
            <option selected>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Custom Range</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-1.5 flex-1">
        <label class="text-sm font-medium text-gray-600">Summary Type</label>
        <div class="relative">
          <select class="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-800 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium">
            <option selected>Financial Health</option>
            <option>Customer Behavior</option>
            <option>Sales Performance</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-1.5 flex-1">
        <label class="text-sm font-medium text-gray-600">Language</label>
        <div class="relative">
          <select class="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-800 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium">
            <option selected>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>
    </div>

    <button 
      @click="$emit('generate')" 
      class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-8 rounded-xl shadow-md shadow-purple-500/20 transition-all active:scale-[0.98] flex items-center gap-2 whitespace-nowrap"
      :disabled="isGenerating"
    >
      <span v-if="!isGenerating">✨ Generate Summary</span>
      <span v-else>Generating...</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isGenerating?: boolean
}>()

defineEmits(['generate'])
</script>
