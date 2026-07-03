<script setup lang="ts">
</script>

<template>
  <footer class="bg-[#2F0819] w-full pt-[230px] pb-10 px-10 text-white relative z-0">
    <div class="w-full border-t border-[#53092A] mb-[64px]"></div>
    <div class="mx-auto">
      <div class="max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16 mb-16">
        <!-- Brand & Subtitle -->
        <div class="lg:col-span-2">
          <h3 class="text-[32px] font-bold mb-4 tracking-tight">NombaLens</h3>
          <p class="text-white/70 text-[16px] leading-relaxed max-w-[360px]">
            Turning Virtual Accounts into Business Intelligence
            Infrastructure.
          </p>
        </div>

        <!-- Product -->
        <div>
          <h4 class="font-semibold text-lg mb-6 text-[#FBF3EC]">Product</h4>
          <ul class="space-y-4">
            <li><a href="#" class="text-white/70 hover:text-white transition-colors text-[15px]">Features</a></li>
            <li><a href="#" class="text-white/70 hover:text-white transition-colors text-[15px]">Pricing</a></li>
            <li><a href="#" class="text-white/70 hover:text-white transition-colors text-[15px]">Integrations</a></li>
            <li><a href="#" class="text-white/70 hover:text-white transition-colors text-[15px]">Changelog</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="font-semibold text-lg mb-6 text-[#FBF3EC]">Resources</h4>
          <ul class="space-y-4">
            <li><a href="#" class="text-white/70 hover:text-white transition-colors text-[15px]">Documentation</a></li>
            <li><a href="#" class="text-white/70 hover:text-white transition-colors text-[15px]">Blog</a></li>
            <li><a href="#" class="text-white/70 hover:text-white transition-colors text-[15px]">Help Center</a></li>
            <li><a href="#" class="text-white/70 hover:text-white transition-colors text-[15px]">Community</a></li>
          </ul>
        </div>

        <!-- Stay in the loop -->
        <div>
          <h4 class="font-semibold text-lg mb-6 text-[#FBF3EC]">Stay in the loop</h4>
          <p class="text-white/70 text-[14px] mb-4">Join our newsletter for the latest updates.</p>
          <div class="flex">
            <input type="email" placeholder="Enter your email"
              class="w-full bg-white/10 text-white placeholder:text-white/50 px-4 py-3 rounded-l-xl outline-none focus:ring-1 focus:ring-[#980045] text-[15px]" />
            <button
              class="bg-[#980045] cursor-pointer hover:bg-[#b50052] transition-colors px-5 py-3 rounded-r-xl text-[15px] font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="w-full border-t border-[#53092A] mb-[32px]"></div>
      <div class="max-w-7xl pt-0 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-white/50 text-[14px]">© 2026 NombaLens. All rights reserved.</p>
        <div class="flex gap-6 text-white/50 text-[14px]">
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
