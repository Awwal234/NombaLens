<script setup lang="ts">
import { useLinkTo } from "@/helper/linkto";

const { linkTo } = useLinkTo();
</script>

<template>
  <section class="relative z-10 -mb-[120px] md:-mb-[185px] px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[880px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
      <div
        class="rounded-[2rem] border border-[#53092A] bg-[#1a0510] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-12 lg:py-24 lg:[clip-path:polygon(18%_0,82%_0,100%_50%,82%_100%,18%_100%,0_50%)]">
        <h2
          class="mx-auto max-w-[550px] text-center text-[1.75rem] font-medium leading-snug text-[#FBF3EC] sm:text-[2.2rem] lg:text-[34px]">
          Take the first step in transforming your data into business intelligence
        </h2>

        <button @click="linkTo('/login')"
          class="mx-auto mt-8 block cursor-pointer rounded-xl bg-[#980045] px-8 py-3.5 text-[16px] font-medium transition hover:bg-[#b50052]">
          Get started
        </button>
      </div>
    </div>
  </section>
</template>
