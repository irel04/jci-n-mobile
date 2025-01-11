
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from "expo-router"
import "../global.css"
import { SessionProvider } from "@/contexts/auth"


const AppLayout = () => {


  return (
 
    <SessionProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SessionProvider>

  )
}

export default AppLayout