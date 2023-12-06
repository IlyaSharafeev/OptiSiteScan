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
    const emailUser = ref("");
    const nameUser = ref("");
    const currentTheme = ref("");

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

    const sendPDF = async (file: Blob) => {
        console.log(file);
        isLoading.value = true;
        const email = await getEmail();
        const name = await getName();
        try {
            // Создаем экземпляр FormData
            const formData = new FormData();
            //@ts-ignore
            formData.append('gmail', email);
            // formData.append('link', ""); // Если требуется, добавьте реальную ссылку
            //@ts-ignore
            formData.append('name', name);
            formData.append('file', file); // Предполагается, что 'file' это Blob или File

            const response = await axios.post('https://opti-site-scan-backend.onrender.com/sendpdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            isLoading.value = false;
        } catch (error) {
            console.log(error);
            isLoading.value = false;
        }
    };

    const getSearchData = async () => {
        const res = await Preferences.get({ key: 'searchData'});
        if (res.value) {
            searchData.value = JSON.parse(res.value);
            return;
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

    const saveEmail = async (email: string) => {
        await Preferences.set({
            key: 'email',
            value: email,
        });
        emailUser.value = email;
    };

    const saveName = async (name: string) => {
        await Preferences.set({
            key: 'name',
            value: name,
        });
        console.log(name);
        nameUser.value = name;
    };

    const getName = async () => {
        const { value } = await Preferences.get({ key: 'name' });
        return value;
    };

    const getEmail = async () => {
        const { value } = await Preferences.get({ key: 'email' });
        return value;
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
        emailUser,
        nameUser,
        currentTheme,
        saveToken,
        getToken,
        getEmail,
        getName,
        logout,
        scanURL,
        getSearchData,
        sendPDF,
        saveEmail,
        saveName,
    };
});
