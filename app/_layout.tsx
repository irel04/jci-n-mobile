
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from "expo-router"

const AppLayout = () => {
  return (
	<Stack screenOptions={{headerShown: false}} >
		  <Stack.Screen name="auth" />
		  <View className="bg-white-500">
			  
		  </View>
	</Stack>
  )
}

export default AppLayout