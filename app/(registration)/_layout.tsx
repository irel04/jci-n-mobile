import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import Stepper from "@/components/ui/Stepper"
import { Redirect, Stack, useRouter } from "expo-router"
import { useSession } from "@/contexts/auth"
import { TRegistrationContext, TUserCredentials, TUserPersonalInfo } from "@/components/types"


const RegistrationContext = createContext<TRegistrationContext>(null)

const Registration = () => {

	const [currentPage, setCurrentPage] = useState<number>(1)

	

	const [userCredentials, setUserCredentials] = useState<TUserCredentials>({
		email: "kianirel56@gmail.com",
		password: "irel123"
	})

	const [personalInfo, setPersonalInfo] = useState<TUserPersonalInfo>({
		last_name: "",
		first_name: "",
		email_address: userCredentials.email,
		auth_id: "",
		birthdate: "",
		phone_number: "",
		address: ""
	})

	//  THis will be used to feed the context of the registration component
	const contextValue: TRegistrationContext = {
		personalInformationState: {
			personalInfo,
			setPersonalInfo
		},
		setCurrentPage,
		userCredentialState: {
			setUserCredentials,
			userCredentials

		}
	}

	const { session } = useSession()

	const router = useRouter()

	const handlePressGoBack = () => {
		if (currentPage == 1) {
			router.dismissTo("/sign-in")
			setCurrentPage(1)
			return
		}
		console.log("current page: " ,currentPage)
		setCurrentPage(currentPage-1)
		router.dismiss(1)
	}

	if (session) {
		return <Redirect href="/(main)" />
	}


	return (
		<RegistrationContext.Provider value={contextValue}>
			<KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View className="p-4 flex-1 flex gap-4 bg-white-500">
						<Stepper current={currentPage} total={4} handlePressBack={handlePressGoBack} />
						<Stack screenOptions={{ headerShown: false }} />
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</RegistrationContext.Provider>
	)
}

export const useRegistrationContext = () => {
	return useContext(RegistrationContext)
}

export default Registration
