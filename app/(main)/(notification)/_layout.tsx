import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from "expo-router"

const NotificationLayout = () => {
	return <Tabs screenOptions={{headerShown: false, tabBarStyle: {display: "none"}}}/>
}

export default NotificationLayout