import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRegistrationContext } from "@/app/(registration)/_layout";
import { useRouter } from "expo-router";
import Input from "@/components/ui/Input";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Controller, useFormContext } from "react-hook-form";
import { TUserPersonalInfo } from "@/components/types";
import { supabase } from "@/utils/supabase";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import OnScreenModal from "@/components/ui/OnScreenModal";
import Checkbox from 'expo-checkbox';
import * as WebBrowser from 'expo-web-browser';


const Step4 = () => {

	const [isChecked, setChecked] = useState(false);

	const { setCurrentPage } = useRegistrationContext()

	// const [value, setValue] = useState<TUserCredentials>({
	// 	email: null,
	// 	password: null
	// })
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const { authId: auth_id } = useRegistrationContext()

	const { handleSubmit, formState: { errors }, control } = useFormContext()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const router = useRouter()

	const handleSubmitEntry = async (value: TUserPersonalInfo) => {

		if(!isChecked) return 

		setIsLoading(true)
		console.log(value)
		try {
			const { error } = await supabase.from("users_details").insert({ ...value, auth_id })

			if (error) throw error

			setIsModalOpen(true)

		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}



	const handlePressConfirm = () => {
		setIsModalOpen(false)
		setCurrentPage(1)
		router.push("/sign-in")
	}


	const handlePressLinks = async (path: string) => {
		try {
			await WebBrowser.openBrowserAsync(`https://jci-n-web.vercel.app/${path}`)
		} catch (error) {
			console.error(error);
		}
	}

	if (isLoading) {
		return <LoadingAnimation displayMessage="Processing..." backgroundColor="bg-white-500" />
	}

	return (
		<View className="bg-white-500 flex-1">
			<View className="flex-1 bg-white-500">
				<AntDesign name="plus" size={24} color="#737373" />
				{/* Form */}
				<View className="mt-4 gap-2 ">
					<Text className="text-h5 font-semibold text-brand-700">Other Information</Text>
					<Text className="text-neutral-500">To complete registration please fill-out the form about personal details</Text>
					<View className="flex gap-4 mt-4">
						<Controller name="phone_number" control={control} render={({ field: { onChange, value } }) => <Input placeholder="Phone Number" id="phone_number" onChangeText={onChange} value={value} error={errors.phone_number} />} />

						<Controller name="email_address" control={control} render={({ field: { onChange, value } }) => <Input placeholder="Email Address" id="email_address" onChangeText={onChange} value={value} error={errors.email_address} />} />

						<Controller name="address" control={control} render={({ field: { onChange, value } }) => <Input placeholder="Address" id="address" onChangeText={onChange} value={value} error={errors.address} />} />




					</View>
					<View className="mt-4 flex flex-row gap-2 items-">
						<Checkbox value={isChecked} onValueChange={setChecked}/>
						<Text>
							I agree to the{" "}
							<Text className="text-blue-500 underline" onPress={() => handlePressLinks("/terms-and-conditions")}>
								Terms and Conditions
							</Text>{" "}
							and{" "}
							<Text className="text-blue-500 underline" onPress={() => handlePressLinks("/privacy-policy")}>
								Privacy Policy
							</Text>
							.
						</Text>
					</View>

				</View>
				<View className="flex-grow justify-center items-center gap-2">
					<CustomButton onPress={handleSubmit(handleSubmitEntry)} styleType={StyleType.BRAND_PRIMARY}>
						<Text className="text-white-500"> Submit </Text>
						<AntDesign name="arrowright" size={16} color="white" />
					</CustomButton>
				</View>
			</View>
			<OnScreenModal isVisible={isModalOpen}>
				<View className="bg-white-500 p-4 rounded-lg max-w-80 flex flex-col items-center gap-4">
					<Text className="text-xl font-bold">For Verification</Text>
					<Text className="text-sm">
						Your account is currently under review. Once the admin verifies your details, you will be able to access the system. Thank you for your patience!
					</Text>
					<CustomButton onPress={handlePressConfirm} styleType={StyleType.BRAND_PRIMARY}>
						<Text className="text-white-500">Confirm</Text>
					</CustomButton>
				</View>
			</OnScreenModal>
		</View>
	)
}

export default Step4