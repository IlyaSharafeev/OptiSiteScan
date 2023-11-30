<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="scanOutline" />
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="statsChart" />
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon aria-hidden="true" :icon="person" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import {
  scanOutline,
  statsChart,
  person,
} from 'ionicons/icons';
import {useSearchStore} from "@/stores/main.ts";

const searchStore = useSearchStore();
</script>

<style scoped lang="scss">
/* Стилизация ion-tab-bar */
ion-tab-bar {
  --background: #1a1a1a; /* Тёмный фон для панели вкладок */
  --color-selected: #4caf50; /* Цвет выбранной вкладки */
  --color: #757575; /* Цвет иконок по умолчанию */
  --tab-button-padding-bottom: 6px; /* Отступ снизу для кнопок вкладок */
}

/* Стилизация ion-tab-button */
ion-tab-button {
  --ripple-color: #4caf50; /* Цвет волны при нажатии */
}

/* Стилизация иконок внутри ion-tab-button */
ion-icon {
  --color: #757575; /* Цвет иконок по умолчанию */
  --color-selected: #4caf50; /* Цвет выбранной иконки */
}

/* Когда ion-tab-button активен, меняем цвет иконки */
ion-tab-button[aria-selected="true"] ion-icon {
  color: #4caf50; /* Цвет выбранной иконки */
}

/* Дополнительные стили, если нужно */
/* ... */

</style>
