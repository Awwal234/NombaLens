<script setup lang="ts">
</script>

<template>
  <footer class="relative z-0 w-full bg-[#2F0819] px-4 pb-10 pt-[180px] text-white sm:px-6 lg:px-10 lg:pt-[230px]">
    <div class="mb-[64px] w-full border-t border-[#53092A]"></div>
    <div class="mx-auto">
      <div class="mb-16 grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-16">
        <div class="lg:col-span-2">
          <h3 class="mb-4 text-[32px] font-bold tracking-tight">NombaLens</h3>
          <p class="max-w-[360px] text-[16px] leading-relaxed text-white/70">
            Financial copilot for Nigerian SMEs using Nomba payment infrastructure
          </p>
        </div>

        <div>
          <h4 class="mb-6 text-lg font-semibold text-[#FBF3EC]">Product</h4>
          <ul class="space-y-4">
            <li><a href="#" class="text-[15px] text-white/70 transition-colors hover:text-white">Features</a></li>
            <li><a href="#" class="text-[15px] text-white/70 transition-colors hover:text-white">Pricing</a></li>
            <li><a href="#" class="text-[15px] text-white/70 transition-colors hover:text-white">Integrations</a></li>
            <li><a href="#" class="text-[15px] text-white/70 transition-colors hover:text-white">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 class="mb-6 text-lg font-semibold text-[#FBF3EC]">Resources</h4>
          <ul class="space-y-4">
            <li><a href="#" class="text-[15px] text-white/70 transition-colors hover:text-white">Documentation</a></li>
            <li><a href="#" class="text-[15px] text-white/70 transition-colors hover:text-white">Blog</a></li>
            <li><a href="#" class="text-[15px] text-white/70 transition-colors hover:text-white">Help Center</a></li>
            <li><a href="#" class="text-[15px] text-white/70 transition-colors hover:text-white">Community</a></li>
          </ul>
        </div>

        <div>
          <h4 class="mb-6 text-lg font-semibold text-[#FBF3EC]">Stay in the loop</h4>
          <p class="mb-4 text-[14px] text-white/70">Join our newsletter for the latest updates.</p>
          <div class="flex flex-row">
            <input type="email" placeholder="Enter your email"
              class="w-full rounded-l-xl border-0 bg-white/10 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/50 focus:ring-1 focus:ring-[#980045]" />
            <button
              class="cursor-pointer rounded-r-xl bg-[#980045] px-5 py-3 text-[15px] font-medium transition-colors hover:bg-[#b50052]">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div class="mb-[32px] w-full border-t border-[#53092A]"></div>
      <div class="flex max-w-7xl flex-col items-center justify-between gap-4 pt-0 md:flex-row">
        <p class="text-[14px] text-white/50">© 2026 NombaLens. All rights reserved.</p>
        <div class="flex gap-6 text-[14px] text-white/50">
          <a href="#" class="transition-colors hover:text-white">Privacy Policy</a>
          <a href="#" class="transition-colors hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
