<template>
  <ion-page>
    <!-- Боковое меню с функционалом -->
    <ion-menu side="end" menuId="sideMenu" contentId="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title v-if="!editMode">{{ userName }}</ion-title>
          <ion-input v-else v-model="userNameEditable" placeholder="Введите имя" />
          <ion-buttons slot="end">
            <ion-button v-if="!editMode" @click="enableEditMode">
              <ion-icon :icon="pencilOutline"></ion-icon>
            </ion-button>
            <ion-button v-if="editMode" @click="confirmEdit">
              <ion-icon :icon="checkmarkOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item @click="downloadPdf">Скачать PDF</ion-item>
          <ion-item @click="sendEmail">Отправить на Email</ion-item>
          <ion-item @click="toggleDarkMode">
            <ion-label>Темная тема</ion-label>
            <ion-toggle v-model="darkMode" aria-label="toggle theme"></ion-toggle>
          </ion-item>
        </ion-list>
        <ion-item lines="none" class="logout-button" @click="logout">
          <ion-label color="danger">Выйти</ion-label>
        </ion-item>
      </ion-content>
    </ion-menu>

    <!-- Основное содержимое страницы -->
    <ion-content id="main-content" class="ion-padding">
        <div class="bookmark-button" @click="openMenu">
          <ion-icon class="bookmark-icon"></ion-icon>
        </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonPage,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonToggle,
  IonButton,
  IonButtons,
  menuController
} from '@ionic/vue';
import {pencilOutline, checkmarkOutline} from 'ionicons/icons';
import {useSearchStore} from "@/stores/main";

const userName = ref('Имя Пользователя');
const userNameEditable = ref(userName.value);
const editMode = ref(false);
const darkMode = ref(false);
const searchStore = useSearchStore();

const openMenu = () => {
  menuController.open('sideMenu');
};

const enableEditMode = () => {
  userNameEditable.value = userName.value;
  editMode.value = true;
};

const confirmEdit = () => {
  userName.value = userNameEditable.value;
  editMode.value = false;
};

const downloadPdf = () => {
  // Логика скачивания PDF
};

const sendEmail = () => {
  // Логика отправки на Email
};

const logout = () => {
  searchStore.logout();
};

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  document.body.classList.toggle('dark', darkMode.value);
};
</script>

<style scoped>
/* Стилизация бокового меню и кнопки "Выйти" */
.logout-button {
  position: absolute;
  bottom: 0;
  width: 100%;
}

/* Стили для кнопки меню и темной темы */
ion-fab {
  position: fixed;
  right: 0;
  margin-right: 1em;
  z-index: 10;
}

.dark {
  --ion-background-color: #000;
  --ion-text-color: #fff;
}

/* Дополнительные стили */
.pdf-preview-placeholder {
  border: 1px dashed #ccc;
  padding: 20px;
  text-align: center;
}

.bookmark-button {
  position: fixed;
  right: 0; /* Прижимаем к правому краю */
  top: 50%; /* Располагаем по центру экрана по вертикали */
  transform: translateY(-50%); /* Смещаем для центрирования относительно своей высоты */
  border-top-left-radius: 152px; /* Закругление слева сверху */
  border-bottom-left-radius: 152px; /* Закругление слева снизу */
  width: 17px; /* Ширина закладки */
  height: 170px; /* Высота закладки */
  background-color: #2979ff; /* Цвет фона закладки */
  color: white; /* Цвет текста/иконки */
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.2); /* Тень с левой стороны */
  display: flex; /* Для центрирования иконки внутри */
  align-items: center; /* Вертикальное выравнивание */
  justify-content: center; /* Горизонтальное выравнивание */
  cursor: pointer; /* Изменение курсора при наведении */
}

/* Иконка закладки */
.bookmark-icon {
  transform: rotate(90deg); /* Поворот иконки на 90 градусов */
}

/* При наведении мыши на закладку */
.bookmark-button:hover {
  background-color: #1e88e5; /* Цвет фона при наведении */
}

/* Стили для темного режима */
.dark .bookmark-button {
  background-color: #fff; /* Светлая закладка для темной темы */
  color: #000; /* Текст/иконка черного цвета для контраста */
}
</style>
