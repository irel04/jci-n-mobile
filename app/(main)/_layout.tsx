import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from "expo-router"
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const MainLayout = () => {
	
	return (
		<Tabs screenOptions={{ headerShown: false, headerTintColor: "#0E46A3", animation:'fade', tabBarStyle: {
			backgroundColor: "#E3E3E3",
			paddingTop: 6
		}}}>
			<Tabs.Screen name="index"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <Entypo name="home" size={22} color={color}
					 />
				}}
			/>

			<Tabs.Screen name="(statistics)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({color}) => <Entypo name="bar-graph" size={22} color={color} />
				}}
			/>

			<Tabs.Screen name="(route)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({color}) => <FontAwesome name="map" size={20} color={color} />
				}}
			/>

			<Tabs.Screen name="(notification)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({color}) => <Ionicons name="notifications" size={22} color={color} />
				}}
			/>
			<Tabs.Screen name="(profile)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({color}) => <FontAwesome name="user" size={22} color={color} />
				}}
			/>

		</Tabs>
	)
}

export default MainLayout