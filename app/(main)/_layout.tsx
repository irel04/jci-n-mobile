import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from "expo-router"
import Navigation from "@/components/ui/Navigation"

const MainLayout = () => {
  return (
	<Tabs screenOptions={{headerShown: false}}>
		<Tabs.Screen name="(home)"/>
		<Navigation/>
	</Tabs>
  )
}

export default MainLayout