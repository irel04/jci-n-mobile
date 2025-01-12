import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, Tabs } from "expo-router"
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSession } from "@/contexts/auth";

const MainLayout = () => {

	const { isLoading, session } = useSession()




	// You can keep the splash screen open, or render a loading screen like we do here.
	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!session) {
		// On web, static rendering will stop here as the user is not authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href="/sign-in" />;
	}
	
	
	return (
		<Tabs screenOptions={{ headerShown: false, headerTintColor: "#0E46A3", tabBarStyle: {
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