import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from "expo-router"

const MainLayout = () => {
  return (
	<Tabs screenOptions={{headerShown: false}}>
		<Tabs.Screen name="(home)"/>
	</Tabs>
  )
}

export default MainLayout