
import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from "expo-router"

// This tab is the index.tsx that is transform into tabs when partnered with layout supported by expo
const AuthLayout = () => {
	return <Tabs screenOptions={{headerShown: false, tabBarStyle: {display: "none"}}}/>
}

export default AuthLayout