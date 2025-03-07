import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRegistrationContext } from "@/app/(registration)/_layout";
import { useRouter } from "expo-router";
import Input from "@/components/ui/Input";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Step3 = () => {


	const { personalInformationState, setCurrentPage } = useRegistrationContext()

	// const [value, setValue] = useState<TUserCredentials>({
	// 	email: null,
	// 	password: null
	// })

	const router = useRouter()

	const handleGoPage4 = async () => {
		setCurrentPage(4)
		router.push("/(registration)/step-4")
	}

	return (
		<View className="bg-white-500 flex-1">
			<View className="flex-1 bg-white-500">
				<FontAwesome6 name="user" size={24} color="#737373" />
				{/* Form */}
				<View className=" mt-4 gap-2 ">
					<Text className="text-h5 font-semibold text-brand-700">Personal Information</Text>
					<Text className="text-neutral-500">To complete registration please fill-out the form about personal details</Text>
					<View className="flex gap-4 mt-4">
						<Input onChangeText={(last_name) => personalInformationState.setPersonalInfo({ ...personalInformationState.personalInfo, last_name })} placeholder="Last Name" id="last_name" value={personalInformationState.personalInfo.last_name}/>
						
						<Input onChangeText={(first_name) => personalInformationState.setPersonalInfo({ ...personalInformationState.personalInfo, first_name })} placeholder="First Name" id="first_name" value={personalInformationState.personalInfo.first_name}/>

						
						<Input onChangeText={(birthdate) => personalInformationState.setPersonalInfo({ ...personalInformationState.personalInfo, birthdate })} placeholder="Birthday" id="birthday" value={personalInformationState.personalInfo.birthdate}/>
						
					</View>
				</View>
				<View className="flex-grow justify-center items-center gap-2">
					<CustomButton onPress={handleGoPage4} styleType={StyleType.BRAND_PRIMARY}>
						<Text className="text-white-500"> Next </Text>
						<AntDesign name="arrowright" size={16} color="white" />
					</CustomButton>
				</View>
			</View>
		</View>
	)
}

export default Step3