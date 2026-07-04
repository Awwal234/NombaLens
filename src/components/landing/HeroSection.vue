<script setup lang="ts">
import { useLinkTo } from "@/helper/linkto";

const { linkTo } = useLinkTo();

const goWatchDemo = (e: Event) => {
  window.open('https://player.cloudinary.com/embed/?cloud_name=drxgewgtj&public_id=Screencast_from_2026-07-03_00-41-24_jclplh', '_blank')
  e.stopPropagation();
}
</script>

<template>
  <div class="pt-[195px]">
    <!--  -->
    <div
      class="w-[864px] mx-auto text-center mb-[20px] text-[#090706] font-medium text-[77.9px] leading-[84px] tracking-[-2.52px]">
      Turn Virtual Account into Business Intelligence
    </div>
    <div class="w-[644px] mx-auto text-center mb-[51px] text-[#090706] font-regular text-[21.7px] leading-[30px]">
      Every customer gets a Virtual Account. Every payment
      becomes structured intelligence. Every insight drives
      revenue growth.
    </div>
    <!-- cta buttons -->
    <div @click="linkTo('/login')" class="w-fit mx-auto flex items-center space-x-[16px] mb-[99px]">
      <div class="text-[#fff] font-medium text-[15px] py-[12.3px] px-[25px] bg-[#960145] rounded-[12px] cursor-pointer">
        Get started
      </div>
      <div @click="goWatchDemo"
        class="text-[#960145] font-medium text-[15px] py-[12.3px] px-[25px] bg-transparent border border-[#960145] rounded-[12px] cursor-pointer">
        Watch a demo
      </div>
    </div>
    <!-- hero image -->
    <div class="w-full max-w-[1000px] mx-auto px-[40px] mb-[96px]">
      <div class="overflow-hidden rounded-[20px] border border-[#E8E2EE] shadow-2xl">
        <img src="/landing/heroimg.png" class="w-full h-auto object-cover block" alt="NombaLens Dashboard Preview" />
      </div>
    </div>
    <!-- powered by nomba -->
    <div class="text-center mb-[10px] mx-auto uppercase text-[#090706] font-medium text-[18.6px] leading-[30px]">
      powered by nomba apis
    </div>
    <div class="w-fit mx-auto select-none">
      <img src="/landing/powerednomba.webp" class="w-fit h-[24px] object-contain select-none" />
    </div>
    <!--  -->
  </div>
</template>
