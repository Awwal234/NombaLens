<template>
  <div class="relative min-h-screen overflow-hidden bg-[#FAF8F6] flex items-center justify-center px-6 py-10">
    <!-- Background Blobs -->
    <div class="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#7A003C]/8 blur-[120px]" />

    <div class="absolute -bottom-56 -right-40 h-[500px] w-[500px] rounded-full bg-[#B94A79]/8 blur-[140px]" />

    <!-- Grid -->
    <div class="absolute inset-0 opacity-[0.03]" style="
        background-image:
        linear-gradient(#000 1px, transparent 1px),
        linear-gradient(90deg,#000 1px,transparent 1px);
        background-size:40px 40px;
      " />

    <!-- Content -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo -->

      <RouterLink to="/" class="mb-10 flex items-center justify-center gap-3">

        <span class="text-2xl font-bold tracking-tight text-neutral-900">
          NombaLens
        </span>
      </RouterLink>

      <!-- Slot -->

      <slot />

      <!-- Footer -->

      <p class="mt-8 text-center text-sm text-neutral-500">
        © {{ year }} NombaLens. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
