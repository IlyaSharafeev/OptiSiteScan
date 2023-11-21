<template>
  <ion-page>
    <ion-content class="ion-padding content">
      <div><h1>in progress</h1></div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonContent,
  IonPage,
  IonItem,
  IonInput,
} from '@ionic/vue';
import {useSearchStore} from "@/stores/main.ts";

const searchStore = useSearchStore();
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
