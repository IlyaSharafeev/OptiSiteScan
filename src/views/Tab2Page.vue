<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-segment color="secondary" mode="md" v-model="activeTab">
          <ion-segment-button value="accessibility">
            <ion-label>Accessibility</ion-label>
          </ion-segment-button>
          <ion-segment-button value="performance">
            <ion-label>Performance</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-buttons slot="end">
          <ion-button @click="openFilterModal">
            <ion-icon :icon="filterIcon" :color="getFilterIconColor()"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="searchStore.searchData && !searchStore.isLoading" :scroll-events="true" @ionScroll="checkScroll" ref="content">
      <div v-if="activeTab === 'performance'">
        <ion-card v-for="auditRef in performanceAudits" :key="auditRef.id">
          <ion-card-header>
            <ion-card-title>{{ formatTitle(auditRef.id) }}</ion-card-title>
          </ion-card-header>
          <ion-card-content v-if="auditDetails[auditRef.id]">
            <ion-progress-bar
                :value="auditDetails[auditRef.id].score"
                :color="getProgressBarColor(auditDetails[auditRef.id].score)">
            </ion-progress-bar>
            <p v-html="linkify(auditDetails[auditRef.id].description)"></p>
          </ion-card-content>
        </ion-card>
      </div>
      <div v-if="activeTab === 'accessibility'">
        <ion-card v-for="auditRef in accessibilityAudits" :key="auditRef.id">
          <ion-card-header>
            <ion-card-title>{{ formatTitle(auditRef.id) }}</ion-card-title>
          </ion-card-header>
          <ion-card-content v-if="auditDetails[auditRef.id]">
            <ion-progress-bar
                :value="auditDetails[auditRef.id].score"
                :color="getProgressBarColor(auditDetails[auditRef.id].score)">
            </ion-progress-bar>
            <p v-html="linkify(auditDetails[auditRef.id].description)"></p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
    <ion-modal :is-open="showFilterModal">
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Filters</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeFilterModal">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item
              v-for="option in filterOptions"
              :key="option.value"
              :class="{'active-filter': filter === option.value}"
              @click="setFilter(option.value)">
            {{ option.label }}
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup>
import {
  IonTitle, IonModal, IonToolbar, IonPage, IonHeader, IonContent, IonCard, IonCardHeader, IonCardContent, IonSegment, IonSegmentButton, IonCardTitle, IonLabel, IonProgressBar, IonList, IonMenu, IonItem, IonButtons, IonIcon, IonButton
} from '@ionic/vue';
import {computed, reactive, ref} from 'vue';
import { useSearchStore } from "@/stores/main.ts";
import { useRouter } from "vue-router";
import { filter as filterIcon } from 'ionicons/icons';

const searchStore = useSearchStore();
const router = useRouter();
const activeTab = ref('performance');
const showScrollTop = ref(false);
const showFilterModal = ref(false);

const performanceAudits = computed(() => getFilteredAudits(searchStore.searchData[0].lighthouseResult.categories.performance.auditRefs));
const accessibilityAudits = computed(() => getFilteredAudits(searchStore.searchData[0].lighthouseResult.categories.accessibility.auditRefs));
const auditDetails = computed(() => {
  const details = {};
  if (searchStore.searchData && searchStore.searchData.length > 0) {
    const audits = searchStore.searchData[0].lighthouseResult.audits;
    for (const audit in audits) {
      if (audits.hasOwnProperty(audit)) {
        details[audit] = audits[audit];
      }
    }
  }
  return details;
});
const filter = ref('all');

const openFilterModal = () => {
  showFilterModal.value = true;
};

const closeFilterModal = () => {
  showFilterModal.value = false;
};

const filterOptions = reactive([
  { value: 'all', label: 'All', color: 'default' },
  { value: 'danger', label: 'Critical', color: 'danger' },
  { value: 'warning', label: 'Warning', color: 'warning' },
  { value: 'success', label: 'Good', color: 'success' },
]);

const getFilterIconColor = () => {
  const option = filterOptions.find(o => o.value === filter.value);
  return option ? option.color : 'default';
};

const setFilter = (selectedFilter) => {
  filter.value = selectedFilter;
  closeFilterModal();
};

const getFilteredAudits = (audits) => {
  return audits.filter(auditRef => {
    const auditDetail = auditDetails.value[auditRef.id];
    if (!auditDetail) return false; // Дополнительная проверка

    if (filter.value === 'all') return true;
    const scoreColor = getProgressBarColor(auditDetail.score);
    return scoreColor === filter.value;
  });
};

const filteredAudits = (audits) => {
  if (filter.value === 'all') {
    return audits;
  }
  return audits.filter(auditRef => getProgressBarColor(auditDetails[auditRef.id].score) === filter.value);
};

const formatTitle = (key) => key.replace(/-/g, ' ').toUpperCase();
const linkify = (text) => text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig, (url) => `<a href="${url}" target="_blank">read more</a>`);

const checkScroll = (event) => showScrollTop.value = event.detail.scrollTop > 200;
const scrollTop = () => content.value && content.value.$el && typeof content.value.$el.scrollToTop === 'function' ? content.value.$el.scrollToTop(500) : console.error('Method scrollToTop is not available');

const getProgressBarColor = (score) => {
  if (score >= 0.9) return 'success';
  if (score >= 0.5) return 'warning';
  return 'danger';
};
</script>

<style scoped>
.active-filter {
  font-weight: bold;
  color: var(--ion-color-primary);
}

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
