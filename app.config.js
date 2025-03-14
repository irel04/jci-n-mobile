export default () => ({
  expo: {
    name: "JCi-N",
    slug: "JCi-N",
    version: "0.1.0",
    orientation: "portrait",
    icon: "./assets/images/pup-logo.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    // ios: {
    //   supportsTablet: true,
    // },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/pup-logo.png",
        backgroundColor: "#ffffff",
      },
      package: "com.kianirel.dev.thesismobile",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_GOOGLE_MAPS_API_KEY, // Use environment variable
        },
      },
      googleServicesFile: "./google-services.json"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/pup-logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "expo-font",
        {
          fonts: ["./assets/fonts/Montserrat-Regular.ttf"],
        },
      ],
      [
        "expo-location",
        {
          isAndroidBackgroundLocationEnabled:
            "Allow Thesis app to use your location.",
        },
      ],
      [
        "expo-notifications",
        {
          "icon": "./assets/images/notification_icon.png",
          "color": "#ffffff",
          "defaultChannel": "default",
          "sounds": [
            "./local/assets/notification_sound.wav",
            "./local/assets/notification_sound_other.wav"
          ],
          "enableBackgroundRemoteNotifications": true
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "cf158ac6-e5de-4add-91a2-e34c6c414212",
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/cf158ac6-e5de-4add-91a2-e34c6c414212",
      requestHeaders: {
        "expo-channel-name": "preview",
      },
    },
  },
});