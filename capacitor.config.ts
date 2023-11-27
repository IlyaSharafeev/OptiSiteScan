import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Opti Scan',
  webDir: 'dist',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '105905256008-oqlphilb39m0ikris3jqi2l1gel8obmt.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
  server: {
    androidScheme: 'https',
    url: "https://opti-site-scan.vercel.app"
  }
};

export default config;
