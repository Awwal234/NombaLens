<template>
  <div class="rounded-[30px] border border-[#ECE6E2] bg-white p-6 shadow-sm">
    <!-- Header -->
    <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm text-neutral-500">
          Revenue Analytics
        </p>

        <h2 class="mt-2 text-3xl font-bold">
          {{ total }}
        </h2>

        <div
          class="mt-2 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
          <TrendingUp :size="16" />

          {{ growth }}%

          <span class="font-normal text-neutral-500">
            this month
          </span>
        </div>
      </div>

      <!-- Filters -->

      <div class="flex rounded-2xl bg-[#F7F4F2] p-1">
        <button v-for="item in filters" :key="item" @click="activeFilter = item"
          class="rounded-xl px-4 py-2 text-sm font-medium transition" :class="activeFilter === item
            ? 'bg-white shadow'
            : 'text-neutral-500'
            ">
          {{ item }}
        </button>
      </div>
    </div>

    <VueApexCharts type="area" height="360" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import { TrendingUp } from "lucide-vue-next";

interface Props {
  total: string;
  growth: number;
  data: number[];
  categories: string[];
}

const props = defineProps<Props>();

const filters = ["7D", "30D", "90D", "1Y"];

const activeFilter = ref("30D");

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
    fontFamily: "Inter",
  },

  stroke: {
    curve: "smooth",
    width: 4,
  },

  colors: ["#7A003C"],

  fill: {
    type: "gradient",

    gradient: {
      opacityFrom: 0.35,
      opacityTo: 0.02,
    },
  },

  grid: {
    borderColor: "#F1ECE8",
  },

  xaxis: {
    categories: props.categories,

    axisBorder: {
      show: false,
    },

    axisTicks: {
      show: false,
    },
  },

  yaxis: {
    labels: {
      formatter(value: number) {
        return `₦${value / 1000}k`;
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
