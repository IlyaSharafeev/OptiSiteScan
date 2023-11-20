<template>
  <ion-page>
    <ion-content class="ion-padding content">
      <div class="form-container">
        <h2 class="form-header">Welcome to O.S.S.</h2>

        <form v-if="showSignIn" @submit.prevent="handleSignIn" class="auth-form">
          <ion-list lines="none">
            <ion-item>
              <ion-input type="text" placeholder="Email" v-model="email" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-input type="password" placeholder="Password" v-model="password" required></ion-input>
            </ion-item>
          </ion-list>
          <ion-button type="submit" expand="block" class="auth-button">Sign In</ion-button>
          <p class="toggle-form" @click="toggleForm">Don't have an account? Sign Up</p>
        </form>

        <form v-else @submit.prevent="handleSignUp" class="auth-form">
          <ion-list lines="none">
            <ion-item>
              <ion-input type="email" placeholder="Email" v-model="email" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-input type="text" placeholder="Username" v-model="username" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-input type="password" placeholder="Password" v-model="password" required></ion-input>
            </ion-item>
          </ion-list>
          <ion-button type="submit" expand="block" class="auth-button">Sign Up</ion-button>
          <p class="toggle-form" @click="toggleForm">Already have an account? Sign In</p>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/vue';
import axios from "axios";
import {useSearchStore} from "@/stores/main.ts";

const searchStore = useSearchStore();

const showSignIn = ref(true);
const username = ref('');
const email = ref('');
const password = ref('');
const apiUrl = 'https://strapi-optiscan.onrender.com';

const handleSignIn = async () => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/local`, {
      identifier: email.value,
      password: password.value
    });
    await searchStore.saveToken(response.data.jwt);
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    // Обработайте успешный вход (например, сохраните токен и перенаправьте пользователя)
  } catch (error) {
    console.error('Error during sign in:', error.response);
    // Обработайте ошибки входа
  }
};

const handleSignUp = async () => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/local/register`, {
      username: username.value,
      email: email.value,
      password: password.value
    });
    await searchStore.saveToken(response.data.jwt);
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    // Обработайте успешную регистрацию
  } catch (error) {
    console.error('Error during sign up:', error.response);
    // Обработайте ошибки регистрации
  }
};

const toggleForm = () => {
  showSignIn.value = !showSignIn.value;
};
</script>

<style scoped>
.form-header {
  text-align: center;
  color: #0097ff; /* Зеленый цвет, вы можете выбрать любой */
  margin-bottom: 20px; /* Отступ снизу */
  font-family: 'Arial', sans-serif; /* Шрифт, можно заменить на другой */
  font-size: 24px; /* Размер шрифта */
  font-weight: bold; /* Жирное начертание */
  text-shadow: 1px 1px 2px #000; /* Тень текста для лучшей читаемости на разных фонах */
  letter-spacing: 1px; /* Расстояние между буквами */
}

.content {
  position: relative;
  height: 100vh;
  background-color: #333;
}

.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  width: 100%;
  padding: 0 20px; /* Добавьте небольшой внутренний отступ, если нужно */
}

.auth-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

ion-item {
  --background: #444;
  --color: #ddd;
  border-radius: 8px;
  margin-top: 0.5em;
}

ion-input {
  --placeholder-color: #bbb;
  --color: #fff;
}

.auth-button {
  --background: #0d6efd;
  --background-activated: #0a58ca;
  --border-radius: 8px;
  margin-top: 1em;
}

.toggle-form {
  text-align: center;
  color: #aaa;
  margin-top: 1em;
  font-size: 0.8em;
  cursor: pointer;
}

.list-md {
  background: none;
}
</style>