<template>
  <div class="min-h-screen bg-[#FAF8F6]">
    <!-- Mobile Overlay -->
    <Transition name="fade">
      <div v-if="sidebarOpen" class="fixed inset-0 z-40 bg-black/40 lg:hidden" @click="sidebarOpen = false" />
    </Transition>

    <!-- Sidebar -->
    <aside :class="[
      'fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-[#ECE6E2] bg-white transition-transform duration-300',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <!-- Logo -->
      <div class="flex h-20 items-center px-8">
        <RouterLink to="/" class="flex items-center gap-3">

          <span class="text-2xl font-bold tracking-tight">
            NombaLens
          </span>
        </RouterLink>
      </div>

      <!-- Navigation -->

      <nav class="flex-1 px-5">

        <RouterLink v-for="item in menu" :key="item.name" :to="item.to"
          class="group mb-2 flex items-center gap-4 rounded-2xl px-4 py-3 transition"
          active-class="bg-[#7A003C] text-white shadow-lg">
          <component :is="item.icon" :size="20" />

          <span class="font-medium">
            {{ item.name }}
          </span>
        </RouterLink>

      </nav>

      <!-- Bottom -->

      <div class="border-t border-[#ECE6E2] p-5">
        <button @click="handleLogout" class="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-red-500 transition hover:bg-red-50">
          <LogOut :size="20" />

          Logout
        </button>
      </div>

    </aside>

    <!-- Main -->

    <div class="lg:ml-[280px]">

      <!-- Header -->

      <header
        class="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#ECE6E2] bg-[#FAF8F6]/80 px-6 backdrop-blur-xl">

        <div class="flex items-center gap-4">

          <button class="rounded-xl p-2 hover:bg-white lg:hidden" @click="sidebarOpen = true">
            <Menu :size="22" />
          </button>

          <!-- Search -->

          <div
            class="hidden md:flex h-12 w-[360px] items-center gap-3 rounded-2xl border border-[#ECE6E2] bg-white px-4">
            <Search :size="18" class="text-neutral-400" />

            <input placeholder="Search..." class="flex-1 bg-transparent outline-none" />
          </div>

        </div>

        <!-- Right -->

        <div class="flex items-center gap-4">

          <button class="relative rounded-2xl border border-[#ECE6E2] bg-white p-3">
            <Bell :size="20" />

            <span class="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <button class="flex items-center gap-3 rounded-2xl border border-[#ECE6E2] bg-white p-2 pl-3">

            <div>

              <p class="text-sm font-semibold">
                Muh-Awwal
              </p>

              <p class="text-xs text-neutral-500">
                Administrator
              </p>

            </div>

            <img src="https://ui-avatars.com/api/?background=7A003C&color=fff&name=M" class="h-10 w-10 rounded-xl" />

          </button>

        </div>

      </header>

      <!-- Content -->

      <main class="p-6 md:p-8">
        <slot />
      </main>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import {
  LayoutDashboard,
  Sparkles,
  Settings,
  Bell,
  Search,
  Menu,
  LogOut
} from "lucide-vue-next";

const sidebarOpen = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const menu = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "AI Assistant",
    to: "/summary",
    icon: Sparkles
  },
  {
    name: "Settings",
    to: "/settings",
    icon: Settings
  }
];

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: .25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
