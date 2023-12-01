import { defineStore } from 'pinia';
import axios from 'axios';
import {ref} from "vue";
import {useRouter} from "vue-router";
import {GetResult, Preferences} from '@capacitor/preferences';

//TODO: create interface
interface ScanData {
    results: string[];
}

export const useSearchStore = defineStore("search", () => {
    const router = useRouter();
    const searchData = ref<ScanData | null | any>(null);
    const isLoading = ref(false);
    const tokenStore = ref("");

    const scanURL = async (link: string) => {
        isLoading.value = true;
        try {
            const response = await axios.post('https://opti-site-scan-backend.onrender.com/', { link });
            searchData.value = Object.values(response.data);
            isLoading.value = false;
            await Preferences.set({
                key: 'searchData',
                value: JSON.stringify(searchData.value) ,
            });
            await getSearchData();
            return response.data;
        } catch (error) {
            console.error('Error scanning URL:', error);
            isLoading.value = false;
            return null;
        }
    };

    const getSearchData = async () => {
        const res = await Preferences.get({ key: 'searchData'});
        if (res.value) {
            searchData.value = JSON.parse(res.value);
        }
    }

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

    const logout = async () => {
        await Preferences.remove({ key: 'token' });
        await Preferences.remove({ key: 'searchData' });
        await router.push({name: "login"})
    };

    return {
        tokenStore,
        searchData,
        isLoading,
        saveToken,
        getToken,
        logout,
        scanURL,
        getSearchData,
    };
});
