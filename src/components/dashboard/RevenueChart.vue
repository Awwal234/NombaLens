<template>
  <div class="rounded-[24px] border border-[var(--au-border)] bg-white p-6 shadow-sm">
    <!-- Header -->
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <!-- Tabs matching Figma -->
      <div class="flex border-b border-neutral-100 pb-1 gap-6 flex-1">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="pb-3 text-sm font-semibold tracking-tight transition relative cursor-pointer"
          :class="activeTab === tab ? 'text-[var(--au-text-primary)]' : 'text-neutral-400 hover:text-neutral-600'"
        >
          {{ tab }}
          <div
            v-if="activeTab === tab"
            class="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--au-accent)] rounded-full"
          />
        </button>
      </div>

      <!-- Duration Dropdown -->
      <div class="flex items-center gap-2 rounded-xl bg-neutral-50 border border-neutral-200/60 px-4 py-2 text-xs font-semibold text-neutral-600 cursor-pointer self-start">
        Duration
        <ChevronDown :size="14" />
      </div>
    </div>

    <!-- Chart Details Summary -->
    <div class="mb-6">
      <p class="text-xs font-bold text-neutral-400 uppercase tracking-wider">
        Total Revenue
      </p>
      <div class="flex items-baseline gap-3 mt-1">
        <h2 class="text-3xl font-extrabold text-neutral-900">
          {{ total }}
        </h2>
        <span class="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
          <TrendingUp :size="12" />
          {{ growth }}% this month
        </span>
      </div>
    </div>

    <!-- The Chart -->
    <div class="overflow-hidden">
      <VueApexCharts type="area" height="320" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import { TrendingUp, ChevronDown } from "lucide-vue-next";

interface Props {
  total: string;
  growth: number;
  data: number[];
  categories: string[];
}

const props = defineProps<Props>();

const tabs = ["Wallet", "Card Transaction", "Investment"];
const activeTab = ref("Wallet");

const series = computed(() => [
  {
    name: "Revenue",
    data: props.data,
  },
]);

const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    fontFamily: "Inter Tight, sans-serif",
  },

  stroke: {
    curve: "smooth",
    width: 3.5,
  },

  colors: ["#2CA5D6"],

  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.25,
      opacityTo: 0.01,
      shadeIntensity: 0.5,
    },
  },

  grid: {
    borderColor: "#EFF3F8",
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },

  xaxis: {
    categories: props.categories,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: "#94A3B8",
        fontWeight: 500,
      }
    }
  },

  yaxis: {
    labels: {
      style: {
        colors: "#94A3B8",
        fontWeight: 500,
      },
      formatter(value: number) {
        if (value >= 1000) {
          return `₦${(value / 1000).toFixed(0)}k`;
        }
        return `₦${value}`;
      },
    },
  },

  tooltip: {
    theme: "light",
    y: {
      formatter(value: number) {
        return `₦${value.toLocaleString()}`;
      },
    },
  },

  legend: {
    show: false,
  },
}));
</script>
