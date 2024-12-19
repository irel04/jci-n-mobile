import Input from "@/components/ui/Input"
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TouchableWithoutFeedback, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import { useState } from "react";

const Main = () => {
	
	const [value, setValue] = useState({
		email: "kianirel56@gmail.com",
		password: "pogiako123"
	})

	const router = useRouter()

	const handlePressContinue = async () => {
		router.push("/(main)")
	}

	return (
		<View className="flex flex-col h-screen">
			<KeyboardAvoidingView className="flex-col justify-center items-center pt-5" behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<View className="flex-auto flex-col justify-center items-center w-full">
					<Image source={require("@/assets/images/pup-logo.png")} className="flex-none" />
					<Text className="text-h3 font-bold text-brand-700 mt-32">Welcome Back</Text>
					<Text className="text-body">It's nice to see you again Kups! Please enter your details</Text>
				</View>

				{/* Form */}
				<View className="flex-auto flex-col gap-7 w-full items-center justify-center h-72" >
					<Input onChangeText={(email) => setValue({...value, email})} placeholder="Email" id="email" value={value.email}>
						<FontAwesome name="user-o" size={13} color="#757576" />
					</Input>
					<Input onChangeText={(password) => setValue({...value, password})} placeholder="Password" id="password" value={value.password}>
						<Feather size={13} name="lock" color="#757576"/>
					</Input>
				</View>
			</KeyboardAvoidingView>
			{/* Button */}
			<View className="justify-center items-center flex-auto h-1/6 gap-5 px-5">
				<CustomButton onPress={handlePressContinue} title="Continue" styleType={StyleType.BRAND_PRIMARY}>
					<Text className="text-white-500">Continue</Text>
					<AntDesign name="arrowright" size={16} color="white" />
				</CustomButton>
				<Pressable>
					<Text className="underline text-body">Forgot Password</Text>
				</Pressable>
			</View>
			<View className="justify-center items-center flex-auto h-1/6 gap-5 px-5">
				<Text className="text-caption text-neutral-500 text-center">This is a mobile application developed for a research project titled "Enhancing Garbage Management: A Mobile-Integrated, Solar-Powered Intelligent Waste Collection System."</Text>
			</View>
		</View>
	)
}


export default Main