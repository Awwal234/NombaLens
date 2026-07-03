<template>
  <button :type="type" :disabled="disabled || loading" :class="[
    'inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold transition-all duration-300',
    'focus:outline-none focus:ring-4 focus:ring-[#7A003C]/15',
    loading || disabled
      ? 'cursor-not-allowed opacity-70'
      : 'hover:-translate-y-0.5 active:scale-[0.98]',
    variantClasses
  ]">
    <svg v-if="loading" class="mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>

    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  variant: "primary",
});

const variantClasses = computed(() => {
  if (props.variant === "secondary") {
    return "border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50";
  }

  return "bg-[#7A003C] text-white hover:bg-[#650031]";
});
</script>
