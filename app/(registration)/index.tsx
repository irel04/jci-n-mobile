import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import Input from "@/components/ui/Input";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TUserCredentials } from "@/components/types";
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import { useRouter } from "expo-router";
import { useRegistrationContext } from "@/app/(registration)/_layout";

const Step1 = () => {

	const { userCredentialState, setCurrentPage } = useRegistrationContext()

	// const [value, setValue] = useState<TUserCredentials>({
	// 	email: null,
	// 	password: null
	// })

	const router = useRouter()

	const handleGoPage2 = async () => {
		setCurrentPage(2)
		router.push("/(registration)/step-2")
	}


	const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)

	return (
		<View className="flex-1 bg-white-500">
			<Feather name="mail" size={24} color="#737373" />
			{/* Form */}
			<View className="mt-4 gap-2">
				<Text className="text-h5 font-semibold text-brand-700">Create Account</Text>
				<Text className="text-neutral-500">To get startted, create an account. This help us keep your personal information safe and secured</Text>
				<View className="flex gap-4 mt-4">
					<Input onChangeText={(email) => userCredentialState.setUserCredentials({ ...userCredentialState.userCredentials, email })} placeholder="Email" id="email" value={userCredentialState.userCredentials.email}>
						<FontAwesome name="user-o" size={13} color="#757576" />
					</Input>
					<Input onChangeText={(password) => userCredentialState.setUserCredentials({ ...userCredentialState.userCredentials, password })} secureTextEntry={isPasswordHidden} placeholder="Password" id="password" value={userCredentialState.userCredentials.password} >
						<TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
							<Feather size={13} name={isPasswordHidden ? 'eye-off' : 'eye'} color="#757576" />
						</TouchableOpacity>
					</Input>
				</View>
			</View>
			<View className="flex-grow justify-center items-center">
				<CustomButton onPress={handleGoPage2} styleType={StyleType.BRAND_PRIMARY}>
					<Text className="text-white-500"> Next </Text>
					<AntDesign name="arrowright" size={16} color="white" />
				</CustomButton>
			</View>

		</View>
	)
}

export default Step1