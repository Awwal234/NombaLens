<script setup lang="ts">
import { useLinkTo } from "@/helper/linkto";

const { linkTo } = useLinkTo();
</script>

<template>
  <header class="fixed left-0 top-0 z-[100] w-full border-b border-[#F2F1F1] bg-[#fff]/95 backdrop-blur-sm">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div class="text-base font-bold text-[#000] sm:text-[15px]">
        NombaLens
      </div>

      <button @click="linkTo('/login')"
        class="cursor-pointer rounded-[12px] bg-[#960145] px-4 py-2.5 text-sm font-bold text-[#fff] transition hover:bg-[#b50052] sm:px-[17px] sm:py-[12.3px] sm:text-[15px]">
        Get started
      </button>
    </div>
  </header>
</template>
