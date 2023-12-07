<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-segment mode="md" v-model="activeTab">
          <ion-segment-button class="segment-btn" value="accessibility">
            <ion-label>Accessibility</ion-label>
          </ion-segment-button>
          <ion-segment-button class="segment-btn" value="performance">
            <ion-label>Performance</ion-label>
          </ion-segment-button>
        </ion-segment>
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
    <ion-content v-else class="ion-padding">
      <div class="no-data">
        <div>There is no data about your site yet, but you can <span @click="router.push('/')">add it</span></div>
      </div>
    </ion-content>
    <ion-button v-show="!showFilterModal && searchStore.searchData" class="floating-filter-button" @click="openFilterModal">
      <ion-icon :icon="filterIcon" :color="getFilterIconColor()"></ion-icon>
    </ion-button>
    <ion-modal :is-open="showFilterModal" css-class="custom-modal">
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>
            <ion-icon class="modal-title-icon" :icon="filterIcon" :color="getFilterIconColor()"></ion-icon>
          </ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeFilterModal">
              <ion-icon :icon="close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item
              v-for="option in filterOptions"
              :key="option.value"
              class="modal-item ion-no-padding ion-no-margin"
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
import {computed, onMounted, reactive, ref} from 'vue';
import { useSearchStore } from "@/stores/main.ts";
import { useRouter } from "vue-router";
import { filter as filterIcon } from 'ionicons/icons';
import { close, filterOutline } from 'ionicons/icons';

const searchStore = useSearchStore();
const router = useRouter();
const activeTab = ref('performance');
const showScrollTop = ref(false);
const showFilterModal = ref(false);
const filter = ref('all');
const performanceAuditsFromMemory = ref(null);

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

onMounted(async () => {
  await searchStore.getSearchData();
})

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
.segment-btn {
  letter-spacing: 3px;
  font-weight: 600;
}

.performance-chip ion-icon {
  font-size: 1.2em;
  vertical-align: middle;
  margin-right: 2px;
}

ion-card {
  margin: 10px;
  border-radius: 8px;
  --background: var(--ion-background-color);
  --color: var(--ion-text-color);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
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

ion-page {
  --background: #121212;
  --ion-text-color: #4caf50;
}

ion-toolbar {
  --background: var(--ion-toolbar-background);
  --color: var(--ion-text-color);
}

ion-segment-button::part(indicator-background) {
  background: var(--ion-background-color);
  letter-spacing: 2px;
}

ion-segment-button.md::part(native) {
  color: var(--ion-text-color);
}

ion-segment-button.md::part(indicator-background) {
  height: 4px;
  background-color: var(--ion-text-color);
}

/* iOS styles */
ion-segment-button.ios::part(native) {
  color: var(--ion-text-color);
}

ion-segment-button.ios::part(indicator-background) {
  border-radius: 20px;
}

ion-card-header {
  --background: var(--ion-background-color);
  --color: var(--ion-text-color);
}

ion-card-content {
  --background: #262626;
  --color: #fff; /* Белый текст */
}

ion-modal {
  --background: #282828; /* Тёмный фон для модального окна */
}

ion-button {
  --background: #418841; /* Зеленый фон для кнопок */
  --color: #fff; /* Белый текст */
  --border-radius: 100%;
}

.active-filter {
  color: #4caf50; /* Зеленый цвет для активных фильтров */
  font-weight: bold;
}

.floating-filter-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  color: azure;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  z-index: 1000;
  border-radius: 100%;
}

.floating-filter-button ion-icon {
  font-size: 28px;
}

.modal-item {
  padding: 0 15px;
  font-family: 'Lato', sans-serif;
  letter-spacing: 2px;
  text-align: center;
  --border-color: #1e1e1e;
  width: 100%;
}

.modal-title-icon {
  padding-top:3px;
}
</style>
