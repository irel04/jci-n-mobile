import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import Stepper from "@/components/ui/Stepper"
import { Redirect, Stack, useRouter } from "expo-router"
import { useSession } from "@/contexts/auth"
import { TRegistrationContext, TUserCredentials, TUserPersonalInfo } from "@/components/types"
import { FormProvider, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const requiredMessage = "This field is required"
const schema = yup.object().shape({
	first_name: yup.string().required(requiredMessage),
	last_name: yup.string().required(requiredMessage),
	birthdate: yup.string().required(),
	email_address: yup.string().required(),
	phone_number: yup.string().required(requiredMessage),
	auth_id: yup.string(),
	RFID: yup.string(),
	lat: yup.number().positive(),
	lng: yup.number().positive(),
	address: yup.string()
})

const RegistrationContext = createContext<TRegistrationContext>(null)

const Registration = () => {

	const [currentPage, setCurrentPage] = useState<number>(1)


	const methods = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
		defaultValues: {
			first_name: "",
			last_name: "",
			birthdate: ""
		}
	})




	//  THis will be used to feed the context of the registration component
	const contextValue: TRegistrationContext = {
		setCurrentPage,
	}

	const { session } = useSession()

	const router = useRouter()

	const handlePressGoBack = () => {
		if (currentPage == 1) {
			router.dismissTo("/sign-in")
			setCurrentPage(1)
			return
		}
		setCurrentPage(currentPage - 1)
		router.dismiss(1)
	}

	const handleGoNext = () => {
		console.log(currentPage)
		switch (currentPage) {
			case 1:
				router.push("/(registration)/step-2")
				break
			case 2:
				router.push("/(registration)/step-3")
				break
			case 3:
				router.push("/(registration)/step-4")
				break
			default:
				break;
		}

		if(currentPage < 4){
			setCurrentPage(currentPage+1)
		}
	}

	if (session) {
		return <Redirect href="/(main)" />
	}


	return (
		<FormProvider {...methods}>
			<RegistrationContext.Provider value={contextValue}>
				<KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View className="p-4 flex-1 flex gap-4 bg-white-500">
							<Stepper current={currentPage} total={4} handlePressBack={handlePressGoBack} stepUp={handleGoNext}/>
							<Stack screenOptions={{ headerShown: false }} />
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			</RegistrationContext.Provider>
		</FormProvider>
	)
}

export const useRegistrationContext = () => {
	return useContext(RegistrationContext)
}

export default Registration
