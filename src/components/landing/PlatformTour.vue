<script setup lang="ts">
const steps = [
  {
    title: "Generate Customer",
    description: "Create a new customer profile in seconds.",
  },
  {
    title: "Generate Virtual Account",
    description: "Assign a dedicated Nomba Virtual Account automatically.",
  },
  {
    title: "Receive Payment",
    description: "Every payment is linked to the right customer instantly.",
  },
  {
    title: "AI Analysis",
    description: "Detect trends, churn risks and revenue opportunities.",
  },
  {
    title: "Business Insight",
    description: "Receive actionable recommendations that drive growth.",
  },
];
</script>

<template>
  <section class="mt-16 bg-[#22000F] px-4 py-16 sm:px-6 lg:mt-[124px] lg:px-8 lg:py-[96px]">
    <div
      class="mx-auto mb-10 max-w-[864px] text-center text-[1.75rem] font-medium leading-tight tracking-[-0.05em] text-[#FBF3EC] sm:text-[2.5rem] lg:mb-[51px] lg:text-[45.9px] lg:leading-[55.2px] lg:tracking-[-1.44px]">
      NombaLens is the only platform for businesses to run business intelligence for virtual accounts
    </div>

    <div class="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="(step, index) in steps" :key="step.title"
        class="group relative cursor-pointer rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#ED3C52]/50 hover:bg-white/[0.05]">
        <div
          class="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ED3C52]/5 via-transparent to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        </div>

        <div
          class="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ED3C52]/30 bg-[#ED3C52]/10 text-sm font-semibold text-[#ED3C52]">
          {{ index + 1 }}
        </div>

        <h3 class="relative mt-5 text-xl font-semibold text-white">
          {{ step.title }}
        </h3>

        <p class="relative mt-2 text-sm leading-7 text-white/60">
          {{ step.description }}
        </p>
      </div>
    </div>
  </section>
</template>
