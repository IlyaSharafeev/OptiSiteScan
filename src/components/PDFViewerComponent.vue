<template>
  <div>
    <!-- Кнопки для работы с PDF -->
    <button @click="generatePDF(pdfData[0])">Сгенерировать PDF</button>
    <button @click="downloadPdf" :disabled="!pdfSrc">Скачать PDF</button>
  </div>
</template>

<script setup>
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Chart } from "chart.js";
import {computed, onMounted, ref} from 'vue';
import {useSearchStore} from "@/stores/main";

const searchStore = useSearchStore();
const pdfSrc = ref(null);

const pdfData = computed(() => searchStore.searchData);
onMounted(async () => {
  await searchStore.getSearchData();
})

let doc = new jsPDF();

const generatePDF = async (data) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.setTextColor(60, 142, 185);
  doc.text("Отчет о производительности", 10, 10);

  // Общий обзор
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text('Общий Обзор', 10, 20);
  doc.setFontSize(10);
  doc.text(`Запрошенный URL: ${data.lighthouseResult.requestedUrl}`, 10, 30);
  doc.text(`Финальный URL: ${data.lighthouseResult.finalUrl}`, 10, 35);
  doc.text(`Версия Lighthouse: ${data.lighthouseResult.lighthouseVersion}`, 10, 40);
  doc.text(`Время выполнения запроса: ${data.lighthouseResult.fetchTime}`, 10, 45);

  // Детали отчета (пример с таблицей аудитов)
  doc.setFontSize(12);
  doc.setTextColor(60, 142, 185);
  doc.text('Детали Отчета', 10, 60);

  // Создание таблицы аудитов
  const auditTableData = Object.values(data.lighthouseResult.audits).map(audit => [
    audit.title,
    audit.score,
    audit.displayValue || 'N/A'
  ]);

  autoTable(doc, {
    startY: 65,
    head: [['Audit', 'Score', 'Value']],
    body: auditTableData,
    styles: { fontSize: 8, cellPadding: 1, textColor: 50 }
  });

  // Генерация графиков (пример)
  // Примечание: Генерация графиков в PDF может быть сложной. Обычно это включает рендеринг графика в канвас, а затем преобразование его в изображение для вставки в PDF.

  const chartCanvas = document.createElement('canvas');
  chartCanvas.width = 400;
  chartCanvas.height = 200;
  const ctx = chartCanvas.getContext('2d');

  // Создаем график
  new Chart(ctx, {
    type: 'bar', // Тип графика
    data: {
      labels: auditTableData.map(item => item[0]), // Названия аудитов
      datasets: [{
        label: 'Audit Score',
        data: auditTableData.map(item => item[1]), // Значения аудитов
        backgroundColor: 'rgba(60, 142, 185, 0.5)'
      }]
    },
    options: {
      scales: {
        yAxes: [{ ticks: { beginAtZero: true } }]
      }
    }
  });

  // Конвертируем канвас в изображение и добавляем в PDF
  // const chartImage = chartCanvas.toDataURL('image/png');
  // doc.addImage(chartImage, 'PNG', 10, doc.autoTable.previous.finalY + 10, 190, 80);
};

const downloadPdf = () => {
  if (pdfSrc.value) {
    const link = document.createElement('a');
    link.href = pdfSrc.value;
    link.download = 'report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
</script>