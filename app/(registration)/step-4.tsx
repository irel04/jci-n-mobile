import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRegistrationContext } from "@/app/(registration)/_layout";
import { useRouter } from "expo-router";
import Input from "@/components/ui/Input";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Step4 = () => {


	const { personalInformationState, setCurrentPage } = useRegistrationContext()

	// const [value, setValue] = useState<TUserCredentials>({
	// 	email: null,
	// 	password: null
	// })

	const router = useRouter()

	const handleSubmit = async () => {
		console.log(personalInformationState.personalInfo)
		setCurrentPage(1)
		router.push("/sign-in")
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
						<Input onChangeText={(address) => personalInformationState.setPersonalInfo({ ...personalInformationState.personalInfo, address })} placeholder="Address" id="address" value={personalInformationState.personalInfo.address}/>
						
						<Input onChangeText={(phone_number) => personalInformationState.setPersonalInfo({ ...personalInformationState.personalInfo, phone_number })} placeholder="Phone Number" id="phone_number" value={personalInformationState.personalInfo.phone_number}/>	
						
					</View>
				</View>
				<View className="flex-grow justify-center items-center gap-2">
					<CustomButton onPress={handleSubmit} styleType={StyleType.BRAND_PRIMARY}>
						<Text className="text-white-500"> Submit </Text>
						<AntDesign name="arrowright" size={16} color="white" />
					</CustomButton>
				</View>
			</View>
		</View>
	)
}

export default Step4