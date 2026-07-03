<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-neutral-800">
      {{ label }}
    </label>

    <!-- Boxes -->
    <div class="flex justify-between gap-3">
      <button v-for="(_, index) in length" :key="index" type="button" @click="focusInput"
        class="flex h-14 w-14 items-center justify-center rounded-2xl border text-xl font-semibold transition-all duration-200"
        :class="[
          index === pin.length
            ? 'border-[#7A003C] ring-4 ring-[#7A003C]/10'
            : 'border-neutral-200',
        ]">
        <span v-if="pin[index]" class="h-3 w-3 rounded-full bg-neutral-900" />
      </button>
    </div>

    <!-- Hidden Input -->
    <input ref="inputRef" v-model="pin" type="password" inputmode="numeric" autocomplete="one-time-code" maxlength="6"
      class="absolute opacity-0 pointer-events-none" @input="onInput" />

    <p v-if="error" class="text-sm text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

interface Props {
  modelValue?: string;
  label?: string;
  error?: string;
  length?: number;
  autofocus?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  length: 4,
  autofocus: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const pin = ref(props.modelValue ?? "");

const inputRef = ref<HTMLInputElement>();

watch(
  () => props.modelValue,
  value => {
    if (value !== pin.value) {
      pin.value = value ?? "";
    }
  }
);

watch(pin, value => {
  emit("update:modelValue", value);
});

function onInput() {
  pin.value = pin.value
    .replace(/\D/g, "")
    .slice(0, props.length);
}

function focusInput() {
  inputRef.value?.focus();
}

onMounted(() => {
  if (props.autofocus) {
    focusInput();
  }
});
</script>
