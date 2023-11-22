<template>
  <ion-page>

    <ion-header>
      <ion-toolbar class="toolbar">
        <ion-buttons slot="start">
          <ion-menu-button :auto-hide="false"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-menu side="start" menuId="first" contentId="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">

            <ion-button class="close-button" @click="closeMenu">
              <ion-icon :icon="close"></ion-icon>
            </ion-button>

          </ion-buttons>
          <ion-buttons slot="end">

            <ion-button class="sort-button" @click="toggleSortOrder">
              <ion-icon :icon="sortIcon"></ion-icon>
            </ion-button>

          </ion-buttons>
          <ion-title class="ion-text-center menu-title">Search History</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list class="search-history">
          <ion-item class="search-history-item" v-for="(link, index) in searchHistory" :key="index">
            <ion-label>
              <h2>{{ link }}</h2>
            </ion-label>
            <ion-buttons slot="end">
              <ion-button @click="removeFromHistory(index)">
                <ion-icon :icon="trash"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main"></ion-router-outlet>

    <ion-content :fullscreen="true" class="ion-padding ion-text-center" id="main-content">
        <ion-item class="input-item" lines="none">
          <ion-input v-model="inputData"></ion-input>
          <ion-icon
              v-show="inputData"
              :icon="closeOutline"
              slot="end"
              @click="inputData = ''"
          ></ion-icon>
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
            <ion-button @click="openCamera" expand="block">
              <ion-icon aria-hidden="true" :icon="camera"/>
            </ion-button>
          </ion-col>

          <ion-col size="12">
            <ion-button @click="scanLink" expand="block">
              <ion-icon aria-hidden="true" :icon="searchOutline" />
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>

    <div v-if="isLoading" class="spinner-overlay">
      <ion-spinner name="lines"></ion-spinner>
    </div>

    <ion-alert
        :is-open="isOpen"
        :sub-header="textALert"
        :buttons="alertButtons"
        @didDismiss="setOpen(false)"
    ></ion-alert>

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
    IonAlert,
    IonButtons,
  IonSpinner,
    IonRouterOutlet,
    IonList,
    IonMenu,
    IonMenuButton,
    IonLabel,
} from '@ionic/vue';
import {logoBuffer, searchOutline, closeOutline, camera, close, trash, arrowUp, arrowDown} from "ionicons/icons";
import { Clipboard } from '@capacitor/clipboard';
import {useSearchStore} from "@/stores/main";
import {useRouter} from 'vue-router';
import axios from 'axios';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import {ref, onMounted, computed} from 'vue';
import { menuController } from '@ionic/vue';

const showSidebar = ref(false);
const searchHistory = ref<string[]>([]);

onMounted(async () => {
  searchHistory.value = await getSearchHistory();
});

const router = useRouter();

const inputData = ref('');
const searchStore = useSearchStore();

const isOpen = ref(false);
const isLoading = ref(false);
const textALert = ref('');
const alertButtons = ['OK'];
const menuRef = ref(null);
const isDescending = ref(true);
const sortOrderText = computed(() => isDescending.value ? 'Сначала старые' : 'Сначала новые');
const sortIcon = computed(() => isDescending.value ? arrowDown : arrowUp);

const toggleSortOrder = () => {
  isDescending.value = !isDescending.value;
  searchHistory.value = searchHistory.value.slice().reverse(); // Изменяем порядок элементов в массиве
};

const closeMenu = async () => {
  await menuController.close();
};
const saveSearchHistory = async (newLink: string) => {
  const { value } = await Preferences.get({ key: 'searchHistory' });
  let history = value ? JSON.parse(value) : [];
  if (!history.includes(newLink)) {
    history.push(newLink);
    await Preferences.set({ key: 'searchHistory', value: JSON.stringify(history) });
    searchHistory.value = history; // Обновляем историю поиска
    console.log(searchHistory.value);
  }
};

const removeFromHistory = async (index: number) => {
  searchHistory.value.splice(index, 1); // Удаляем элемент из списка
  await Preferences.set({ key: 'searchHistory', value: JSON.stringify(searchHistory.value) }); // Сохраняем обновленный список
};

const getSearchHistory = async () => {
  const { value } = await Preferences.get({ key: 'searchHistory' });
  return value ? JSON.parse(value) : [];
};

const setOpen = (state: boolean, message?: string) => {
  if(message) {
    textALert.value = message
  }
  isOpen.value = state;
};

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
    const { value: copyText } = await Clipboard.read();

    if (copyText.trim() === "") {
      setOpen(true, "Buffer is empty!")
    }
    if (isValidUrl(copyText)) {
      inputData.value = copyText;
    } else {
      setOpen(true, "Link is not valid!");
      console.error('Error when pasting from clipboard (it\'s not a link):' + copyText);
    }
  } catch (err) {
    console.error('Error when pasting from clipboard:', err);
  }
}

const scanLink = () => {
  if(isValidUrl(inputData.value)) {
    saveSearchHistory(inputData.value);
    searchStore.scanURL(inputData.value);
    router.push({name: "tab2"});
  } else {
    setOpen(true, "Link is not valid!")
  }
}

const openCamera = async () => {
  try {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    isLoading.value = true; // Включаем спиннер

    const base64Image = photo.base64String;

    const response = await axios.post(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDXnQe-nYOsKG4v2-AnZ-Tmu6-G5Da-5g4',
        {
          requests: [
            {
              image: {
                content: base64Image
              },
              features: [{ type: 'TEXT_DETECTION' }]
            }
          ]
        }
    );

    // Проверяем, есть ли данные о распознавании текста в ответе
    if (response.data.responses[0] && response.data.responses[0].fullTextAnnotation) {
      const detectedText = response.data.responses[0].fullTextAnnotation.text;
      inputData.value = detectedText; // Обновляем поле ввода
    } else {
      console.error('Текст не обнаружен');
      inputData.value = ''; // Очищаем поле ввода
    }
  } catch (err) {
    console.error('Ошибка при использовании камеры или при распознавании текста:', err);
  } finally {
    isLoading.value = false; // Выключаем спиннер
  }
};
</script>

<style scoped>
ion-content {
  position: relative; /* Устанавливаем относительное позиционирование для ion-content */
  height: 100vh; /* Устанавливаем высоту на всю видимую область */
}

.input-item {
  position: absolute; /* Абсолютное позиционирование для ion-item */
  top: 50%; /* Позиционируем на половине высоты родителя */
  left: 50%; /* Позиционируем на половине ширины родителя */
  transform: translate(-50%, -50%); /* Смещаем назад, чтобы центр элемента был в центре родителя */
  width: 100%; /* Можно задать конкретную ширину, если нужно */
  padding: 0 10px;
  --border-radius: 10px;
}

ion-title {
  padding-inline: 0 !important;
  text-transform: uppercase !important;
}

.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  z-index: 1000; /* Убедитесь, что спиннер находится над всеми элементами */
}

.search-history {
  padding: 20px 0;
}

.search-history-item {
  position: relative;
  --background: #2c3e50; /* Темный фон для элемента */
  --color: #fff; /* Светлый текст */
  --padding-start: 15px;
  --min-height: 50px;
  --border-radius: 8px;
  margin-bottom: 10px;
  width: 100%; /* Устанавливаем ширину на auto или 100% */
  padding: 0 10px;
}

.search-history ion-label h2 {
  font-size: 1rem;
}

ion-list {
  height: 100%;
}

.search-history-item ion-button {
  --padding-end: 0px; /* Уменьшаем отступ справа от кнопки */
}

.sort-button {
  --color: #fff; /* Цвет иконки */
  --border: none; /* Убрать границу */
  background-color: #e3e6df;
  border-radius: 10px;
}

.close-button {
  background-color: #e3e6df;
  border-radius: 10px;
}

.sort-button ion-icon {
  font-size: 1rem; /* Размер иконки */
}

.menu-title {
  font-size: 18px;
  margin: 0 15px;
  background-color: #e3e6df;
  border-radius: 10px;
  padding: 5px;
}
</style>
