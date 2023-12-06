<template>
  <ion-app>
    <Spinner v-if="searchStore.isLoading"/>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Spinner from "@/components/Spinner.vue";
import {useSearchStore} from "@/stores/main";
import {onMounted} from "vue";
import {Preferences} from "@capacitor/preferences";

const searchStore = useSearchStore();

onMounted(async () => {
  const {value} = await Preferences.get({ key: 'theme' });
  if(typeof value == 'string') {
    searchStore.currentTheme = value;
  }
  if(value === 'light') {
    document.body.setAttribute('color-theme', 'light');
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  } else {
    document.body.setAttribute('color-theme', 'dark');
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  }
})
</script>
