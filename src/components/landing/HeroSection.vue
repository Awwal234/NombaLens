<script setup lang="ts">
import { useLinkTo } from "@/helper/linkto";

const { linkTo } = useLinkTo();

const goWatchDemo = (e: Event) => {
  window.open('https://player.cloudinary.com/embed/?cloud_name=drxgewgtj&public_id=Screencast_from_2026-07-03_00-41-24_jclplh', '_blank');
  e.stopPropagation();
};
</script>

<template>
  <section class="px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-[195px] lg:pb-0">
    <div
      class="mx-auto mb-5 md:max-w-[864px] lg:max-w-[950px] text-center text-[2.25rem] font-medium leading-tight tracking-[-0.06em] text-[#090706] sm:text-[3rem] lg:mb-[20px] lg:text-[77.9px] lg:leading-[84px] lg:tracking-[-2.52px]">
      AI financial copilot for Nigerian SMEs using Nomba payment infrastructure
    </div>
    <div
      class="mx-auto mb-8 max-w-[644px] text-center text-base leading-7 text-[#090706] sm:text-lg lg:mb-[51px] lg:text-[21.7px] lg:leading-[30px]">
      Every customer gets a Virtual Account. Every payment becomes structured intelligence. Every insight drives revenue
      growth.
    </div>

    <div class="mx-auto mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row lg:mb-[99px]">
      <button @click="linkTo('/login')"
        class="cursor-pointer rounded-[12px] bg-[#960145] px-6 py-3 text-[15px] font-medium text-[#fff] transition hover:bg-[#b50052]">
        Get started
      </button>
      <button @click="goWatchDemo"
        class="cursor-pointer rounded-[12px] border border-[#960145] bg-transparent px-6 py-3 text-[15px] font-medium text-[#960145] transition hover:bg-[#960145]/10">
        Watch a demo
      </button>
    </div>

    <div class="mx-auto mb-16 max-w-[1000px] px-0 sm:px-4 lg:mb-[96px] lg:px-[40px]">
      <div class="overflow-hidden rounded-[20px] border border-[#E8E2EE] shadow-2xl">
        <img src="/landing/productsample.png" class="block h-auto w-full object-cover"
          alt="NombaLens Dashboard Preview" />
      </div>
    </div>

    <div
      class="mx-auto mb-[10px] text-center uppercase text-[#090706] text-base font-medium leading-[30px] sm:text-[18.6px]">
      powered by nomba apis
    </div>
    <div class="mx-auto h-fit flex w-fit select-none justify-center">
      <img src="/landing/powerednomba.webp" class="h-[24px] w-fit md:w-fit object-cover md:object-contain select-none"
        alt="Nomba APIs" />
    </div>
  </section>
</template>
