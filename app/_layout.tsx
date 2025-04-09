
import { SessionProvider } from "@/contexts/auth";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";

const AppLayout = () => {

  return (

    <SessionProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" networkActivityIndicatorVisible={true}/>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </SessionProvider>

  )
}

export default AppLayout