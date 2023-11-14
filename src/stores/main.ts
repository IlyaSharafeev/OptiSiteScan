import {defineStore} from 'pinia';

export const useSearchStore = defineStore("search", () => {

    const scanURL = (url: string) => {
        console.log(url);
    }

    return {
        scanURL,
    }
})
