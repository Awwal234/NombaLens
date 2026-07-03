<template>
  <div
    class="group relative overflow-hidden rounded-[28px] border border-[#ECE6E2] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,.08)]">
    <!-- Decorative Gradient -->
    <div class="absolute right-0 top-0 h-24 w-24 rounded-full opacity-10 blur-2xl" :style="{ background: color }" />

    <!-- Header -->
    <div class="flex items-center justify-between">

      <div class="flex h-12 w-12 items-center justify-center rounded-2xl" :style="{
        background: `${color}15`,
        color
      }">
        <component :is="icon" :size="22" />
      </div>

      <div class="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
        :class="trend >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'">
        <TrendingUp v-if="trend >= 0" :size="14" />

        <TrendingDown v-else :size="14" />

        {{ Math.abs(trend) }}%
      </div>

    </div>

    <!-- Title -->

    <p class="mt-6 text-sm text-neutral-500">
      {{ title }}
    </p>

    <!-- Value -->

    <h2 class="mt-2 text-4xl font-bold tracking-tight text-neutral-900">
      {{ value }}
    </h2>

    <!-- Footer -->

    <div class="mt-6 flex items-center justify-between">

      <span class="text-sm text-neutral-500">
        Compared to yesterday
      </span>

      <!-- Sparkline -->

      <svg width="80" height="30" viewBox="0 0 80 30">
        <polyline fill="none" :stroke="color" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
          points="0,22 10,18 20,20 30,14 40,16 50,10 60,12 70,6 80,8" />
      </svg>

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
  trend: number
  color: string
  icon: any
}

defineProps<Props>()
</script>
