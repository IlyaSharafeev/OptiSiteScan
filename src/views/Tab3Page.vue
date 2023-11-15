<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Авторизация</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="centering-container">
        <form @submit.prevent="onSubmit" class="auth-form">
          <ion-item lines="full">
            <ion-label position="floating">Имя пользователя</ion-label>
            <ion-input type="text" v-model="username"></ion-input>
          </ion-item>
          <ion-item lines="full">
            <ion-label position="floating">Пароль</ion-label>
            <ion-input type="password" v-model="password"></ion-input>
          </ion-item>
          <ion-button expand="block" type="submit" class="auth-button">Войти</ion-button>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const onSubmit = () => {
  // Обработка данных формы
};
</script>

<style>
.centering-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.auth-form {
  max-width: 400px;
  width: 100%;
  border-radius: 8px;
  background-color: white;
  padding: 20px;
  box-shadow: none; /* Убираем тень */
}

ion-item {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --inner-padding-start: 0;
  --min-height: 40px; /* Уменьшаем высоту элементов */
  --border-color: #e0e0e0; /* Цвет границы */
}

.auth-button {
  margin-top: 20px;
  --background: #3880ff; /* Цвет фона кнопки */
  --background-activated: #3171e0; /* Цвет фона кнопки при нажатии */
  --border-radius: 4px; /* Скругление углов кнопки */
}
</style>
