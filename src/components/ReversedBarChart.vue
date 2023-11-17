<template>
  <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
</template>

<script setup>
import { ref } from 'vue';
import ApexCharts from 'vue3-apexcharts';

const series = ref([{
  data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
}]);

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
    reversed: true,
    toolbar: {
      show: true
    }
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany']
  }
});
</script>

