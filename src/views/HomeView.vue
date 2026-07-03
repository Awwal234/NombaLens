<script setup lang="ts">
import HeaderSection from '@/components/landing/HeaderSection.vue';
import HeroSection from '@/components/landing/HeroSection.vue';
import PlatformTour from '@/components/landing/PlatformTour.vue';
import AiTour from '@/components/landing/AiTour.vue';
import HexagonPart from '@/components/landing/HexagonPart.vue';
import FooterSection from '@/components/landing/FooterSection.vue';
</script>

<template>
  <main class="flex justify-center items-center lg:block lg:justify-normal lg:items-baseline">
    <div class="hidden lg:block">
      <HeaderSection />
      <HeroSection />
      <PlatformTour />
      <AiTour />
      <HexagonPart />
      <FooterSection />
    </div>
    <div class="text-center mt-[50vh] font-medium text-[16px] w-[400px] lg:hidden">
      View this website on desktop screens.
    </div>
  </main>
</template>
