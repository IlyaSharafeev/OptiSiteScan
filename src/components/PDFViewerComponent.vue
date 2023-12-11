<template>
  <div class="pdf-buttons-container">
    <button class="button-82-pushable" @click="generatePDF(pdfData[0])" role="button">
      <span class="button-82-shadow"></span>
      <span class="button-82-edge"></span>
      <span class="button-82-front text">
         Create a PDF
      </span>
    </button>

    <button class="button-82-pushable" @click="sendPDF" v-if="pdfFormData" :disabled="!pdfSrc" role="button">
      <span class="button-82-shadow"></span>
      <span class="button-82-edge"></span>
      <span class="button-82-front text">
         Get pdf in the email
      </span>
    </button>

    <button class="button-82-pushable" @click="sharePDF" v-if="savedFile" :disabled="!pdfSrc" role="button">
      <span class="button-82-shadow"></span>
      <span class="button-82-edge"></span>
      <span class="button-82-front text">
         Share PDF
      </span>
    </button>

    <button class="button-82-pushable" @click="openPDF" v-if="savedFile" :disabled="!pdfSrc" role="button">
      <span class="button-82-shadow"></span>
      <span class="button-82-edge"></span>
      <span class="button-82-front text">
    Open PDF
  </span>
    </button>

    <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        :duration="2000"
        @didDismiss="() => showToast = false">
    </ion-toast>
  </div>
</template>

<script setup>
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";
import {computed, onMounted, ref} from 'vue';
import {useSearchStore} from "@/stores/main";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import {IonToast} from "@ionic/vue";
import { LocalNotifications } from '@capacitor/local-notifications';
import {Share} from "@capacitor/share";
import { FileOpener } from '@awesome-cordova-plugins/file-opener';

const searchStore = useSearchStore();
const pdfSrc = ref(null);
const pdfFormData = ref(null);
const savedFile = ref(null);
const showToast = ref(false);
const toastMessage = ref("");

const pdfData = computed(() => searchStore.searchData);
onMounted(async () => {
  await searchStore.getSearchData();
})

const generatePDF = async (data) => {
  console.log("click on generatePDF");
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


  const chartCanvas = document.createElement('canvas');
  chartCanvas.width = 400;
  chartCanvas.height = 200;
  const ctx = chartCanvas.getContext('2d');


  const pdfOutput = doc.output(); // Получаем PDF как строку
  const blobString = new Blob([pdfOutput], { type: 'application/pdf' });
  pdfSrc.value = blobString;

  toastMessage.value = "PDF has been generate!";
  showToast.value = true;

  pdfFormData.value = new FormData();
  pdfFormData.value.append('file', doc.output("blob"), 'report.pdf');

  if (Capacitor.isNativePlatform()) {
    // Преобразование pdfSrc.value в Blob
    const blob = new Blob([pdfSrc.value], { type: 'application/pdf' });

    // Получаем данные Blob в формате base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1];

      // Сохраняем PDF во временной директории
      savedFile.value = await Filesystem.writeFile({
        path: 'report.pdf',
        data: base64Data,
        directory: Directory.Documents
      });

      // Опционально: уведомление о завершении скачивания
      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Download Complete",
            body: "Your PDF has been downloaded.",
            id: 1,
            schedule: { at: new Date(Date.now() + 1000 * 5) }, // 5 секунд после загрузки
          }
        ]
      });
    };

    reader.readAsDataURL(blob);
  } else {
    // Для веб-браузера
    const url = window.URL.createObjectURL(new Blob([pdfSrc.value], { type: 'application/pdf' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }
};

const sharePDF = async () => {
  // Использование Share API для открытия файла в системном пикере
  await Share.share({
    title: 'Download PDF',
    url: savedFile.value.uri,
    dialogTitle: 'Save PDF'
  });
}

const openPDF = async (filePath, fileMIMEType) => {
  if (Capacitor.isNativePlatform() && savedFile.value) {
    try {
      await FileOpener.open(savedFile.value.uri, 'application/pdf');
    } catch (error) {
      console.error('Error opening PDF:', error);
      toastMessage.value = "Unable to open PDF";
      showToast.value = true;
    }
  }
};

const sendPDF = async () => {
  if (pdfFormData.value) {
    for (let [key, value] of pdfFormData.value.entries()) {
      await searchStore.sendPDF(value); // Отправка FormData
    }
    console.log("Отправка PDF");
    toastMessage.value = "PDF has been sent!";
    showToast.value = true;
  } else {
    console.log("PDF не сгенерирован");
  }
};
</script>

<style scoped>
.pdf-buttons-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin: 30px 20px;
  flex-direction: column;
  gap: 40px;
}

.pdf-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  color: var(--ion-text-color);
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  justify-content: center;
  box-shadow: rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px;
}

.pdf-button i {
  margin-right: 5px;
}

.pdf-button.generate {
}

.pdf-button.download {
}

.pdf-button.send {
}

.pdf-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.button-82-pushable {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-82-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
}

.button-82-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
      to left,
      hsl(340deg 100% 16%) 0%,
      hsl(340deg 100% 32%) 8%,
      hsl(340deg 100% 32%) 92%,
      hsl(340deg 100% 16%) 100%
  );
}

.button-82-front {
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background: hsl(345deg 100% 47%);
  will-change: transform;
  transform: translateY(-4px);
  transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
}

@media (min-width: 768px) {
  .button-82-front {
    font-size: 1.25rem;
    padding: 12px 42px;
  }
}

.button-82-pushable:hover {
  filter: brightness(110%);
  -webkit-filter: brightness(110%);
}

.button-82-pushable:hover .button-82-front {
  transform: translateY(-6px);
  transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
}

.button-82-pushable:active .button-82-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.button-82-pushable:hover .button-82-shadow {
  transform: translateY(4px);
  transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
}

.button-82-pushable:active .button-82-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.button-82-pushable:focus:not(:focus-visible) {
  outline: none;
}
</style>
