<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm"
        @click.self="close">
        <Transition name="modal" appear>
          <div v-if="modelValue"
            class="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-[0_40px_120px_rgba(0,0,0,.18)]">
            <!-- Header -->
            <div v-if="title || $slots.header"
              class="flex items-center justify-between border-b border-neutral-100 px-8 py-6">
              <slot name="header">
                <h2 class="text-xl font-semibold text-neutral-900">
                  {{ title }}
                </h2>
              </slot>

              <button class="rounded-xl p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
                @click="close">
                <X :size="20" />
              </button>
            </div>

            <!-- Body -->
            <div class="px-8 py-6">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="flex justify-end gap-3 border-t border-neutral-100 px-8 py-5">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";

interface Props {
  modelValue: boolean;
  title?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function close() {
  emit("update:modelValue", false);
}
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity .25s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all .28s cubic-bezier(.2, .8, .2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(.96);
}
</style>
