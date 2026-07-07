<template>
  <Transition name="slide-fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-end overflow-hidden" role="dialog" aria-modal="true">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity" @click="close" />

      <!-- Drawer Content -->
      <div
        class="relative w-full max-w-lg bg-white h-full flex flex-col shadow-2xl transition-transform duration-300 border-l border-neutral-100 md:rounded-l-[0px] overflow-hidden">
        <!-- Close Button (Absolute for quick touch) -->
        <button @click="close"
          class="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition cursor-pointer">
          <X :size="20" />
        </button>

        <!-- Drawer Header -->
        <!-- <span>💸</span> -->
        <div class="p-6 md:p-8 border-b border-neutral-100 bg-gradient-to-br from-white to-[var(--au-accent-light)]/20">
          <h2 class="text-2xl font-black text-neutral-900 tracking-tight flex items-center gap-2">
            Send Money
          </h2>
          <p class="text-xs font-semibold text-neutral-500 mt-1">
            Securely send funds from your sub-account balance.
          </p>
        </div>

        <!-- Scrollable Form Container -->
        <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          <!-- Step 1: Active Form state checks -->
          <div v-if="txStatus === 'IDLE'">
            <!-- Transfer Type Selection -->
            <div class="grid grid-cols-2 p-1 bg-neutral-50 rounded-xl border border-neutral-200/50 mb-6">
              <button @click="transferType = 'bank'"
                class="py-2.5 text-xs font-bold rounded-lg transition cursor-pointer"
                :class="transferType === 'bank' ? 'bg-white text-[var(--au-accent)] shadow-sm' : 'text-neutral-500 hover:text-neutral-700'">
                Bank Account
              </button>
              <button @click="transferType = 'wallet'"
                class="py-2.5 text-xs font-bold rounded-lg transition cursor-pointer"
                :class="transferType === 'wallet' ? 'bg-white text-[var(--au-accent)] shadow-sm' : 'text-neutral-500 hover:text-neutral-700'">
                Nomba Wallet
              </button>
            </div>

            <!-- Error Banner -->
            <div v-if="errorMsg"
              class="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-red-700 text-xs font-semibold">
              <AlertCircle :size="16" class="shrink-0 mt-0.5" />
              <span>{{ errorMsg }}</span>
            </div>

            <form @submit.prevent="submitTransfer" class="space-y-5">
              <!-- BANK TRANSFER FORM -->
              <div v-if="transferType === 'bank'" class="space-y-5">
                <!-- Select Bank -->
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold uppercase tracking-wider text-neutral-500">Destination
                    Bank</label>
                  <div class="relative">
                    <select v-model="form.bankCode"
                      class="w-full appearance-none bg-neutral-50 border border-neutral-200/80 text-neutral-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--au-accent)]/20 focus:border-[var(--au-accent)] transition-all font-semibold text-sm"
                      @change="onBankOrAccountChange">
                      <option value="" disabled>Select recipient bank</option>
                      <option v-if="banksList.length === 0 && !isBanksLoading" value="" disabled>
                        No banks available right now
                      </option>
                      <option class="text-black" v-for="bank in banksList" :key="bank.code || bank.name"
                        :value="bank.code">
                        {{ bank.name }}
                      </option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                      <ChevronDown :size="16" />
                    </div>
                  </div>
                </div>

                <!-- Account Number -->
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold uppercase tracking-wider text-neutral-500">Account
                    Number</label>
                  <div class="relative">
                    <input v-model="form.accountNumber" type="text" inputmode="numeric" maxlength="10"
                      placeholder="Enter 10-digit account number"
                      class="w-full bg-neutral-50 border border-neutral-200/80 text-neutral-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--au-accent)]/20 focus:border-[var(--au-accent)] transition-all font-semibold text-sm"
                      @input="onAccountNumberInput" />
                    <div v-if="isLookupLoading" class="absolute right-3.5 top-3 flex items-center">
                      <svg class="animate-spin h-5 w-5 text-[var(--au-accent)]" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Verified Account Name Display -->
                <div v-if="form.accountName || lookupError" class="mt-2">
                  <div v-if="form.accountName"
                    class="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-bold">
                    <CheckCircle :size="14" class="text-emerald-600 shrink-0" />
                    <span>Recipient: {{ form.accountName }}</span>
                  </div>
                  <div v-else-if="lookupError"
                    class="p-3 bg-amber-50/70 border border-amber-100 rounded-xl flex items-center gap-2 text-amber-800 text-xs font-bold">
                    <AlertTriangle :size="14" class="text-amber-500 shrink-0" />
                    <span>{{ lookupError }}</span>
                  </div>
                </div>
              </div>

              <!-- WALLET TRANSFER FORM -->
              <div v-else class="space-y-5">
                <!-- Wallet ID -->
                <div class="space-y-1.5">
                  <label class="block text-xs font-bold uppercase tracking-wider text-neutral-500">Receiver Wallet ID
                    (UUID)</label>
                  <input v-model="form.receiverAccountId" type="text" placeholder="Enter recipient wallet ID"
                    class="w-full bg-neutral-50 border border-neutral-200/80 text-neutral-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--au-accent)]/20 focus:border-[var(--au-accent)] transition-all font-semibold text-sm" />
                </div>
              </div>

              <!-- General Inputs: Amount & Narration -->
              <div class="space-y-1.5">
                <label class="block text-xs font-bold uppercase tracking-wider text-neutral-500">Amount (₦)</label>
                <div class="relative">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-neutral-400 text-sm">
                    ₦
                  </div>
                  <input v-model="form.amount" type="number" step="any" placeholder="0.00"
                    class="w-full bg-neutral-50 border border-neutral-200/80 text-neutral-800 py-3 pl-8 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--au-accent)]/20 focus:border-[var(--au-accent)] transition-all font-bold text-sm" />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-bold uppercase tracking-wider text-neutral-500">Narration
                  (Optional)</label>
                <input v-model="form.narration" type="text" placeholder="e.g. Payment for supplies"
                  class="w-full bg-neutral-50 border border-neutral-200/80 text-neutral-800 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--au-accent)]/20 focus:border-[var(--au-accent)] transition-all font-semibold text-sm" />
              </div>

              <!-- Submit button -->
              <div class="pt-4">
                <button type="submit" :disabled="isSubmitting || !isFormValid"
                  class="w-full py-3.5 bg-[var(--au-accent)] disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed hover:bg-[var(--au-accent-dark)] text-white font-bold rounded-xl shadow-md shadow-[var(--au-accent)]/15 transition flex items-center justify-center gap-2 cursor-pointer text-sm">
                  <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  <span v-else>Confirm & Send Money</span>
                </button>
              </div>
            </form>
          </div>

          <!-- SUCCESS RESULT SCREEN -->
          <div v-else-if="txStatus === 'SUCCESS'"
            class="flex flex-col items-center text-center space-y-6 py-8 animate-fade-in">
            <div
              class="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl shadow-sm border border-emerald-100">
              ✓
            </div>
            <div>
              <h3 class="text-xl font-black text-neutral-900 tracking-tight">Transfer Successful!</h3>
              <p class="text-xs text-neutral-500 font-semibold mt-1">Your funds have been transferred successfully.</p>
            </div>

            <!-- Receipt Card Details -->
            <div
              class="w-full bg-neutral-50 border border-neutral-200/50 rounded-2xl p-5 text-left text-xs space-y-3 font-semibold">
              <div class="flex justify-between border-b border-neutral-100 pb-2">
                <span class="text-neutral-400">Transaction ID</span>
                <span class="text-neutral-800 select-all">{{ txResult?.id || 'N/A' }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-100 pb-2" v-if="transferType === 'bank'">
                <span class="text-neutral-400">Recipient Bank</span>
                <span class="text-neutral-800">{{ txResult?.bankName || '-' }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-100 pb-2" v-if="transferType === 'bank'">
                <span class="text-neutral-400">Recipient Account</span>
                <span class="text-neutral-800">{{ txResult?.accountNumber || '-' }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-100 pb-2" v-if="transferType === 'bank'">
                <span class="text-neutral-400">Recipient Name</span>
                <span class="text-neutral-800">{{ txResult?.recipientName || form.accountName || '-' }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-100 pb-2">
                <span class="text-neutral-400">Amount Sent</span>
                <span class="text-neutral-800 text-sm font-black">₦{{ (Number(txResult?.amount) / 100).toLocaleString()
                  }}</span>
              </div>
              <div class="flex justify-between border-b border-neutral-100 pb-2">
                <span class="text-neutral-400">Transaction Fee</span>
                <span class="text-neutral-800">₦{{ (Number(txResult?.fee || 0) / 100).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between pb-1">
                <span class="text-neutral-400">Reference</span>
                <span class="text-neutral-800 select-all">{{ txResult?.merchantTxRef || '-' }}</span>
              </div>
            </div>

            <button @click="resetDrawer"
              class="w-full py-3 bg-[var(--au-accent)] hover:bg-[var(--au-accent-dark)] text-white font-bold rounded-xl transition cursor-pointer text-sm">
              Done & Close
            </button>
          </div>

          <!-- PENDING RESULT SCREEN -->
          <div v-else-if="txStatus === 'PENDING_BILLING'"
            class="flex flex-col items-center text-center space-y-6 py-8 animate-fade-in">
            <div
              class="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-3xl shadow-sm border border-amber-100">
              ⚡
            </div>
            <div>
              <h3 class="text-xl font-black text-neutral-900 tracking-tight">Transfer Processing</h3>
              <p class="text-xs text-neutral-500 font-semibold mt-1">Your transfer request is being processed
                asynchronously.</p>
            </div>

            <div
              class="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2.5 text-left text-amber-800 text-xs font-semibold">
              <Info :size="16" class="shrink-0 mt-0.5" />
              <span>We're awaiting completion from Nomba systems. The final result will be updated via backend webhook.
                You can close this drawer safely.</span>
            </div>

            <!-- Receipt Details -->
            <div
              class="w-full bg-neutral-50 border border-neutral-200/50 rounded-2xl p-5 text-left text-xs space-y-3 font-semibold">
              <div class="flex justify-between border-b border-neutral-100 pb-2">
                <span class="text-neutral-400">Status</span>
                <span class="text-amber-600 font-bold uppercase">Pending Billing</span>
              </div>
              <div class="flex justify-between border-b border-neutral-100 pb-2">
                <span class="text-neutral-400">Amount Request</span>
                <span class="text-neutral-800 font-black">₦{{ (Number(txResult?.amount) / 100).toLocaleString()
                  }}</span>
              </div>
              <div class="flex justify-between pb-1">
                <span class="text-neutral-400">Reference Key</span>
                <span class="text-neutral-800 select-all">{{ txResult?.merchantTxRef || '-' }}</span>
              </div>
            </div>

            <button @click="resetDrawer"
              class="w-full py-3 bg-[var(--au-accent)] hover:bg-[var(--au-accent-dark)] text-white font-bold rounded-xl transition cursor-pointer text-sm">
              Done & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { X, ChevronDown, CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-vue-next";
import { transfersService, type Bank, type TransferResponse } from "@/services/transfers";

const emit = defineEmits(["close", "success"]);

const props = defineProps<{
  isOpen: boolean
}>();

const transferType = ref<"bank" | "wallet">("bank");
const banksList = ref<Bank[]>([]);
const isBanksLoading = ref(false);
const isLookupLoading = ref(false);
const isSubmitting = ref(false);
const lookupError = ref("");
const errorMsg = ref("");

// Transfer Status: 'IDLE' | 'SUCCESS' | 'PENDING_BILLING'
const txStatus = ref<"IDLE" | "SUCCESS" | "PENDING_BILLING">("IDLE");
const txResult = ref<TransferResponse | null>(null);

const form = ref({
  bankCode: "",
  accountNumber: "",
  accountName: "",
  receiverAccountId: "",
  amount: "",
  narration: ""
});

// Watch to reset details when drawer opens/closes
watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    resetForm();
    await fetchBanks();
  }
});

// Reset form to initial state
const resetForm = () => {
  form.value = {
    bankCode: "",
    accountNumber: "",
    accountName: "",
    receiverAccountId: "",
    amount: "",
    narration: ""
  };
  lookupError.value = "";
  errorMsg.value = "";
  txStatus.value = "IDLE";
  txResult.value = null;
};

// Reset & Close Drawer helper
const resetDrawer = () => {
  resetForm();
  emit("close");
};

const close = () => {
  emit("close");
};

// Fetch Banks List
const fetchBanks = async () => {
  if (banksList.value.length > 0) return;
  isBanksLoading.value = true;
  try {
    const banks = await transfersService.getBanks();
    banksList.value = Array.isArray(banks) ? banks : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Failed fetching banks:", err);
    banksList.value = [];
    errorMsg.value = "Could not load bank listings. Please try again.";
  } finally {
    isBanksLoading.value = false;
  }
};

// Trigger bank account name lookup
const performLookup = async () => {
  if (form.value.accountNumber.length !== 10 || !form.value.bankCode) {
    form.value.accountName = "";
    lookupError.value = "";
    return;
  }
  isLookupLoading.value = true;
  lookupError.value = "";
  form.value.accountName = "";

  try {
    const res = await transfersService.bankLookup(form.value.accountNumber, form.value.bankCode);
    form.value.accountName = res.accountName || "";
    if (!form.value.accountName) {
      lookupError.value = "We couldn’t resolve the account name for this number.";
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Lookup failed:", err);
    form.value.accountName = "";
    lookupError.value = err.message || "Failed to lookup account number.";
  } finally {
    isLookupLoading.value = false;
  }
};

// Listen to account number inputs
const onAccountNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  // Clean all non-numbers
  form.value.accountNumber = target.value.replace(/\D/g, "");
  if (form.value.accountNumber.length === 10) {
    performLookup();
  } else {
    form.value.accountName = "";
    lookupError.value = "";
  }
};

const onBankOrAccountChange = () => {
  if (form.value.accountNumber.length === 10) {
    performLookup();
  }
};

// Validation Checks
const isFormValid = computed(() => {
  const amt = parseFloat(form.value.amount);
  if (isNaN(amt) || amt <= 0) return false;

  if (transferType.value === "bank") {
    return (
      form.value.bankCode !== "" &&
      form.value.accountNumber.length === 10 &&
      form.value.accountName !== ""
    );
  } else {
    return form.value.receiverAccountId.trim() !== "";
  }
});

// Idempotency Key Helper
const generateMerchantTxRef = (): string => {
  const timestamp = Date.now();
  const rand = Math.random().toString(36).substring(2, 6);
  return `txn-${timestamp}-${rand}`;
};

// Submit Transfer logic
const submitTransfer = async () => {
  if (!isFormValid.value || isSubmitting.value) return;
  isSubmitting.value = true;
  errorMsg.value = "";

  const refKey = generateMerchantTxRef();
  const koboAmount = Math.round(parseFloat(form.value.amount));

  try {
    let result: TransferResponse;
    if (transferType.value === "bank") {
      result = await transfersService.bankTransferSubAccount({
        amount: koboAmount,
        accountNumber: form.value.accountNumber,
        accountName: form.value.accountName,
        bankCode: form.value.bankCode,
        merchantTxRef: refKey,
        narration: form.value.narration || undefined
      });
    } else {
      result = await transfersService.walletTransferSubAccount({
        amount: koboAmount,
        receiverAccountId: form.value.receiverAccountId.trim(),
        merchantTxRef: refKey,
        narration: form.value.narration || undefined
      });
    }

    txResult.value = result;
    if (result.status === "SUCCESS") {
      txStatus.value = "SUCCESS";
      emit("success");
    } else if (result.status === "PENDING_BILLING") {
      txStatus.value = "PENDING_BILLING";
      emit("success");
    } else {
      txStatus.value = "SUCCESS";
      emit("success");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Transfer submission failed:", err);
    errorMsg.value = err.message || "An error occurred while initiating the transfer.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* slide-fade transition for sidebar drawer slide in from right */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.25s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-from .relative,
.slide-fade-leave-to .relative {
  transform: translateX(100%);
}

@media (max-width: 768px) {

  .slide-fade-enter-from .relative,
  .slide-fade-leave-to .relative {
    transform: translateY(100%);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
