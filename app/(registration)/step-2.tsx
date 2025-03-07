import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRegistrationContext } from "@/app/(registration)/_layout";
import { useRouter } from "expo-router";
import Input from "@/components/ui/Input";


const Step2 = () => {


	const { userCredentialState, setCurrentPage } = useRegistrationContext()

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
					<Text className="text-neutral-500">We just sent a 6-digit code to {userCredentialState.userCredentials.email}</Text>
					<View className="flex gap-4 mt-4">
						<Input onChangeText={(email) => userCredentialState.setUserCredentials({ ...userCredentialState.userCredentials, email })} placeholder="Email" id="email" value={userCredentialState.userCredentials.email}>
							<FontAwesome name="user-o" size={13} color="#757576" />
						</Input>

					</View>
				</View>
				<View className="flex-grow justify-center items-center gap-2">
					<CustomButton onPress={handleGoPage3} styleType={StyleType.BRAND_PRIMARY}>
						<Text className="text-white-500"> Verify Email </Text>
						<AntDesign name="arrowright" size={16} color="white" />
					</CustomButton>
					<CustomButton onPress={handleGoPage3} styleType={StyleType.BRAND_SECONDARY}>
						<Text className="text-brand-900"> Resend Code </Text>
					</CustomButton>
				</View>

			</View>
		</View>
	)
}

export default Step2