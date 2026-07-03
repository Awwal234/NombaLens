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
      <button 
        v-if="messages.length > 0"
        @click="clearChat"
        class="text-sm font-medium text-gray-500 hover:text-red-500 bg-gray-50 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
        title="Clear conversation"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        <span class="hidden sm:inline">Clear Chat</span>
      </button>
    </div>

    <!-- Chat History -->
    <div class="flex-1 min-h-[200px] max-h-[400px] overflow-y-auto mb-6 space-y-4 pr-2 custom-scrollbar">
      <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-gray-400 italic opacity-80 animate-fade-in">
        <span class="text-3xl mb-2">✨</span>
        Ask a question to get started...
      </div>
      
      <div v-for="(msg, index) in messages" :key="index" class="flex flex-col animate-fade-in" :class="msg.role === 'user' ? 'items-end' : 'items-start'">
        <div 
          class="max-w-[85%] rounded-2xl px-5 py-3 text-sm md:text-base"
          :class="msg.role === 'user' 
            ? 'bg-purple-600 text-white rounded-tr-sm' 
            : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-sm'"
        >
          <div v-if="msg.role === 'ai'" class="flex items-center gap-2 mb-1">
            <span class="text-xs font-bold text-purple-600">✨ AI Assistant</span>
          </div>
          {{ msg.content }}
        </div>
      </div>
      
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
        <textarea 
          v-model="inputQuery"
          rows="1"
          placeholder="e.g., Why did expenses increase last week?"
          class="w-full bg-gray-50 border border-gray-200 text-gray-800 py-3.5 pl-5 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all resize-none overflow-hidden block"
          @keydown.enter.prevent="sendMessage"
        ></textarea>
        <button 
          type="button"
          class="absolute right-3 bottom-2.5 p-1.5 text-gray-400 hover:text-purple-600 transition-colors"
          title="Voice input"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
        </button>
      </div>
      <button 
        type="submit" 
        :disabled="!inputQuery.trim() || isTyping"
        class="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center shrink-0 shadow-sm"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
      </button>
    </form>
    
    <div class="mt-3 flex flex-wrap gap-2">
      <button @click="setInput('What are my top selling items?')" class="text-xs bg-gray-50 hover:bg-purple-50 text-gray-600 hover:text-purple-700 border border-gray-100 px-3 py-1.5 rounded-full transition-colors">
        What are my top selling items?
      </button>
      <button @click="setInput('How can I reduce expenses?')" class="text-xs bg-gray-50 hover:bg-purple-50 text-gray-600 hover:text-purple-700 border border-gray-100 px-3 py-1.5 rounded-full transition-colors">
        How can I reduce expenses?
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Message {
  role: 'user' | 'ai'
  content: string
}

const messages = ref<Message[]>([])
const inputQuery = ref('')
const isTyping = ref(false)

const setInput = (text: string) => {
  inputQuery.value = text
}

const sendMessage = () => {
  const query = inputQuery.value.trim()
  if (!query || isTyping.value) return
  
  messages.value.push({ role: 'user', content: query })
  inputQuery.value = ''
  isTyping.value = true
  
  // Simulate AI response
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({ 
      role: 'ai', 
      content: `Based on your data, ${query.toLowerCase().includes('expenses') ? 'your highest expenses are currently logistics and software subscriptions.' : 'your top selling item is Electronics, accounting for 35% of revenue.'}` 
    })
  }, 1500)
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
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
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
