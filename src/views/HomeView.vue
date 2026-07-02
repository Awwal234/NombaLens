<script setup lang="ts">
import HeaderSection from '@/components/landing/HeaderSection.vue';
import HeroSection from '@/components/landing/HeroSection.vue';
import PlatformTour from '@/components/landing/PlatformTour.vue';
import AiTour from '@/components/landing/AiTour.vue';
import HexagonPart from '@/components/landing/HexagonPart.vue';
import FooterSection from '@/components/landing/FooterSection.vue';
</script>

<template>
  <main class="hidden lg:block">
    <HeaderSection />
    <HeroSection />
    <PlatformTour />
    <AiTour />
    <HexagonPart />
    <FooterSection />
  </main>
</template>
