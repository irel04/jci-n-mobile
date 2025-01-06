
import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import OnDevelopment from "@/components/OnDevelopment";
import GoogleMaps from "@/components/google-maps/GoogleMaps";

const Routes = () => {
	return (
		// <OnDevelopment/>
		<View className="flex w-screen h-full border-2 border-red-500">
			<GoogleMaps />
		</View>
	)
}

export default Routes