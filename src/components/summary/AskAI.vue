<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col mt-8">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-xl">
          💬
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-800">Ask AI</h3>
          <p class="text-sm text-gray-500">Ask any questions about your financial data</p>
        </div>
      </div>

      <!-- Clear Chat Button -->
      <button v-if="messages.length > 0" @click="clearChat"
        class="text-sm cursor-pointer font-medium text-gray-500 hover:text-red-500 bg-gray-50 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
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
        class="flex flex-col items-center justify-center h-full text-gray-400 italic opacity-80 animate-fade-in">
        <span class="text-3xl mb-2">✨</span>
        Ask a question to get started...
      </div>

      <!--  -->
      <div v-for="(msg, index) in messages" :key="index" class="flex flex-col animate-fade-in"
        :class="msg.role === 'user' ? 'items-end' : 'items-start'">
        <div class="max-w-[85%] rounded-2xl px-5 py-3 text-sm md:text-base" :class="msg.role === 'user'
          ? 'bg-purple-600 text-white rounded-tr-sm'
          : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-sm'
          ">
          <div v-if="msg.role === 'ai'" class="mb-2 flex items-center gap-2">
            <span class="text-xs font-bold text-purple-600">
              ✨ AI Assistant
            </span>
          </div>

          <!-- User -->
          <p v-if="msg.role === 'user'" class="whitespace-pre-wrap">
            {{ msg.content }}
          </p>

          <!-- AI -->
          <div v-else class="whitespace-pre-wrap leading-7
             [&_h1]:mb-3 [&_h1]:text-xl [&_h1]:font-bold
             [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold
             [&_h3]:mb-2 [&_h3]:font-semibold
             [&_strong]:font-semibold
             [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5
             [&_li]:mb-1" v-html="formatAIMessage(msg.content)" />
        </div>
      </div>
      <!--  -->

      <!-- Loading indicator -->
      <div v-if="isTyping" class="flex flex-col items-start animate-fade-in">
        <div class="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-4">
          <div class="flex gap-1.5">
            <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.15s"></div>
            <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.3s"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <form @submit.prevent="sendMessage" class="relative flex items-end gap-2">
      <div class="relative flex-1">
        <textarea v-model="inputQuery" rows="1" placeholder="e.g., Why did expenses increase last week?"
          class="w-full bg-gray-50 border border-gray-200 text-gray-800 py-3.5 pl-5 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all resize-none overflow-hidden block"
          @keydown.enter.prevent="sendMessage"></textarea>
        <button type="button"
          class="absolute right-3 bottom-2.5 p-1.5 text-gray-400 hover:text-purple-600 transition-colors"
          title="Voice input">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z">
            </path>
          </svg>
        </button>
      </div>
      <button type="submit" :disabled="!inputQuery.trim() || isTyping"
        class="bg-purple-600 cursor-pointer hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center shrink-0 shadow-sm">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
          </path>
        </svg>
      </button>
    </form>

    <div class="mt-3 flex flex-wrap gap-2">
      <button @click="setInput('What are my top selling items?')"
        class="text-xs bg-gray-50 hover:bg-purple-50 text-gray-600 hover:text-purple-700 border border-gray-100 px-3 py-1.5 rounded-full transition-colors">
        What are my top selling items?
      </button>
      <button @click="setInput('How can I reduce expenses?')"
        class="text-xs bg-gray-50 hover:bg-purple-50 text-gray-600 hover:text-purple-700 border border-gray-100 px-3 py-1.5 rounded-full transition-colors">
        How can I reduce expenses?
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

  // Load previous chat history
  // const loadHistory = async () => {
  //   try {
  //     const res = await fetch(`${host}/api/v1/ai/history?limit=50`, {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     })
  //     if (res.ok) {
  //       const json = await res.json()
  //       if (json.success && Array.isArray(json.data)) {
  //         // Map server response to Message format
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         messages.value = json.data.map((item: any) => ({
  //           role: item.role === 'assistant' ? 'ai' : 'user',
  //           // The API returns "message" for user and "content" for assistant
  //           content: (item.role === 'assistant' ? item.content : item.message) || '',
  //         }))
  //       }
  //     } else {
  //       console.warn('Failed to fetch chat history', res.status)
  //     }
  //   } catch (e) {
  //     console.error('Error fetching chat history', e)
  //   }
  // }

  // loadHistory()

  // Initialize Socket.IO client
  socket = io(host, {
    path: '/api/v1/ai/chat',
    auth: { token: accessToken },
    // fallback query token if needed
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
      // handle error messages gracefully
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
    // Optional fallback simulation
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
  background: #e5e7eb;
  border-radius: 4px;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #d1d5db;
}
</style>
