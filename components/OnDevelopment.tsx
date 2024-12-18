import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

const OnDevelopment = () => {
	return (
		<View className="flex items-center h-full justify-center gap-20">
			<MaterialCommunityIcons name="tools" size={56} color="#85B0F5"/>
			<View className="flex items-center justify-center">
				<Text className="text-title2 text-neutral-400">Hi! We're still</Text>
				<Text className="text-h2 font-bold text-brand-200">Developing</Text>
				<Text className="text-title2 text-neutral-400">We'll lunch this feature very soon</Text>
			</View>
		</View>
	)
}

export default OnDevelopment