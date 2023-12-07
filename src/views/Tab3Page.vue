<template>
  <ion-page>
    <!-- Боковое меню с функционалом -->
    <ion-menu side="end" menuId="sideMenu" contentId="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title v-if="!editMode">{{userName}}</ion-title>
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
        <ion-item class="toggle-theme">
          <ToggleButton/>
        </ion-item>
        <ion-item lines="none" class="logout-button" @click="logout">
          <ion-label color="danger">Exit</ion-label>
        </ion-item>
      </ion-content>
    </ion-menu>

    <!-- Основное содержимое страницы -->
    <ion-content  id="main-content" class="ion-padding">
        <div class="bookmark-button" @click="openMenu"></div>
      <PDFViewerComponent v-if="searchStore.searchData"/>
      <div v-else class="no-data">
        <div>There is no data about your site yet, but you can <span @click="router.push('/')">add it</span></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {
  IonPage,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonButton,
  IonButtons,
  menuController
} from '@ionic/vue';
import {pencilOutline, checkmarkOutline, lockClosed} from 'ionicons/icons';
import PDFViewerComponent from "@/components/PDFViewerComponent.vue";
import { useSearchStore } from "@/stores/main";
import {useRouter} from "vue-router";
import ToggleButton from "@/components/ToggleButton.vue";

const editMode = ref(false);
const searchStore = useSearchStore();
const userName = ref("");
const userNameEditable = ref(userName.value);
const router = useRouter();


onMounted(async () => {
  await searchStore.getSearchData();
  userName.value = await searchStore.getName()
})

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
</script>

<style scoped lang="scss">
.toggle-theme {
  position: absolute;
  width: 100%;
  bottom: 49px;
}

.logout-button {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 16px;
  letter-spacing: 2px;
  text-align: center;
  box-shadow: var(--ion-box-shadow);
  --background: var(--ion-item-background); /* Темный фон для кнопки выхода */
}

ion-fab {
  position: fixed;
  right: 0;
  margin-right: 1em;
  z-index: 10;
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
  background-color: #4caf50; /* Цвет фона закладки */
  box-shadow: -3px 0 5px rgba(0, 0, 0, 0.2); /* Тень с левой стороны */
  display: flex; /* Для центрирования иконки внутри */
  align-items: center; /* Вертикальное выравнивание */
  justify-content: center; /* Горизонтальное выравнивание */
  cursor: pointer; /* Изменение курсора при наведении */
}

.bookmark-icon {
  transform: rotate(90deg); /* Поворот иконки на 90 градусов */
  font-size: 12px; /* Размер иконки */
  color: white;
}

.bookmark-button:hover {
  background-color: #4caf50; /* Цвет фона при наведении */
}

ion-menu {
  --background: var(--ion-item-background); /* Темный фон */
  --color: var(--ion-text-color); /* Зеленый текст */
}

ion-header {
  --background: var(--ion-background-color); /* Темный фон для шапки */
}

ion-toolbar {
  --background: var(--ion-toolbar-background);
  --color: var(--ion-text-color);
}

ion-title {
  color: var(--ion-text-color);
  letter-spacing: 2px;
}

ion-input {
  --background: #262626; /* Темный фон для поля ввода */
  --placeholder-color: #757575; /* Цвет плейсхолдера */
  --color: #fff; /* Белый текст */
  border: 1px solid #333; /* Граница поля ввода */
}

ion-item {
  --background: var(--ion-item-background); /* Темный фон для элементов списка */
  --color: var(--ion-text-color); /* Белый текст */
}

ion-label[color="danger"] {
  color: #ff3b30; /* Красный цвет для опасных действий */
}
</style>
