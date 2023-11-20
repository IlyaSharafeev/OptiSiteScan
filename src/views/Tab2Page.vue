<template>
  <ion-page>
    <ion-header>
      <ion-segment v-if="searchStore.searchData" v-model="activeTab">
        <ion-segment-button value="charts">
          <ion-label>Charts</ion-label>
        </ion-segment-button>
        <ion-segment-button value="list">
          <ion-label>List</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-header>
    <ion-content v-if="searchStore.searchData" :scroll-events="true" @ionScroll="checkScroll" ref="content">
      <div v-if="activeTab === 'charts'">
        <DonutChart/>
        <ReversedBarChart/>
      </div>
      <div v-if="activeTab === 'list'">
        <div v-for="(item, index) in auditItems" :key="index">
        <ion-item @click="toggleDetails(item.id)">
          <ion-label class="" style="display: flex; justify-content: space-between">
            <h2>{{ item.title }}</h2>
            <p v-if="item.score !== null && item.score !== 1 && item.score !== 0" class="score" style="min-width: 55px">{{ item.score }} ms</p>
          </ion-label>
        </ion-item>
        <ion-card v-if="openedItemId === item.id">
          <ion-card-content>
            <p v-html="linkify(item.description)"></p>
          </ion-card-content>
        </ion-card>
      </div>
      </div>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed" v-show="showScrollTop">
        <ion-fab-button @click="scrollTop">
          <ion-icon :icon="arrowUpOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
    <ion-content v-else>
      <div class="spinner-container">
        <ion-spinner name="crescent"></ion-spinner>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonIcon,
  IonFab,
  IonFabButton,
    IonSegment,
    IonSegmentButton,
  IonSpinner
} from '@ionic/vue';
import {reactive, computed, ref} from 'vue';
import {useSearchStore} from "@/stores/main.ts";
import {arrowUpOutline} from 'ionicons/icons';
import DonutChart from "@/components/DonutChart.vue";
import ReversedBarChart from "@/components/ReversedBarChart.vue";

const searchStore = useSearchStore();
const showScrollTop = ref(false);
const content = ref(null);
const activeTab = ref('charts'); // Начальная вкладка

const auditItems = computed(() => {
  if (searchStore.searchData) {
    Object.values(searchStore.searchData)
  }
});
const openedItemId = ref(null);

// Создание реактивного объекта для отслеживания состояния деталей
const detailsState = reactive({});

if (auditItems.value) {
  auditItems.value.forEach(item => {
    detailsState[item.id] = false;
  });
}

// Переключение видимости деталей
const toggleDetails = (id) => {
  if (openedItemId.value === id) {
    openedItemId.value = null;
  } else {
    openedItemId.value = id;
  }
};

const checkScroll = (event) => {
  showScrollTop.value = event.detail.scrollTop > 200;
};

const scrollTop = () => {
  if (content.value && content.value.$el && typeof content.value.$el.scrollToTop === 'function') {
    content.value.$el.scrollToTop(500);
  } else {
    console.error('Method scrollToTop is not available');
  }
};

const linkify = (text) => {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 57px); /* 50px - предполагаемая высота шапки */
  width: 100%;
  overflow: hidden; /* Предотвращение появления скроллбара */
}
</style>
