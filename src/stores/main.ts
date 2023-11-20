import { defineStore } from 'pinia';
import axios from 'axios';
import {Storage} from "@capacitor/storage";
import {ref} from "vue";
import {useRouter} from "vue-router";

export const useSearchStore = defineStore("search", () => {
    const router = useRouter();
    const searchData = ref(null);

    const scanURL = async (link: string) => {
        try {
            const response = await axios.post('https://opti-site-scan-backend.onrender.com/', { link });
            console.log(response.data);
            searchData.value = response.data;
            return response.data;
        } catch (error) {
            console.error('Error scanning URL:', error);
            return null;
        }
    };
    const tokenStore = ref("");

    const saveToken = async (token: string) => {
        tokenStore.value = token;
        await Storage.set({
            key: 'authToken',
            value: token
        });
        await router.push({name: "tab1"});
    };

    const getToken = async () => {
        const { value } = await Storage.get({ key: 'authToken' });
        return value;
    };

    const removeToken = async () => {
        await Storage.remove({ key: 'authToken' });
    };

    return {
        tokenStore,
        searchData,
        saveToken,
        getToken,
        removeToken,
        scanURL,
    };
});
