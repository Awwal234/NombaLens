<template>
  <div
    class="relative overflow-hidden rounded-[30px] border border-[#E8E2EE] bg-gradient-to-br from-[#FCFBFF] via-white to-[#F7F3FF] p-7 shadow-sm">
    <!-- Background Glow -->
    <div class="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#6D5EF7]/10 blur-3xl" />

    <div class="relative z-10">
      <!-- Header -->
      <div class="flex items-start justify-between">

        <div>

          <div
            class="inline-flex items-center gap-2 rounded-full bg-[#EEEAFE] px-3 py-2 text-sm font-semibold text-[#6D5EF7]">
            ✨ AI Financial Summary
          </div>

          <h2 class="mt-4 text-2xl font-bold text-neutral-900">
            Your business looks healthy today.
          </h2>

          <p class="mt-3 max-w-xl leading-7 text-neutral-600">
            {{ summary }}
          </p>

        </div>

        <button class="rounded-2xl bg-white p-3 shadow transition hover:scale-105">
          ✨
        </button>

      </div>

      <!-- Insights -->

      <div class="mt-8 space-y-4">

        <div v-for="(item, index) in insights" :key="index"
          class="flex items-start gap-4 rounded-2xl bg-white/80 p-4 backdrop-blur">

          <div class="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#6D5EF7]/10 text-lg">
            {{ item.icon }}
          </div>

          <div>

            <h3 class="font-semibold text-neutral-900">
              {{ item.title }}
            </h3>

            <p class="mt-1 text-sm leading-6 text-neutral-500">
              {{ item.description }}
            </p>

          </div>

        </div>

      </div>

      <!-- Recommendation -->

      <div class="mt-8 rounded-3xl bg-[#6D5EF7] p-6 text-white">

        <p class="text-sm uppercase tracking-widest text-white/70">
          Recommendation
        </p>

        <p class="mt-3 text-lg leading-8">
          {{ recommendation }}
        </p>

      </div>

      <!-- Footer -->

      <div class="mt-8 flex flex-wrap gap-4">

        <button 
          @click="$router.push('/summary')"
          class="rounded-2xl bg-[#6D5EF7] px-6 py-3 font-semibold text-white transition hover:scale-[1.02] shadow-sm shadow-[#6D5EF7]/20"
        >
          Ask AI
        </button>

        <button
          @click="$router.push('/summary')"
          class="rounded-2xl border border-neutral-200 bg-white px-6 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-50 shadow-sm"
        >
          View Full Report
        </button>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Insight {
  icon: string
  title: string
  description: string
}

interface Props {
  summary: string
  recommendation: string
  insights: Insight[]
}

defineProps<Props>()
const $router = useRouter()
</script>
