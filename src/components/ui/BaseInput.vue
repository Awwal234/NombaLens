<template>
  <div class="space-y-2">
    <label v-if="label" :for="id" class="block text-sm font-medium text-neutral-800">
      {{ label }}
    </label>

    <div class="group relative transition-all duration-300">
      <!-- Left Icon -->
      <div v-if="$slots.icon"
        class="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#7A003C]">
        <slot name="icon" />
      </div>

      <input :id="id" :value="modelValue" :type="showPassword ? 'text' : type" :placeholder="placeholder"
        :disabled="disabled" @input="updateValue"
        class="h-14 w-full rounded-2xl border border-[#E7E2DE] bg-white transition-all duration-300 outline-none placeholder:text-neutral-400 focus:border-[#7A003C] focus:ring-4 focus:ring-[#7A003C]/10 disabled:bg-neutral-100"
        :class="[
          $slots.icon ? 'pl-14 pr-5' : 'px-5',
          type === 'password' ? 'pr-14' : '',
          error ? 'border-red-500 focus:ring-red-100' : ''
        ]" />

      <!-- Password Toggle -->

      <button v-if="type === 'password'" type="button" @click="showPassword = !showPassword"
        class="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-700">
        <Eye v-if="!showPassword" :size="18" />

        <EyeOff v-else :size="18" />
      </button>

    </div>

    <Transition name="fade">

      <p v-if="error" class="text-sm text-red-500">
        {{ error }}
      </p>

    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";

interface Props {
  id?: string;
  modelValue?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  type?: string;
}

withDefaults(defineProps<Props>(), {
  type: "text",
});

const emit = defineEmits(["update:modelValue"]);

const showPassword = ref(false);

function updateValue(event: Event) {
  emit(
    "update:modelValue",
    (event.target as HTMLInputElement).value
  );
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: .2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
