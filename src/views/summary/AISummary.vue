<template>
  <DashboardLayout>
    <div class="space-y-6 max-w-5xl mx-auto py-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-4xl font-extrabold tracking-tight text-neutral-900">AI Summary</h1>
        <span class="bg-[var(--au-accent-light)] text-[var(--au-accent)] text-[10px] font-bold px-2 py-0.5 rounded-md">BETA</span>
      </div>
      <p class="text-sm font-medium text-neutral-500 mb-8">Get AI-powered insights and recommendations for your business.</p>
      <div class="hidden">
        <SummaryFilters @generate="handleGenerate" :isGenerating="isGenerating" />
        <SummaryOutput :state="summaryState" :filters="filters" />
      </div>

      <AskAI />
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import SummaryFilters from "@/components/summary/SummaryFilters.vue";
import SummaryOutput from "@/components/summary/SummaryOutput.vue";
import AskAI from "@/components/summary/AskAI.vue";

const isGenerating = ref(false)
const summaryState = ref<'empty' | 'loading' | 'result'>('empty')
const filters = ref(null)

const handleGenerate = (payload: null) => {
  if (isGenerating.value) return;

  isGenerating.value = true
  summaryState.value = 'loading'
  filters.value = payload
}
</script>
