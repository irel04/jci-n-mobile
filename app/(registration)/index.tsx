import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Input from "@/components/ui/Input";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TUserCredentials } from "@/components/types";
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import { useRouter } from "expo-router";
import { useRegistrationContext } from "@/app/(registration)/_layout";
import * as yup from "yup";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import { supabase } from "@/utils/supabase";

const schema = yup.object().shape({
	email: yup.string().email("Please enter a valid email").required("This field is required"),
	password: yup.string().min(6).required("This field is required")
})

const Step1 = () => {

	const { setCurrentPage, setEmail, setAuthId } = useRegistrationContext()

	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
		mode: "onChange"

	})


	const [isLoading, setIsloading] = useState<boolean>(false)

	const router = useRouter()

	const handleGoPage2 = async (value: TUserCredentials) => {
		const { email, password } = value
		setIsloading(true)
		setEmail(email)
		try {

			

			const { data: signUpData, error } = await supabase.auth.signUp({
				email,
				password
			})

			console.log(signUpData)

			if(signUpData.user.user_metadata.email_verified){
				setAuthId(signUpData.user.id)
				setCurrentPage(3)
				router.push("/(registration)/step-3")
				return
			}

			if(error) throw error


			setAuthId(signUpData.user.id)
			setCurrentPage(2)
			router.push("/(registration)/step-2")

			


		} catch (error) {
			console.error(error)
		} finally {
			setIsloading(false)
		}



	}


	const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)

	if (isLoading) {
		return <LoadingAnimation displayMessage="Processing" backgroundColor="bg-white-500" />
	}

	

	return (
		<View className="flex-1 bg-white-500">
			<Feather name="mail" size={24} color="#737373" />
			{/* Form */}
			<View className="mt-4 gap-2">
				<Text className="text-h5 font-semibold text-brand-700">Create Account</Text>
				<Text className="text-neutral-500">To get startted, create an account. This help us keep your personal information safe and secured</Text>
				<View className="flex gap-2 mt-4">
					<Controller control={control} name="email" render={({ field: { onChange, value } }) =>
						<Input onChangeText={onChange} value={value} placeholder="Email" id="email" error={errors.email}>
							<FontAwesome name="user-o" size={13} color="#757576" />
						</Input>
					} />

					<Controller control={control} name="password" render={({ field: { onChange, value } }) => <Input onChangeText={onChange} value={value} secureTextEntry={isPasswordHidden} placeholder="Password" id="password" error={errors.password}>
						<TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
							<Feather size={13} name={isPasswordHidden ? 'eye-off' : 'eye'} color="#757576" />
						</TouchableOpacity>
					</Input>} />
				</View>
			</View>
			<View className="flex-grow justify-center items-center">
				<CustomButton onPress={handleSubmit(handleGoPage2)} styleType={StyleType.BRAND_PRIMARY}>
					<Text className="text-white-500" > Next </Text>
					<AntDesign name="arrowright" size={16} color="white" />
				</CustomButton>
			</View>

		</View>
	)
}

export default Step1