<template>
  <ion-page>
    <canvas ref="chartRef"></canvas>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import {
  IonPage,
} from '@ionic/vue';
Chart.register(...registerables);

const chartRef = ref(null);
let myChart = null;

onMounted(() => {
  const ctx = chartRef.value.getContext('2d');
  myChart = new Chart(ctx, {
    type: 'line', // Тип графика
    data: {
      labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'], // Метки оси X
      datasets: [{
        label: 'Продажи за 2023 год',
        data: [150, 200, 180, 220, 260, 300], // Данные графика
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Цвет заливки точек
        borderColor: 'rgba(54, 162, 235, 1)', // Цвет линии
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true // Начало оси Y от нуля
        }
      }
    }
  });
});
</script>
