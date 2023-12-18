<template>
  <ion-page>
    <div v-if="showClearMenu" class="clear-menu" ref="clearMenuRef">
      <ion-item @click="showConfirmClear = true">Clear history</ion-item>
    </div>

    <ion-header>
      <ion-toolbar class="toolbar">
        <ion-buttons slot="start">
          <ion-menu-button class="header-menu-button" :auto-hide="false"></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-menu side="start" menuId="first" contentId="main-content">
      <ion-header>
        <ion-toolbar>

          <ion-buttons slot="start">
            <div class="header-menu-button" @click="closeMenu">
              <ion-icon size="small" :icon="close"></ion-icon>
            </div>
          </ion-buttons>

          <ion-buttons slot="end">

            <div class="header-menu-button" @click="toggleSortOrder">
              <ion-icon :icon="sortIcon"></ion-icon>
            </div>

            <div class="header-menu-button" ref="ellipsisButtonRef" @click="toggleClearMenu">
              <ion-icon :icon="ellipsisVertical"></ion-icon>
            </div>

          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list class="search-history">
          <div class="search-history-item" v-for="(link, index) in searchHistory" :key="index">
            <div class="search-history-item__title">
              {{ link }}
            </div>
            <div class="search-history-item__buttons">
              <div class="header-menu-button small" @click="copyToClipboard(link)">
                <ion-icon :icon="copyIcon"></ion-icon>
              </div>
              <div class="header-menu-button small" @click="removeFromHistory(index)">
                <ion-icon :icon="trash"></ion-icon>
              </div>
            </div>
          </div>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main"></ion-router-outlet>

    <ion-content :fullscreen="true" class="ion-padding ion-text-center" id="main-content">
      <canvas :key="canvasKey" class="canvas-matrix" ref="canvasRef"></canvas>
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

    <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        :duration="2000"
        @didDismiss="() => showToast = false">
    </ion-toast>

    <ion-alert
        :is-open="showConfirmClear"
        message="Are you sure you want to clear your search history?"
        :buttons="[
    {
      text: 'No',
      role: 'cancel',
      handler: () => { showConfirmClear = false; }
    },
    {
      text: 'Yes',
      handler: () => { clearHistoryConfirmed(); }
    }
  ]"
    ></ion-alert>

    <div v-if="isImageCaptured" class="image-crop-overlay">
      <img v-if="capturedImage" :src="'data:image/jpeg;base64,' + capturedImage.base64String" class="full-screen-image" ref="imageElementRef" alt="image for captured">
      <ion-button class="button-crop" @click="cropAndProcessImage">Crop and Process</ion-button>
<!--      <ion-button @click="cancelCrop">Cancel</ion-button>-->
    </div>

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
import {logoBuffer, searchOutline, closeOutline, camera, close, trash, arrowUp, arrowDown, ellipsisVertical} from "ionicons/icons";
import { Clipboard } from '@capacitor/clipboard';
import {useSearchStore} from "@/stores/main";
import {useRouter} from 'vue-router';
import axios from 'axios';
import { Camera, CameraResultType } from '@capacitor/camera';
import {GetResult, Preferences} from '@capacitor/preferences';
import { copy as copyIcon } from 'ionicons/icons';
import {ref, onMounted, computed, nextTick, onUnmounted} from 'vue';
import { menuController } from '@ionic/vue';
import { IonToast } from '@ionic/vue';
import {onClickOutside} from "@vueuse/core";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';

const router = useRouter();

const inputData = ref('');
const searchStore = useSearchStore();

const isOpen = ref(false);
const isLoading = ref(false);
const textALert = ref('');
const alertButtons = ['OK'];
const menuRef = ref(null);
const isDescending = ref(true);
const sortIcon = computed(() => isDescending.value ? arrowDown : arrowUp);

const searchHistory = ref<string[]>([]);
const showToast = ref(false);
const toastMessage = ref("");

const showClearMenu = ref(false);
const clearMenuRef = ref<HTMLElement | null>(null);
const ellipsisButtonRef = ref<HTMLElement | null>(null); // Ссылка на кнопку троеточия
const showConfirmClear = ref(false);
const canvasRef = ref(null) as any; // ref для доступа к элементу canvas
const canvasKey = ref(0);
const isImageCaptured = ref(false);
const capturedImage = ref(null as any);
const cropper = ref(null);
const imageElementRef = ref(null);


const initializeCanvas = () => {
  nextTick(() => {
    canvasApp();
  });
};

onMounted(async () => {
  initializeCanvas();
});


window.addEventListener('resize', () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    canvasApp();
  }
});

const canvasApp = () => {
  let Game_Interval: any; // Объявляем переменную здесь, чтобы она была доступна в функциях runMatrix и drawScreen

  const ctx = canvasRef.value.getContext('2d');
  const w = canvasRef.value.width = window.innerWidth;
  const h = canvasRef.value.height = window.innerHeight;
  const yPositions = Array(300).fill('').map(() => 0);
  const runMatrix = () => {
    clearInterval(Game_Interval); // Не нужно проверять на undefined, clearInterval корректно обрабатывает несуществующие идентификаторы
    Game_Interval = setInterval(drawScreen, 43);
  }

  const drawScreen = () => {
    if(searchStore.currentTheme === "dark") {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
    } else {
      ctx.fillStyle = 'rgba(240,255,255,0.05)';
    }
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#0f0'; // Зеленый цвет текста
    ctx.font = '10px Georgia';
    yPositions.map(function(y, index) {
      const text = String.fromCharCode(1e2 + Math.random() * 33);
      const x = (index * 10) + 10;
      ctx.fillText(text, x, y);
      if (y > 100 + Math.random() * 1e4) {
        yPositions[index] = 0;
      } else {
        yPositions[index] = y + 10;
      }
    });
  }

  runMatrix();
}

const clearHistoryConfirmed = () => {
  searchHistory.value = [];
  showClearMenu.value = false;
  showConfirmClear.value = false;
};

const updateMenuPosition = () => {
  // @ts-ignore
  const buttonRect = ellipsisButtonRef.value.$el.getBoundingClientRect();
  // @ts-ignore
  clearMenuRef.value.style.top = `${buttonRect.bottom + 100}px`;
  // @ts-ignore
  clearMenuRef.value.style.left = `${buttonRect.left}px`;
};

const toggleClearMenu = () => {
  showClearMenu.value = !showClearMenu.value;
  if (showClearMenu.value) {
    nextTick(() => {
      updateMenuPosition();
    });
  }
};

onMounted(async () => {
  searchHistory.value = await getSearchHistory();
});

onClickOutside(clearMenuRef, () => showClearMenu.value = false)

const toggleSortOrder = () => {
  isDescending.value = !isDescending.value;
  searchHistory.value = searchHistory.value.slice().reverse(); // Изменяем порядок элементов в массиве
};

const closeMenu = async () => {
  await menuController.close('first');
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

const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const cropAndProcessImage = () => {
  if (!cropper.value) {
    console.error('Cropper is not initialized');
    return;
  }

  //@ts-ignore
  const croppedCanvas = cropper.value.getCroppedCanvas();
  croppedCanvas.toBlob(async (blob: Blob) => {
    const base64Image = await blobToBase64(blob);

    const response = await axios.post(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDXnQe-nYOsKG4v2-AnZ-Tmu6-G5Da-5g4',
        {
          requests: [
            {
              image: {
                //@ts-ignore
                content: base64Image.split(',')[1]
              },
              features: [{ type: 'TEXT_DETECTION' }]
            }
          ]
        }
    );

      if (response.data.responses[0] && response.data.responses[0].fullTextAnnotation) {
        const detectedText = response.data.responses[0].fullTextAnnotation.text;
        inputData.value = detectedText; // Обновляем поле ввода
      } else {
        console.error('Текст не обнаружен');
        inputData.value = ''; // Очищаем поле ввода
      }
  });
  isImageCaptured.value = false;
};

const initCropper = () => {
  console.log("Initializing Cropper");
  if (imageElementRef.value) {
    //@ts-ignore
    cropper.value = new Cropper(imageElementRef.value, {
      aspectRatio: 16 / 9,
      // ... остальные опции ...
    });
  } else {
    console.error("Image element is not found");
  }
};

const openCamera = async () => {
  try {
    //@ts-ignore
    capturedImage.value = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    isImageCaptured.value = true;
    console.log(capturedImage.value);

    await nextTick(() => {
      initCropper();
    });

    isLoading.value = true; // Включаем спиннер

    } catch (err) {
      console.error('Ошибка при использовании камеры или при распознавании текста:', err);
    } finally {
      isLoading.value = false; // Выключаем спиннер
    }
};

const copyToClipboard = async (text: string) => {
  await Clipboard.write({
    string: text
  });

  toastMessage.value = "Link is copied";
  showToast.value = true;
};
</script>

<style scoped>
.image-crop-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.86);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  pointer-events: all;
  touch-action: auto;
}

.full-screen-image {
  position: absolute;
  top: 25px;
  max-width: 90%;
  max-height: 90%;
  margin: 0 auto; /* Центрирование изображения */
  border: 1px solid white; /* Добавляем границу для лучшего визуального восприятия */
}

.button-crop {
  position: absolute;
  bottom: 25px;
}

.canvas-matrix {
  position: absolute;
  filter: blur(0px);
  top: 0;
  left: -10px;
  width: 105%;
  height: 100%;
  z-index: 1;
}
/* Стиль для кнопок в теле страницы */
ion-button {
  --background: var(--ion-background-color); /* Тёмный фон для кнопки */
  --color: var(--ion-color-step-50); /* Цвет текста/иконок кнопки */
  --border-radius: 10px; /* Скругление углов кнопки */
  --box-shadow: var(--ion-box-shadow);
}

.header-menu-button {
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 35px;
  height: 35px;
  box-shadow: var(--ion-box-shadow-menu);

  &.small {
    width: 28px;
    height: 28px;
  }
}

/* Стиль для кнопок в тулбаре */
ion-toolbar ion-button {
  --background: transparent; /* Прозрачный фон */
  --color: var(--ion-text-color); /* Цвет иконок и текста */
}

/* Стиль для активированных кнопок в тулбаре */
ion-toolbar ion-button:active {
  --background: #333; /* Тёмный фон для активной кнопки */
  --color: var(--ion-text-color); /* Цвет текста/иконок активной кнопки */
}

/* Стиль для кнопок в футере */
ion-footer ion-button {
  --background: var(--ion-background-color); /* Тёмный фон для кнопки */
  --color: var(--ion-text-color); /* Цвет текста/иконок кнопки */
}


/* Стиль для ion-icon внутри кнопок */
ion-button ion-icon {
  --color: var(--ion-text-color); /* Цвет иконок в кнопках */
}

/* Общий тёмный фон для страницы */
ion-page {
  --background: #121212; /* Тёмный фон */
  --ion-text-color: #fff; /* Белый текст */
}

/* Стиль для тулбара */
ion-toolbar {
  --background: var(--ion-background-color); /* Тёмный фон для тулбара */
  --color: var(--ion-text-color); /* Белый текст */
}

/* Стиль для кнопок меню */
ion-menu-button {
  --color: var(--ion-text-color); /* Цвет кнопки меню */
}


/* Стиль для заголовка в меню */
ion-title.menu-title {
  color: var(--ion-text-color); /* Цвет заголовка */
}

/* Стиль для иконок в элементах списка */
ion-icon {
  color: var(--ion-text-color); /* Цвет иконок */
}


/* Стиль для футера */
ion-footer {
  --background: var(--ion-color-step-550); /* Тёмный фон для футера */
}

.clear-menu {
  position: absolute;
  top: 45px;
  left: 155px;
  border-radius: 5px;
  z-index: 99999;
  width: 150px;
  height: 50px;
}

ion-content {
  position: relative; /* Устанавливаем относительное позиционирование для ion-content */
  height: 100vh; /* Устанавливаем высоту на всю видимую область */
}

.input-item {
  position: absolute; /* Абсолютное позиционирование для ion-item */
  top: 45%; /* Позиционируем на половине высоты родителя */
  left: 50%; /* Позиционируем на половине ширины родителя */
  transform: translate(-50%, -50%); /* Смещаем назад, чтобы центр элемента был в центре родителя */
  width: 100%; /* Можно задать конкретную ширину, если нужно */
  padding: 0 10px;
  --border-radius: 20px;
  z-index: 2;
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
  background-color: var(--ion-background-color); /* Полупрозрачный фон */
  z-index: 1000; /* Убедитесь, что спиннер находится над всеми элементами */
}

.search-history {
  padding: 20px 0;
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

.sort-button ion-icon {
  font-size: 1rem; /* Размер иконки */
}

/* Тёмный стиль для ion-menu и его компонентов */
ion-menu {
  --background: var(--ion-background-color); /* Тёмный фон для меню */
}

ion-header {
  --background: var(--ion-background-color); /* Тёмный фон для шапки меню */
}

/* Стилизация кнопок в тулбаре меню */
.toolbar ion-button {
  --background: var(--ion-background-color); /* Тёмный фон для кнопок */
  --color: var(--ion-text-color); /* Цвет иконок и текста */
}

/* Стилизация элементов списка истории поиска */
.search-history-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin: 0 10px 10px;
  border-radius: 5px;
  background-color: var(--ion-color-history-item);
  /* Цвет границы элементов списка */

  .search-history-item__title {
    white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden; /* Обрезаем все, что не помещается в область */
    padding: 5px; /* Поля вокруг текста */
    text-overflow: ellipsis; /* Добавляем многоточие */
  }

  .search-history-item__buttons {
    display: flex;
  }
}

/* Стилизация иконок в элементах списка */
.search-history-item ion-icon {
  --color: var(--ion-text-color); /* Цвет иконок */
}

/* Стилизация кнопки для очистки истории */
.clear-menu ion-item {
  --background: var(--ion-background-color); /* Тёмный фон для кнопки */
  --color: var(--ion-text-color); /* Светлый текст */
  --ion-item-background: #2a2a2a; /* Фон для элемента ion-item */
  border: 1px solid var(--ion-border-color); /* Граница для кнопки */
  margin: 0.5rem; /* Отступы вокруг кнопки */
  font-weight: bold;
}

/* Стилизация подтверждающего ion-alert */
ion-alert {
  --background: var(--ion-background-color); /* Тёмный фон для алерта */
  --color: var(--ion-text-color); /* Светлый текст */
}
</style>
