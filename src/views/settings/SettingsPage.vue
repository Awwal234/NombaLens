<template>
  <DashboardLayout>
    <div class="space-y-6 max-w-3xl mx-auto py-6">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p class="text-gray-500">Manage your merchant account settings.</p>
        </div>
      </div>

      <!-- Profile Info -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span class="text-[#7A003C]">🏢</span> Business Profile
        </h2>

        <div v-if="isLoading" class="animate-pulse space-y-4">
          <div class="h-10 bg-gray-100 rounded-lg w-full"></div>
          <div class="h-10 bg-gray-100 rounded-lg w-full"></div>
          <div class="h-10 bg-gray-100 rounded-lg w-full"></div>
        </div>

        <div v-else-if="authStore.merchant" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Business Name -->
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Business Name</label>
              <div class="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                {{ authStore.merchant.businessName }}
              </div>
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
              <div class="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                {{ authStore.merchant.phone }}
              </div>
            </div>

            <!-- Sub Account ID -->
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Sub Account ID</label>
              <div class="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                {{ authStore.merchant.subAccountId }}
              </div>
            </div>

            <!-- Account Details -->
            <div v-if="authStore.merchant.accountNumber">
              <label class="block text-sm font-medium text-gray-500 mb-1">Account Number</label>
              <div class="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                {{ authStore.merchant.accountNumber }}
              </div>
            </div>
            
            <div v-if="authStore.merchant.bankName">
              <label class="block text-sm font-medium text-gray-500 mb-1">Bank</label>
              <div class="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                {{ authStore.merchant.bankName }}
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-8 text-gray-500">
          Failed to load profile. Please try refreshing.
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import DashboardLayout from "@/layouts/DashboardLayout.vue"

const authStore = useAuthStore()
const isLoading = ref(true)

onMounted(async () => {
  if (!authStore.merchant) {
    try {
      await authStore.fetchProfile()
    } catch (e) {
      console.error(e)
    }
  }
  isLoading.value = false
})
</script>
