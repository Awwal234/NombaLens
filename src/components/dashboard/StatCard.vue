<template>
  <div
    class="group relative overflow-hidden rounded-[24px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,.05)] border border-black/5"
    :style="{ backgroundColor: bgColor || '#fff' }">
    <!-- Label -->
    <p class="text-sm font-medium text-neutral-600/90 tracking-tight">
      {{ title }}
    </p>

    <!-- Value -->
    <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900">
      {{ value }}
    </h2>

    <!-- Trend Indicator / Subtext if present -->
    <div class="mt-4 flex items-center justify-between">
      <div v-if="trend !== undefined && trend !== 0" class="flex items-center gap-1 text-xs font-semibold"
        :class="trend >= 0 ? 'text-emerald-700' : 'text-rose-600'">
        <TrendingUp v-if="trend >= 0" :size="14" />
        <TrendingDown v-else :size="14" />
        {{ Math.abs(trend) }}% vs yesterday
      </div>
      <div v-else class="text-xs text-neutral-500 font-medium">
        Realtime insight
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TrendingUp,
  TrendingDown
} from "lucide-vue-next";

interface Props {
  title: string
  value: string
  trend?: number
  color?: string
  bgColor?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any
}

defineProps<Props>()
</script>
