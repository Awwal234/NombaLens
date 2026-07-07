<template>
  <div class="min-h-screen bg-[var(--au-bg)]">
    <!-- Mobile Overlay -->
    <Transition name="fade">
      <div v-if="sidebarOpen" class="fixed inset-0 z-40 bg-black/40 lg:hidden" @click="sidebarOpen = false" />
    </Transition>

    <!-- Sidebar — Narrow icon-only style -->
    <aside :class="[
      'fixed left-0 top-0 z-50 flex h-[100%] w-[100px] flex-col items-center border-r border-[var(--au-border)] bg-white transition-transform duration-300',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <!-- Logo -->
      <div class="flex h-20 items-center justify-center w-full">
        <RouterLink to="/" class="flex items-center justify-center">
          <span class="text-2xl font-bold tracking-tight text-[var(--au-accent)]">
            NL
          </span>
        </RouterLink>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 flex flex-col items-center gap-2 pt-6 w-full px-3">
        <RouterLink v-for="item in menu" :key="item.name" :to="item.to"
          class="group flex flex-col items-center justify-center gap-1.5 rounded-2xl px-2 py-3 transition w-full"
          active-class="nav-active">
          <component :is="item.icon" :size="22" class="nav-icon" />
          <span class="text-[11px] font-medium nav-label">
            {{ item.name }}
          </span>
        </RouterLink>
      </nav>

      <!-- Bottom -->
      <div class="border-t border-[var(--au-border)] p-3 w-full">
        <button @click="handleLogout"
          class="flex flex-col items-center justify-center gap-1.5 w-full rounded-2xl px-2 py-3 text-red-400 transition hover:bg-red-50 hover:text-red-500">
          <LogOut :size="20" />
          <span class="text-[11px] font-medium">Logout</span>
        </button>
      </div>

    </aside>

    <!-- Main -->
    <div class="lg:ml-[100px]">

      <!-- Header -->
      <header
        class="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[var(--au-border)] bg-[var(--au-bg)]/80 px-6 backdrop-blur-xl">

        <div class="flex items-center gap-4">
          <button class="rounded-xl p-2 hover:bg-white lg:hidden" @click="sidebarOpen = true">
            <Menu :size="22" />
          </button>

          <!-- Search -->
          <div
            class="hidden md:flex h-12 w-[360px] items-center gap-3 rounded-2xl border border-[var(--au-border)] bg-white px-4">
            <Search :size="18" class="text-[var(--au-text-secondary)]" />
            <input placeholder="Search for people, Method, Amount .."
              class="flex-1 bg-transparent outline-none text-sm text-[var(--au-text-primary)]" />
          </div>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-4">
          <!-- Monthly Filter -->
          <div
            class="hidden md:flex items-center gap-2 rounded-xl border border-[var(--au-accent)] px-4 py-2.5 text-sm font-medium text-[var(--au-accent)]">
            <CalendarDays :size="16" />
            Monthly
            <ChevronDown :size="14" />
          </div>

          <button class="relative rounded-2xl border border-[var(--au-border)] bg-white p-3">
            <Bell :size="20" class="text-[var(--au-accent)]" />
            <span class="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <button class="flex items-center gap-3 rounded-2xl border border-[var(--au-border)] bg-white p-2 pl-3">
            <div>
              <p class="text-sm font-semibold text-left text-[var(--au-text-primary)]">
                {{ authStore.merchant?.businessName }}
              </p>
              <p class="text-xs text-[var(--au-text-secondary)] text-left">
                Administrator
              </p>
            </div>
            <img
              :src="`https://ui-avatars.com/api/?background=7A003C&color=fff&name=${authStore.merchant?.businessName}`"
              class="h-10 w-10 rounded-xl" />
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import {
  LayoutDashboard,
  Sparkles,
  Settings,
  Bell,
  Search,
  Menu,
  LogOut,
  CalendarDays,
  ChevronDown
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

onMounted(async () => {
  if (!authStore.merchant) {
    await authStore.fetchProfile().catch(() => { });
  }
})
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

/* Nav item default state */
.nav-icon {
  color: var(--au-text-secondary);
  transition: color 0.2s;
}

.nav-label {
  color: var(--au-text-secondary);
  transition: color 0.2s;
}

/* Active nav item */
.nav-active {
  background: var(--au-accent);
  box-shadow: 0 8px 24px rgba(44, 165, 214, 0.25);
}

.nav-active .nav-icon {
  color: white;
}

.nav-active .nav-label {
  color: white;
}

/* Hover on non-active items */
.group:not(.nav-active):hover {
  background: var(--au-accent-light);
}

.group:not(.nav-active):hover .nav-icon {
  color: var(--au-accent);
}

.group:not(.nav-active):hover .nav-label {
  color: var(--au-accent);
}
</style>
