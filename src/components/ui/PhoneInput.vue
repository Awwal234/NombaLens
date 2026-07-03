<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-neutral-800">
      {{ label }}
    </label>

    <div
      class="flex h-14 overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 focus-within:border-[#7A003C] focus-within:ring-4 focus-within:ring-[#7A003C]/10">
      <!-- Country -->
      <div class="flex items-center gap-2 border-r border-neutral-200 px-4">
        <span class="text-xl">🇳🇬</span>

        <span class="text-sm font-semibold text-neutral-700">
          +234
        </span>
      </div>

      <!-- Input -->

      <input :value="displayValue" @input="handleInput" maxlength="12" inputmode="numeric" placeholder="801 234 5678"
        class="flex-1 bg-transparent px-5 text-[15px] outline-none placeholder:text-neutral-400" />
    </div>

    <p v-if="error" class="text-sm text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue?: string;
  label?: string;
  error?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const displayValue = computed(() => {
  if (!props.modelValue) return "";

  return props.modelValue.replace(
    /(\d{3})(\d{3})(\d{0,4})/,
    (_, a, b, c) => {
      return [a, b, c].filter(Boolean).join(" ");
    }
  );
});

function handleInput(event: Event) {
  let value = (event.target as HTMLInputElement).value;

  value = value.replace(/\D/g, "");

  if (value.startsWith("0")) {
    value = value.slice(1);
  }

  value = value.slice(0, 10);

  emit("update:modelValue", value);
}
</script>
