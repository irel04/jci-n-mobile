import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

const OnDevelopment = () => {
	return (
		<View className="flex items-center h-full justify-center gap-20">
			<MaterialCommunityIcons name="tools" size={56} color="#757576"/>
			<View className="flex items-center justify-center">
				<Text className="text-title2 text-neutral-400">Hi! We're still on</Text>
				<Text className="text-h2 font-bold text-neutral-500">Development</Text>
				<Text className="text-title2 text-neutral-400 mt-5">We'll lunch this feature very soon.</Text>
				<Text className="text-title2 text-neutral-400 mt-2">Stay Tune.</Text>
			</View>
		</View>
	)
}

export default OnDevelopment