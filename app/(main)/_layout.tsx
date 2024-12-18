import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from "expo-router"
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const MainLayout = () => {
	return (
		<Tabs screenOptions={{ headerShown: false, headerTintColor: "#0E46A3"}}>
			<Tabs.Screen name="index"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color}
					 />
				}}
			/>

			<Tabs.Screen name="(statistics)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({color}) => <Octicons name="graph" size={21 } color={color} />
				}}
			/>
			<Tabs.Screen name="(route)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({color}) => <Feather name="map" size={21} color={color} />
				}}
			/>
			<Tabs.Screen name="(notification)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({color}) => <Ionicons name="notifications-outline" size={24} color={color} />
				}}
			/>
			<Tabs.Screen name="(profile)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({color}) => <AntDesign name="user" size={24} color={color} />
				}}
			/>

		</Tabs>
	)
}

export default MainLayout