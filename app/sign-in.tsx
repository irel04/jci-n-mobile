import Input from "@/components/ui/Input"
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import React from "react";
import { useSession } from "@/contexts/auth";
import { supabase } from "@/utils/supabase";

const Signin = () => {

	const [value, setValue] = useState({
		email: "kianirel56@gmail.com",
		password: "irel123"
	})

	const [isPasswordHidden, setIsPasswordHidden] = useState(true)
	const [isLoading, setIsLoading] = useState(false)


	// Use the `signIn` function from the `useSession` hook to sign in the user. This provides the session context that will be used to check if the user is authenticated.
	const { signIn, session } = useSession()


	const handlePressContinue = async () => {
		setIsLoading(true)
		await signIn(value)
		setIsLoading(false)
	}

	if(session){
		return <Redirect href="/(main)" />
	}

	return (
		<View className="bg-white-500 text-base h-screen">
			<View className="flex flex-col h-screen">
				<KeyboardAvoidingView className="flex-col justify-center items-center pt-5" behavior={Platform.OS === "ios" ? "padding" : "height"}>
					<View className="flex-auto flex-col justify-center items-center w-full">
						<Image source={require("@/assets/images/pup-logo.png")} className="flex-none" />
						<Text className="text-h3 font-bold text-brand-700 mt-32">Welcome Back</Text>
						<Text className="text-body">It's nice to see you again! Please enter your details</Text>
					</View>

					{/* Form */}
					<View className="flex-auto flex-col gap-5 w-full items-center justify-center h-72" >
						<Input onChangeText={(email) => setValue({ ...value, email })} placeholder="Email" id="email" value={value.email}>
							<FontAwesome name="user-o" size={13} color="#757576" />
						</Input>
						<Input onChangeText={(password) => setValue({ ...value, password })} secureTextEntry={isPasswordHidden} placeholder="Password" id="password" value={value.password}>
							<TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
								<Feather size={13} name={isPasswordHidden ? 'eye-off' : 'eye'} color="#757576" />
							</TouchableOpacity>
						</Input>
					</View>
				</KeyboardAvoidingView>
				{/* Button */}
				<View className="justify-center items-center flex-auto h-1/6 gap-5 px-5">
					<CustomButton onPress={handlePressContinue}  styleType={StyleType.BRAND_PRIMARY}>
						<Text className="text-white-500">{isLoading ? "Please wait..." : "Continue"} </Text>
						{!isLoading && <AntDesign name="arrowright" size={16} color="white" />}
					</CustomButton>
					<Pressable>
						<Text className="underline text-body">Forgot Password</Text>
					</Pressable>
				</View>
				<View className="justify-center items-center flex-auto h-1/6 gap-5 px-5">
					<Text className="text-caption text-neutral-500 text-center">This is a mobile application developed for a research project titled "Enhancing Garbage Management: A Mobile-Integrated, Solar-Powered Waste Collection System."</Text>
				</View>
			</View>
		</View>
	)
}


export default Signin