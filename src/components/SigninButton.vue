<template>
  <div :class="customClass">
    <div ref="ButtonSignin" @click.stop="signIn" class="g_id_signin sign-in-button">Sign in with Google</div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import {useSearchStore} from "@/stores/main.ts";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {Capacitor} from "@capacitor/core";

const searchStore = useSearchStore();

defineProps({
  customClass: {
    type: String
  }
})

const callbackLoginWEB = async (response: any) => {
  searchStore.isLoading = true;
  try {
    const accessToken = response.access_token;
    await searchStore.saveToken(response.access_token);
    const res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
      },
    })
    await searchStore.saveEmail(res.data.email);
    await searchStore.saveName(res.data.name);
    searchStore.isLoading = false;
  } catch (err) {
    searchStore.isLoading = false;
    console.error('Error:', err);
  }
}

const callbackLoginNATIVE = async (response: any) => {
  searchStore.isLoading = true;
  try {
    await searchStore.saveToken(response.authentication.accessToken);
    await searchStore.saveEmail(response.email);
    await searchStore.saveName(response.displayName);
    searchStore.isLoading = false;
  } catch (err) {
    searchStore.isLoading = false;
    console.error('Error:', err);
  }
}

const signIn = async () => {
  if (Capacitor.isNativePlatform()) {
    // Вызывать init() только на мобильных устройствах
    await GoogleAuth.initialize();

    try {
      const user = await GoogleAuth.signIn();
      console.log(user);
      await callbackLoginNATIVE(user);
      // Используйте данные пользователя
    } catch (error) {
      console.error("Error during Google sign in", error);
    }
  } else {
    window.google!.accounts.oauth2.initTokenClient({
      client_id: "105905256008-kv62n8kbf3jtm8nv90dmvsgl3ovfot7q.apps.googleusercontent.com",
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      callback: callbackLoginWEB,
    }).requestAccessToken();
  }
};
</script>

<style scoped lang="scss">
.g_id_signin {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 190px;
  cursor: pointer;
  transition: background-color .3s, box-shadow .3s;

  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);

  color: #d0d0d0;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;

  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: #383838;
  background-repeat: no-repeat;
  background-position: 12px 11px;

  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25);
  }

  &:active {
    background-color: #eeeeee;
  }

  &:focus {
    outline: none;
    box-shadow:
        0 -1px 0 rgba(0, 0, 0, .04),
        0 2px 4px rgba(0, 0, 0, .25),
        0 0 0 3px #c8dafc;
  }
}

.sign-in-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
