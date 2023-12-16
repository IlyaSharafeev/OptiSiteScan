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
import {Chart} from "chart.js";

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

const checkNotificationPermission = async () => {
  const permission = await LocalNotifications.requestPermissions();

  if (permission.display === 'granted') {
    return true;
  } else {
    toastMessage.value = "Notifications permission not granted";
    showToast.value = true;
    return false;
  }
};

const generatePDF = async (data) => {
  console.log(data);
  const hasPermission = await checkNotificationPermission();
  if (!hasPermission) {
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setTextColor(60, 142, 185);
  doc.text("Performance report", 10, 10);

  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text('General Overview', 10, 20);
  doc.setFontSize(10);
  doc.text(`Requested URL: ${data.lighthouseResult.requestedUrl}`, 10, 30);
  doc.text(`Final URL: ${data.lighthouseResult.finalUrl}`, 10, 35);
  doc.text(`Lighthouse version: ${data.lighthouseResult.lighthouseVersion}`, 10, 40);
  doc.text(`Request fulfilment time: ${data.lighthouseResult.fetchTime}`, 10, 45);

  doc.setFontSize(12);
  doc.setTextColor(60, 142, 185);
  doc.text('Details of the Report', 10, 60);

  const auditTableData = Object.values(data.lighthouseResult.audits).map(audit => {
    const score = audit.score ? (audit.score * 100).toFixed(0) + '%' : 'N/A';
    let scoreStyle = { textColor: 50 };

    const title = doc.splitTextToSize(audit.title, 180);
    const value = audit.displayValue ? doc.splitTextToSize(audit.displayValue, 180) : 'N/A';

    if (audit.score >= 0.9) {
      scoreStyle = { textColor: [1, 50, 32] };
    } else if (audit.score >= 0.5) {
      scoreStyle = { textColor: [255, 140, 0] };
    } else if (audit.score != null) {
      scoreStyle = { textColor: [244, 67, 54] };
    }

    return [
      { content: title, styles: { textColor: 50 } },
      { content: score, styles: scoreStyle },
      { content: value, styles: { textColor: 50 } }
    ];
  });

  autoTable(doc, {
    startY: 65,
    head: [['Audit', 'Score (%)', 'Value']],
    body: auditTableData,
    theme: 'grid',
    headStyles: { fillColor: [60, 142, 185], textColor: 255, fontStyle: 'bold' },
    bodyStyles: { fillColor: [240, 240, 240] },
    alternateRowStyles: { fillColor: [220, 220, 220] },
    styles: { cellPadding: 2, fontSize: 10 }
  });

  const chartCanvas = document.createElement('canvas');
  chartCanvas.width = 400;
  chartCanvas.height = 200;
  const ctx = chartCanvas.getContext('2d');

  const pdfOutput = doc.output();
  const blobString = new Blob([pdfOutput], {type: 'application/pdf; charset=utf-8'});
  pdfSrc.value = blobString;

  toastMessage.value = "PDF has been create!";
  showToast.value = true;

  pdfFormData.value = new FormData();
  pdfFormData.value.append('file', doc.output("blob"), 'site-analytics.pdf');

  if (Capacitor.isNativePlatform()) {
    const blob = new Blob([pdfSrc.value], {type: 'application/pdf'});

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1];

      try {
        savedFile.value = await Filesystem.writeFile({
          path: 'analytics opti-scan.pdf',
          data: base64Data,
          directory: Directory.Data
        });

        await LocalNotifications.schedule({
          notifications: [
            {
              title: "Opti Scan",
              body: "Your PDF has been created.",
              iconColor: "#7bf588",
              id: 1,
              actionTypeId: "OPEN_PDF",
              extra: {filePath: savedFile.value.uri}
            }
          ]
        });

        console.log("PDF сохранён в: " + savedFile.value.uri);
      } catch (error) {
        console.error('Error writing file:', error);
        toastMessage.value = "Error writing file";
        showToast.value = true;
      }
    };

    reader.readAsDataURL(blob);
  } else {
    const url = window.URL.createObjectURL(new Blob([pdfSrc.value], {type: 'application/pdf'}));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics opti-scan.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }
};

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
  margin: 90px 30px 20px;
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
      hsl(157, 100%, 16%) 0%,
      hsl(164, 100%, 32%) 8%,
      hsl(159, 100%, 32%) 92%,
      hsl(159, 100%, 16%) 100%
  );
}

.button-82-front {
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  letter-spacing: 1px;
  color: white;
  background: var(--ion-text-color);
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
