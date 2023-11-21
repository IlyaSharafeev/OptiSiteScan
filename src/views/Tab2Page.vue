<template>
  <ion-page>
    <ion-header>
      <ion-segment color="secondary" mode="md" v-model="activeTab">
        <ion-segment-button value="list">
          <ion-label>accessibility</ion-label>
        </ion-segment-button>
        <ion-segment-button value="performance">
          <ion-label>performance</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-header>
    <ion-content v-if="searchStore.searchData && !searchStore.isLoading" :scroll-events="true" @ionScroll="checkScroll" ref="content">
      <div v-if="activeTab === 'performance'">
        <ion-card v-for="(value, key) in performanceData" :key="key">
          <ion-card-header>
            <ion-card-title>{{ formatTitle(key) }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-chip :color="getCategoryColor(value.category)">
              <ion-icon :icon="getCategoryIcon(value.category)"></ion-icon>
              <ion-label>{{ value.category }}</ion-label>
            </ion-chip>
            <div class="percentile">Percentile: {{ value.percentile }}</div>
            <ion-list>
              <ion-item v-for="(distribution, index) in value.distributions" :key="index">
                <ion-label>
                  <p>Min: {{ distribution.min }} Max: {{ distribution.max || 'N/A' }}</p>
                  <p>Proportion: {{ formatNumber(distribution.proportion) }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>
      <div v-if="activeTab === 'list'">
        <div v-for="(item, index) in auditItems" :key="index">
        <ion-item @click="toggleDetails(item.id)" v-if="item.score !== null && item.score !== 1 && item.score !== 0">
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
      <div v-if="!searchStore.isLoading" class="centered-content">
        <h1 class="ion-color-tertiary">to get the stats, you'll need to do a scan</h1>
        <button class="button-30" role="button" @click="router.push({name: 'tab1'});">Scan</button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonList,
  IonIcon,
  IonFab,
  IonFabButton,
  IonSegment,
  IonSegmentButton,
  IonCardTitle,
  IonChip,
} from '@ionic/vue';
import {computed, ref} from 'vue';
import {useSearchStore} from "@/stores/main.ts";
import {speedometerOutline, hourglassOutline, timeOutline , helpCircleOutline, arrowUpOutline} from 'ionicons/icons';
import {useRouter} from "vue-router";

const searchStore = useSearchStore();
const showScrollTop = ref(false);
const content = ref(null);
const router = useRouter();
const activeTab = ref('charts'); // Начальная вкладка

const auditItems = computed(() => searchStore.searchData[0].lighthouseResult.audits);
const performanceData = computed(() => searchStore.searchData[0].originLoadingExperience.metrics);
const openedItemId = ref(null);

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

const formatTitle = (key) => {
  return key.replace(/_/g, ' ').toUpperCase();
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'FAST': return 'success';
    case 'AVERAGE': return 'warning';
    case 'SLOW': return 'danger';
    default: return 'medium';
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'FAST': return speedometerOutline;
    case 'AVERAGE': return hourglassOutline;
    case 'SLOW': return timeOutline;
    default: return helpCircleOutline;
  }
};

const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
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
  color: #5A5A5A; /* Обновленный цвет текста */
}

.button-30 {
  align-items: center;
  appearance: none;
  background-color: #F0F0F0; /* Обновленный фон */
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #5A5A5A; /* Обновленный цвет текста */
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
  transition: background-color .3s, color .3s, transform .2s; /* Добавление анимации */
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 4px;
}

.button-30:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: scale(1.05); /* Эффект увеличения при наведении */
}

.button-30:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}

.performance-card {
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.performance-card-header {
  background-color: #f4f4f4;
  color: #333;
  font-weight: bold;
  padding: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.performance-card-content {
  padding: 15px;
}

.performance-metric {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}

.performance-distribution {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 10px;
}

.performance-chip {
  font-size: 0.8em;
  margin-right: 5px;
}

.performance-chip ion-icon {
  font-size: 1.2em;
  vertical-align: middle;
  margin-right: 2px;
}

.score {
  background-color: #e0e0e0;
  border-radius: 4px;
  padding: 2px 6px;
  font-weight: bold;
  color: #624848; /* Обновленный цвет текста */
}

ion-card {
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

ion-chip {
  background-color: #353535;
  border: none;
  font-size: 0.9em;
}

ion-chip ion-icon {
  font-size: 1.2em;
  vertical-align: middle;
  margin-right: 5px;
}

ion-item {
  transition: transform .2s;
}

ion-item:hover {
  transform: scale(1.05);
}

.percentile {
  padding-top: 15px;
}
</style>
