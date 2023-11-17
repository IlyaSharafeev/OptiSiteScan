<template>
  <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup>
import { ref } from 'vue';

const series = ref([44, 55, 41, 17, 15]);
const chartOptions = ref({
  chart: {
    type: 'donut',
  },
  labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
  // Другие настройки графика...
});
</script>
