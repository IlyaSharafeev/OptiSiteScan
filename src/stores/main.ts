import { defineStore } from 'pinia';
import axios from 'axios';
import {ref} from "vue";
import {useRouter} from "vue-router";
import { Preferences } from '@capacitor/preferences';

export const useSearchStore = defineStore("search", () => {
    const router = useRouter();
    const searchData = ref<unknown[] | null>(null);
    const isLoading = ref(false);

    const scanURL = async (link: string) => {
        isLoading.value = true;
        try {
            const response = await axios.post('https://opti-site-scan-backend.onrender.com/', { link });
            searchData.value = Object.values(response.data);
            console.log(response.data);
            console.log(searchData.value);
            isLoading.value = false;
            return response.data;
        } catch (error) {
            console.error('Error scanning URL:', error);
            isLoading.value = false;
            return null;
        }
    };
    const tokenStore = ref("");

    const saveToken = async (token: string) => {
        await Preferences.set({
            key: 'token',
            value: token,
        });
        tokenStore.value = token;
        await router.push({name: "tab1"});
    };

    const getToken = async () => {
        const { value } = await Preferences.get({ key: 'token' });
        return value;
    };

    const removeToken = async () => {
        await Preferences.remove({ key: 'my_token' });
    };

    return {
        tokenStore,
        searchData,
        isLoading,
        saveToken,
        getToken,
        removeToken,
        scanURL,
    };
});
