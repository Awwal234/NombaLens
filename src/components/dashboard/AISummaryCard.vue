<template>
  <div
    class="relative overflow-hidden rounded-[24px] border border-[var(--au-border)] bg-gradient-to-br from-white via-white to-[var(--au-accent-light)] p-7 shadow-sm">
    <!-- Background Glow -->
    <div class="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--au-accent)]/5 blur-3xl" />

    <div class="relative z-10">
      <!-- Header -->
      <div class="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div
            class="inline-flex items-center gap-2 rounded-full bg-[var(--au-accent-light)] px-3 py-1.5 text-xs font-bold text-[var(--au-accent)]">
            ✨ AI Financial Summary
          </div>

          <h2 class="mt-4 text-2xl font-black text-neutral-900 tracking-tight">
            Your business looks healthy today.
          </h2>

          <p class="mt-3 max-w-xl leading-relaxed text-neutral-600 font-medium">
            {{ summary }}
          </p>
        </div>
      </div>

      <!-- Insights -->
      <div class="mt-8 space-y-4">
        <div v-for="(item, index) in insights" :key="index"
          class="flex items-start gap-4 rounded-xl bg-white/90 p-4 border border-neutral-100 shadow-sm">
          <div
            class="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--au-accent-light)] text-lg text-[var(--au-accent)]">
            {{ item.icon }}
          </div>
          <div>
            <h3 class="font-bold text-neutral-900 tracking-tight">
              {{ item.title }}
            </h3>
            <p class="mt-1 text-sm leading-relaxed text-neutral-500 font-medium">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Recommendation -->
      <div class="mt-8 rounded-[20px] bg-[var(--au-accent)] p-6 text-white shadow-md shadow-[var(--au-accent)]/15">
        <p class="text-[10px] font-bold uppercase tracking-widest text-white/80">
          Recommendation
        </p>
        <p class="mt-2 text-base leading-relaxed font-semibold">
          {{ recommendation }}
        </p>
      </div>

      <!-- Footer -->
      <div class="mt-8 flex flex-wrap gap-4">
        <button @click="$router.push('/summary')"
          class="rounded-xl cursor-pointer bg-[var(--au-accent)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--au-accent-dark)] hover:scale-[1.02] shadow-md shadow-[var(--au-accent)]/10">
          Ask AI
        </button>

        <button @click="$router.push('/summary')"
          class="rounded-xl cursor-pointer border border-neutral-200 bg-white px-6 py-3 text-sm font-bold text-neutral-600 transition hover:bg-neutral-50">
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
