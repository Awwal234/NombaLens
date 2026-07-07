<template>
  <div class="bg-white rounded-[24px] border border-[var(--au-border)] p-6 md:p-8 flex flex-col mt-8 shadow-sm">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-[var(--au-accent-light)] text-[var(--au-accent)] rounded-full flex items-center justify-center text-xl">
          💬
        </div>
        <div>
          <h3 class="text-xl font-bold text-neutral-900 tracking-tight">Ask AI</h3>
          <p class="text-xs font-medium text-neutral-400">Ask any questions about your financial data</p>
        </div>
      </div>

      <!-- Clear Chat Button -->
      <button v-if="messages.length > 0" @click="clearChat"
        class="text-xs cursor-pointer font-bold text-neutral-500 hover:text-red-500 bg-neutral-50 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
        title="Clear conversation">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
          </path>
        </svg>
        <span class="hidden sm:inline">Clear Chat</span>
      </button>
    </div>

    <!-- Chat History -->
    <div class="flex-1 min-h-[200px] max-h-[400px] overflow-y-auto mb-6 space-y-4 pr-2 custom-scrollbar">
      <div v-if="messages.length === 0"
        class="flex flex-col items-center justify-center h-full text-neutral-400 italic opacity-85 animate-fade-in font-medium text-sm py-12">
        <span class="text-3xl mb-2">✨</span>
        Ask a question to get started...
      </div>

      <!-- Messages -->
      <div v-for="(msg, index) in messages" :key="index" class="flex flex-col animate-fade-in"
        :class="msg.role === 'user' ? 'items-end' : 'items-start'">
        <div class="max-w-[85%] rounded-[20px] px-5 py-3 text-sm md:text-base font-medium" :class="msg.role === 'user'
          ? 'bg-[var(--au-accent)] text-white rounded-tr-sm shadow-sm shadow-[var(--au-accent)]/10'
          : 'bg-neutral-50 text-neutral-800 border border-neutral-100 rounded-tl-sm'
          ">
          <div v-if="msg.role === 'ai'" class="mb-2 flex items-center gap-2">
            <span class="text-xs font-bold text-[var(--au-accent)]">
              ✨ AI Assistant
            </span>
          </div>

          <!-- User -->
          <p v-if="msg.role === 'user'" class="whitespace-pre-wrap leading-relaxed">
            {{ msg.content }}
          </p>

          <!-- AI -->
          <div v-else class="whitespace-pre-wrap leading-relaxed
             [&_h1]:mb-3 [&_h1]:text-xl [&_h1]:font-extrabold [&_h1]:text-neutral-900
             [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-neutral-900
             [&_h3]:mb-2 [&_h3]:font-bold [&_h3]:text-neutral-900
             [&_strong]:font-bold [&_strong]:text-neutral-950
             [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5
             [&_li]:mb-1" v-html="formatAIMessage(msg.content)" />
        </div>
      </div>

      <!-- Loading indicator -->
      <div v-if="isTyping" class="flex flex-col items-start animate-fade-in">
        <div class="bg-neutral-50 border border-neutral-100 rounded-[20px] rounded-tl-sm px-5 py-4">
          <div class="flex gap-1.5">
            <div class="w-2 h-2 bg-[var(--au-accent)]/60 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-[var(--au-accent)]/60 rounded-full animate-bounce" style="animation-delay: 0.15s">
            </div>
            <div class="w-2 h-2 bg-[var(--au-accent)]/60 rounded-full animate-bounce" style="animation-delay: 0.3s">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <form @submit.prevent="sendMessage" class="relative flex items-end gap-2">
      <div class="relative flex-1">
        <textarea v-model="inputQuery" rows="1" placeholder="e.g., Why did expenses increase last week?"
          class="w-full bg-neutral-50 border border-neutral-200/80 text-neutral-800 py-3.5 pl-5 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--au-accent)]/20 focus:border-[var(--au-accent)] focus:bg-white transition-all resize-none overflow-hidden block font-medium text-sm"
          @keydown.enter.prevent="sendMessage"></textarea>
        <button type="button"
          class="absolute right-3 bottom-2.5 p-1.5 text-neutral-400 hover:text-[var(--au-accent)] transition-colors"
          title="Voice input">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z">
            </path>
          </svg>
        </button>
      </div>
      <button type="submit" :disabled="!inputQuery.trim() || isTyping"
        class="bg-[var(--au-accent)] cursor-pointer hover:bg-[var(--au-accent-dark)] disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed text-white p-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center shrink-0 shadow-sm shadow-[var(--au-accent)]/10">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
          </path>
        </svg>
      </button>
    </form>

    <div class="mt-3 flex flex-wrap gap-2">
      <button @click="setInput('how is my business doing today?')"
        class="text-xs bg-neutral-50 hover:bg-[var(--au-accent-light)] text-neutral-600 hover:text-[var(--au-accent)] border border-neutral-100 px-3 py-1.5 rounded-full transition-colors font-bold">
        how is my business doing today?
      </button>
      <button @click="setInput('what can my business do to improve?')"
        class="text-xs bg-neutral-50 hover:bg-[var(--au-accent-light)] text-neutral-600 hover:text-[var(--au-accent)] border border-neutral-100 px-3 py-1.5 rounded-full transition-colors font-bold">
        what can my business do to improve?
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { io, Socket } from 'socket.io-client'

interface Message {
  role: 'user' | 'ai'
  content: string
}

const messages = ref<Message[]>([])
const inputQuery = ref('')
const isTyping = ref(false)
let socket: Socket | null = null

const setInput = (text: string) => {
  inputQuery.value = text
}

const formatAIMessage = (text: string) => {
  return text
    // Headings
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")

    // Bold
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Bullet points
    .replace(/^\* (.*)$/gm, "<li>$1</li>")
    .replace(/^- (.*)$/gm, "<li>$1</li>")

    // Wrap consecutive <li> in <ul>
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
    .replace(/<\/ul>\s*<ul>/g, "")

    // Line breaks
    .replace(/\n/g, "<br>");
};

onMounted(() => {
  const accessToken = localStorage.getItem('accessToken') || ''
  const host = import.meta.env.VITE_API_HOST || 'https://nombalens-backend.onrender.com' // fallback

  // Initialize Socket.IO client
  socket = io(host, {
    path: '/api/v1/ai/chat',
    auth: { token: accessToken },
    query: { token: accessToken },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket.on('connect_error', (err: any) => {
    console.error('Socket connection error:', err)
    isTyping.value = false
  })

  socket.on('ai', (data: { content?: string; message?: string }) => {
    isTyping.value = false
    if (data.content) {
      messages.value.push({ role: 'ai', content: data.content })
    } else if (data.message) {
      messages.value.push({ role: 'ai', content: `Error: ${data.message}` })
    }
  })

  clearChat()
})

const sendMessage = () => {
  const query = inputQuery.value.trim()
  if (!query || isTyping.value) return

  messages.value.push({ role: 'user', content: query })
  inputQuery.value = ''
  isTyping.value = true

  if (socket && socket.connected) {
    socket.emit('ai', { message: query })
  } else {
    console.warn('Socket not connected, falling back to local simulation')
    setTimeout(() => {
      isTyping.value = false
      messages.value.push({ role: 'ai', content: 'Connection error. Please try again.' })
    }, 500)
  }
}

const clearChat = () => {
  messages.value = []
  inputQuery.value = ''
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2eaf2;
  border-radius: 4px;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #cbd5e1;
}
</style>
