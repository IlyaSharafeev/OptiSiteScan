<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Scan</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding ion-text-center">
      <ion-item lines="none">
        <ion-input v-model="inputData"></ion-input>
      </ion-item>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-row>
          <ion-col size="6">
            <ion-button @click="pasteFromClipboard" expand="block">
              <ion-icon aria-hidden="true" :icon="logoBuffer" />
            </ion-button>
          </ion-col>
          <ion-col size="6">
            <ion-button @click="scanLink" expand="block">
              <ion-icon aria-hidden="true" :icon="searchOutline" />
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonButton,
  IonCol,
  IonRow,
  IonFooter,
  IonIcon,
} from '@ionic/vue';
import {logoBuffer, searchOutline} from "ionicons/icons";
import {ref} from "vue";
import {useSearchStore} from "@/stores/main";

const searchStore = useSearchStore();
const inputData = ref('');

const isValidUrl = (string: string) => {
  try {
    // Создание нового URL объекта может выбросить исключение,
    // если строка не является валидным URL
    new URL(string);

    // Дополнительная проверка с помощью регулярного выражения
    const regex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
    return regex.test(string);
  } catch (e) {
    return false;
  }
}

const pasteFromClipboard = async () => {
  try {
    const copyText = await navigator.clipboard.readText();
    if(isValidUrl(copyText)) {
      inputData.value = copyText;
    } else {
      console.error('Error when pasting from clipboard (it\'s not a link):' + copyText);
    }
  } catch (err) {
    console.error('Error when pasting from clipboard:', err);
  }
}

const scanLink = () => {
  searchStore.scanURL(inputData.value);
}
</script>

<style scoped>
ion-content {
  position: relative; /* Устанавливаем относительное позиционирование для ion-content */
  height: 100vh; /* Устанавливаем высоту на всю видимую область */
}

ion-item {
  position: absolute; /* Абсолютное позиционирование для ion-item */
  top: 50%; /* Позиционируем на половине высоты родителя */
  left: 50%; /* Позиционируем на половине ширины родителя */
  transform: translate(-50%, -50%); /* Смещаем назад, чтобы центр элемента был в центре родителя */
  width: 100%; /* Можно задать конкретную ширину, если нужно */
  padding: 0 10px;
  --border-radius: 10px;
}
</style>
