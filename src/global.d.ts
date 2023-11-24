// global.d.ts
interface GoogleOAuth2 {
    initTokenClient(args: {
        client_id: string;
        scope: string;
        discoveryDocs: string[];
        callback: (response: any) => void;
    }): {
        requestAccessToken: () => void;
    };
}

interface GoogleAccounts {
    oauth2: GoogleOAuth2;
}

interface Window {
    google?: {
        accounts: GoogleAccounts;
    };
}
