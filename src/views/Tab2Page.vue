<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Audit Data</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll-events="true" @ionScroll="checkScroll">
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

      <ion-fab vertical="bottom" horizontal="end" slot="fixed" v-show="showScrollTop">
        <ion-fab-button @click="scrollTop">
          <ion-icon :icon="arrowUpOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
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
  IonIcon
} from '@ionic/vue';
import {reactive, computed, ref} from 'vue';
import {useSearchStore} from "@/stores/main.ts";
import {arrowUpOutline} from 'ionicons/icons';

const searchStore = useSearchStore();
const showScrollTop = ref(false);

const auditItems = computed(() => Object.values(searchStore.tempData.lighthouseResult.audits));
const openedItemId = ref(null);

// Создание реактивного объекта для отслеживания состояния деталей
const detailsState = reactive({});
auditItems.value.forEach(item => {
  detailsState[item.id] = false;
});

// Переключение видимости деталей
const toggleDetails = (id) => {
  if (openedItemId.value === id) {
    openedItemId.value = null;
  } else {
    openedItemId.value = id;
  }
};

const checkScroll = (event) => {
  console.log(event.detail.scrollTop);
  showScrollTop.value = event.detail.scrollTop > 200;
};

const scrollTop = () => {
  const content = document.querySelector('ion-content');
  content.scrollToTop(500);
};

const linkify = (text) => {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
};
</script>
