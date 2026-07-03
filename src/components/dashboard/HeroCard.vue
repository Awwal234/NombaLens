<template>
  <section
    class="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#7A003C] via-[#8C114D] to-[#6D5EF7] p-8 text-white shadow-[0_30px_80px_rgba(122,0,60,.25)]">
    <!-- Decorative -->
    <div class="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

    <div class="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

    <div class="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
      <!-- Left -->

      <div class="max-w-2xl">

        <span class="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
          ✨ AI Financial Copilot
        </span>

        <h1 class="mt-6 text-4xl font-bold leading-tight md:text-5xl">
          {{ greeting }}, {{ name }} 👋
        </h1>

        <p class="mt-4 max-w-xl text-lg leading-8 text-white/80">
          {{ summary }}
        </p>

        <div class="mt-8 flex flex-wrap gap-4">

          <button class="rounded-2xl bg-white px-6 py-3 font-semibold text-[#7A003C] transition hover:scale-[1.03]">
            Ask AI
          </button>

          <button
            class="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20">
            View Insights
          </button>

        </div>

      </div>

      <!-- Right -->

      <div class="rounded-[28px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl lg:w-[320px]">
        <p class="text-sm text-white/70">
          Today
        </p>

        <h2 class="mt-2 text-4xl font-bold">
          {{ todayRevenue }}
        </h2>

        <div class="mt-6 flex items-center justify-between rounded-2xl bg-white/10 p-4">
          <div>

            <p class="text-sm text-white/70">
              Business Health
            </p>

            <p class="mt-2 text-3xl font-bold">
              {{ health }}%
            </p>

          </div>

          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl">
            💚
          </div>

        </div>

        <div class="mt-6">

          <div class="mb-2 flex justify-between text-sm">

            <span>Health Score</span>

            <span>{{ health }}%</span>

          </div>

          <div class="h-2 overflow-hidden rounded-full bg-white/15">
            <div class="h-full rounded-full bg-emerald-400 transition-all duration-700"
              :style="{ width: `${health}%` }" />
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name?: string;
  todayRevenue?: string;
  summary?: string;
  health?: number;
}

const props = withDefaults(defineProps<Props>(), {
  name: "Muh-Awwal",
  todayRevenue: "₦245,300",
  health: 94,
  summary:
    "Revenue is up 14% compared to yesterday. AI recommends increasing inventory before the weekend based on current sales trends.",
});

const greeting = computed(() => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";

  if (hour < 17) return "Good afternoon";

  return "Good evening";
});
</script>
