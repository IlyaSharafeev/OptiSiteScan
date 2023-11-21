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

const searchStore = useSearchStore();
</script>
