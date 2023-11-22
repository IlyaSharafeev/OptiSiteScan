import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Opti Scan',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: "https://opti-site-scan.vercel.app"
  }
};

export default config;
