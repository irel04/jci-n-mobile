import Input from "@/components/ui/Input";
import { Image, KeyboardAvoidingView, Platform, Pressable, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, Redirect, useRouter } from "expo-router";
import { useState } from "react";
import React from "react";
import { useSession } from "@/contexts/auth";

const Signin = () => {

	const router = useRouter()

	const [value, setValue] = useState({
		email: "",
		password: ""
	})

	const [isPasswordHidden, setIsPasswordHidden] = useState(true)
	const [isLoading, setIsLoading] = useState(false)


	// Use the `signIn` function from the `useSession` hook to sign in the user. This provides the session context that will be used to check if the user is authenticated.
	const { signIn } = useSession()

	// if (session) {
	// 	return <Redirect href="/(main)" />
	// }

	const handlePressContinue = async () => {
		setIsLoading(true)
		await signIn(value)
		setIsLoading(false)
	}



	return (
		<View className="h-screen" style={{ padding: 20 }}>
			<KeyboardAvoidingView className="flex-1 flex flex-col justify-center items-center" behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<View className="flex-grow flex-col justify-center items-center w-full">
					<View className="flex-grow">
						<Image source={require("@/assets/images/pup-logo.png")} className="flex-none" />
					</View>
					<Text className="text-h3 font-bold text-brand-700">Welcome Back</Text>
					<Text className="text-body">It's nice to see you again! Please enter your details</Text>
				</View>

				{/* Form */}
				<View className="flex-grow flex flex-col gap-1 w-max  items-center justify-center h-max" >
					<Input onChangeText={(email) => setValue({ ...value, email })} placeholder="Email" id="email" value={value.email}>
						<FontAwesome name="user-o" size={13} color="#757576" />
					</Input>
					<Input onChangeText={(password) => setValue({ ...value, password })} secureTextEntry={isPasswordHidden} placeholder="Password" id="password" value={value.password}>
						<TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
							<Feather size={13} name={isPasswordHidden ? 'eye-off' : 'eye'} color="#757576" />
						</TouchableOpacity>
					</Input>
					<Pressable className="self-end" onPress={() => console.log("hello")}>
						<Text className="underline text-xs text-neutral-500">Forgot Password</Text>
					</Pressable>
				</View>
			</KeyboardAvoidingView>
			{/* Button */}
			<View className="justify-center items-center  gap-4 ">
				<CustomButton onPress={handlePressContinue} styleType={StyleType.BRAND_PRIMARY}>
					<Text className="text-white-500">{isLoading ? "Please wait..." : "Continue"} </Text>
					{!isLoading && <AntDesign name="arrowright" size={16} color="white" />}
				</CustomButton>

				<View className="flex flex-row gap-1">
					<Text className="text-sm text-neutral-500">Don't have account? </Text>
					<Pressable onPress={() => router.push("/(registration)")}>
						<Text className="text-sm text-brand-300 underline">Register</Text>
					</Pressable>
				</View>
			</View>
			<View className="justify-center items-center h-1/6 gap-5 px-5">
				<Text className="text-caption text-neutral-500 text-center">This is a mobile application developed for a research project titled "Enhancing Garbage Waste Collection: A Mobile Integration Solar Powered System"</Text>
			</View>
		</View>
	)
}


export default Signin