import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRegistrationContext } from "@/app/(registration)/_layout";
import { useRouter } from "expo-router";
import Input from "@/components/ui/Input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

const schema = yup.object().shape({
	code: yup.string().required("Please provide pin before proceeding").min(6)
})

const Step2 = () => {

	const { handleSubmit, formState: { errors }, control } = useForm({
		resolver: yupResolver(schema),
		mode: "onChange"
	})

	const { setCurrentPage } = useRegistrationContext()

	// const [value, setValue] = useState<TUserCredentials>({
	// 	email: null,
	// 	password: null
	// })

	const router = useRouter()

	const handleGoPage3 = async () => {
		setCurrentPage(3)
		router.push("/(registration)/step-3")
	}

	return (
		<View className="bg-white-500 flex-1">
			<View className="flex-1 bg-white-500">
				<MaterialIcons name="security" size={24} color="#737373" />
				{/* Form */}
				<View className="mt-4 gap-2">
					<Text className="text-h5 font-semibold text-brand-700">Verify your Email</Text>
					<Text className="text-neutral-500">We just sent a 6-digit code to kianirel56@gmail.com</Text>
					<View className="flex gap-4 mt-4">
						<Controller name="code" control={control} render={({ field: { onChange, value } }) => <Input onChangeText={onChange} value={value} placeholder="Code" id="code" error={errors.code}/>}/>
					</View>
				</View>
				<View className="flex-grow justify-center items-center gap-2">
					<CustomButton  onPress={handleSubmit(handleGoPage3)} styleType={StyleType.BRAND_PRIMARY}>
						<Text className="text-white-500"> Verify Email </Text>
						<AntDesign name="arrowright" size={16} color="white" />
					</CustomButton>
					<CustomButton onPress={handleSubmit(handleGoPage3)} styleType={StyleType.BRAND_SECONDARY}>
						<Text className="text-brand-900"> Resend Code </Text>
					</CustomButton>
				</View>

			</View>
		</View>
	)
}

export default Step2