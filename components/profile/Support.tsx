import { View, Text } from 'react-native'
import React from 'react'
import Fontisto from "@expo/vector-icons/Fontisto"
import Ionicons from "@expo/vector-icons/Ionicons"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons"
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import * as WebBrowser from 'expo-web-browser';


const Support = () => {

	const handleOpenLinks = async (path: string) => {
		try {
			await WebBrowser.openBrowserAsync(`https://jci-n-web.vercel.app/${path}`)
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<View className="flex flex-1 gap-1 justify-center">
			<Text className="text-brand-900 font-bold text-title2">Support</Text>
			<View className="flex flex-col gap-3 p-5 rounded-lg ">
				<View className="flex flex-row items-center gap-1">
					<AntDesign name="exclamationcircleo" size={16} color="#919192" className="flex-none" />
					<Text className="text-gray-500 flex-1 text-body">Contact Us</Text>
					<Entypo name="chevron-right" size={16} color="#919192" className="flex-none" onPress={() => handleOpenLinks("/?contact_us=true")}/>
				</View>
				<View className="flex flex-row items-center gap-1">
					<AntDesign name="filetext1" color="#919192" className="flex-none" />
					<Text className="text-gray-500 flex-1 text-body">Terms and conditions</Text>
					<Entypo name="chevron-right" size={16} color="#919192" className="flex-none" onPress={() => handleOpenLinks("/terms-and-conditions")}/>
				</View>
				<View className="flex flex-row items-center gap-1">
					<Ionicons name="shield-checkmark-outline" size={16} color="#919192" className="flex-none" />
					<Text className="text-gray-500 flex-1 text-body">Privacy</Text>
					<Entypo name="chevron-right" size={16} color="#919192" className="flex-none" onPress={() => handleOpenLinks("/privacy-policy")}/>
				</View>
				<View className="flex flex-row items-center gap-1">
					<AntDesign name="questioncircleo" size={16} color="#919192" className="flex-none" />
					<Text className="text-gray-500 flex-1 text-body">FAQS</Text>
					<Entypo name="chevron-right" size={16} color="#919192" className="flex-none" onPress={() => handleOpenLinks("/faqs")}/>
				</View>
			</View>
		</View>
	)
}

export default Support