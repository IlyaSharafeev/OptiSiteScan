<template>
  <ion-page>
    <ion-header>
      <ion-segment v-model="activeTab">
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
    <ion-content v-else class="ion-padding">
      <div class="centered-content">
        <h1 class="ion-color-tertiary">to get the stats, you'll need to do a scan</h1>
        <button class="button-30" role="button">Scan</button>
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
.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  height: 100%; /* Высота контейнера */
  text-align: center; /* Центрирование текста на всякий случай */
  color: #484848;
}

.button-30 {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: 'Kdam Thmor Pro', sans-serif;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s, transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
  text-transform: uppercase;
}

.button-30:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}
</style>
