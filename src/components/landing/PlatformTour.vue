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
  <div class="w-[100%] bg-[#22000F] py-[96px] px-[40px] mt-[124px]">
    <!--  -->
    <div
      class="w-[864px] mb-[51px] text-center mx-auto text-[#FBF3EC] font-medium text-[45.9px] leading-[55.2px] tracking-[-1.44px]">
      NombaLens is the only platform
      for businesses to run business intelligence for virtual accounts
    </div>

    <div class="w-full platform border-t border-b border-[#F6F3F1]/10 py-[33px] flex items-center overflow-x-scroll">
      <div class="flex items-center min-w-max px-6 lg:px-20">

        <template v-for="(step, index) in steps" :key="step.title">
          <!-- Card -->
          <div
            class="group relative w-[260px] rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#ED3C52]/50 hover:bg-white/[0.05] cursor-pointer">
            <!-- Glow -->
            <div
              class="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ED3C52]/5 via-transparent to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            </div>

            <!-- Step -->
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

          <!-- Connector -->
          <div v-if="index !== steps.length - 1" class="relative mx-6 flex items-center">
            <div class="h-px w-28 bg-gradient-to-r from-white/10 via-[#ED3C52]/70 to-white/10"></div>

            <div
              class="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#ED3C52] shadow-[0_0_20px_rgba(237,60,82,0.8)]">
            </div>
          </div>
        </template>

      </div>
    </div>
    <!--  -->
  </div>
</template>

<style scoped>
.platform::-webkit-scrollbar {
  display: none;
}

.platform {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
