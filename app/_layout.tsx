
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from "expo-router"

const AppLayout = () => {
  return (
	<Stack screenOptions={{headerShown: false}} >
		<Stack.Screen name="(auth)" />

	</Stack>
  )
}

export default AppLayout