<template>
  <AuthLayout>

    <BaseCard>

      <div class="mb-8 text-center">

        <div
          class="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-[#F8EDF2] px-4 py-2 text-sm font-medium text-[#7A003C]">
          ✨ Welcome Back
        </div>

        <h1 class="text-4xl font-bold tracking-tight text-neutral-900">
          Sign in to NombaLens
        </h1>

        <p class="mt-3 text-[15px] leading-7 text-neutral-500">
          Access your AI-powered financial copilot.
        </p>

      </div>

      <form class="space-y-5" @submit.prevent="handleLogin">

        <PhoneInput label="Phone Number" v-model="form.phone" />

        <PinInput label="Enter PIN" :length="6" v-model="form.pin" />

        <!-- Error state -->
        <p v-if="error" class="text-sm font-medium text-red-500 text-center">
          {{ error }}
        </p>

        <BaseButton type="submit" :disabled="isLoading">
          <span v-if="isLoading">Signing in...</span>
          <span v-else>Sign In</span>
        </BaseButton>

      </form>

      <div class="mt-6 rounded-2xl bg-neutral-50 p-4">
        <div class="flex items-center gap-3">

          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7A003C]/10">
            🔒
          </div>

          <div>

            <p class="text-sm font-semibold text-neutral-900">
              Protected by Nomba
            </p>

            <p class="mt-1 text-xs text-neutral-500">
              Your information is encrypted and securely stored.
            </p>

          </div>

        </div>
      </div>

    </BaseCard>

    <!-- <p class="mt-8 text-center text-sm text-neutral-500">
      New to NombaLens?

      <RouterLink to="/register" class="font-semibold text-[#7A003C] hover:underline">
        Create workspace
      </RouterLink>

    </p> -->

  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import AuthLayout from "@/layouts/AuthLayout.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import PhoneInput from "@/components/ui/PhoneInput.vue";
import PinInput from "@/components/ui/PinInput.vue";

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  phone: '',
  pin: ''
})

const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  error.value = ''
  if (!form.phone || !form.pin) {
    error.value = 'Please enter both phone and PIN'
    return
  }

  isLoading.value = true
  try {
    const res = await authStore.login(`${0}${form.phone}`, form.pin)
    if (res.success) {
      router.push('/dashboard')
    } else {
      error.value = res.message || 'Login failed'
      if (res.message === 'PIN_NOT_SET') {
        error.value = 'PIN not set. Please register or set your PIN.'
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error.value = err.message || 'An error occurred during login'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>
