import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nooralqloob.app',
  appName: 'نبض الروح',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#4CAF50",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      spinnerColor: "#ffffff"
    },
    LocalNotifications: {
      smallIcon: "ic_stat_prayer",
      iconColor: "#4CAF50"
    },
    Geolocation: {
      permissions: ["location"]
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
  },
};

export default config;
