import { View, Text } from 'react-native';
import React from 'react';
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { useRegistrationContext } from "@/app/(registration)/_layout";
import { useRouter } from "expo-router";
import Input from "@/components/ui/Input";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Controller, useFormContext } from "react-hook-form";
import TextInputMask from 'react-native-text-input-mask';


const Step3 = () => {


	const { setCurrentPage } = useRegistrationContext()

	// const [value, setValue] = useState<TUserCredentials>({
	// 	email: null,
	// 	password: null
	// })

	const { control, formState: { errors, dirtyFields } } = useFormContext()

	const router = useRouter()


	const handleGoPage4 = async () => {
		
		if(Object.keys(dirtyFields).length < 3) return 
		
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
						<Controller name="last_name" control={control} render={({ field: { onChange, value } }) => <Input placeholder="Last Name" id="last_name" onChangeText={onChange} value={value} error={errors.last_name}/>}/>
						
						
						<Controller name="first_name" control={control} render={({ field: { onChange, value } }) => <Input placeholder="First Name" id="first_name" onChangeText={onChange} value={value} error={errors.first_name}/>}/>
						
						<Controller name="birthdate" control={control} render={({ field: { onChange, value } }) => <TextInputMask placeholder="Birthdate (MM-DD-YYYY)" id="birthdate" onChangeText={onChange} value={value}/>}/>
						
					</View>
				</View>
				<View className="flex-grow justify-center items-center gap-2">
					<CustomButton onPress={handleGoPage4} styleType={Object.keys(dirtyFields).length < 3 ? StyleType.BRAND_DISABLED: StyleType.BRAND_PRIMARY}>
						<Text className="text-white-500"> Next </Text>
						<AntDesign name="arrowright" size={16} color="white" />
					</CustomButton>
				</View>
			</View>
		</View>
	)
}

export default Step3