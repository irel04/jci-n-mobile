
import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileDetails from "@/components/profile/ProfileDetails";
import Support from "@/components/profile/Support";
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import { useSession } from "@/contexts/auth";
import { supabase } from "@/utils/supabase";
import LoaderKit from "react-native-loader-kit"


const getProfile = async (auth_id: string) => {
	const { data, error } = await supabase.from("users_details").select("*").eq("auth_id", auth_id)

	if (error) throw error

	return data
}


const ProfileTab = () => {

	// const profileData = { 
	// 	name: "Jonas Brian Macacua",
	// 	birthdate: "December 24, 2001",
	// 	email: "jonas@gmail.com",
	// 	phoneNumber: "+63 9704778642",
	// 	address: "Muslim Compound",
	// }	

	const [profileData, setProfileData] = useState<{
		name: string;
		birthdate: string;
		email_address: string;
		phone_number: string;
		address: string;
	}>({
		name: '',
		birthdate: '',
		email_address: '',
		phone_number: '',
		address: ''
	})
	const [isLoading, setIsloading] = useState(true)

	const { signOut, session } = useSession()
	const handlePressLogout = () => {

		signOut()

		setTimeout(() => {
			if (!session) {
				router.push("/sign-in")
			}
		}, 1000)
	}

	const userSession = JSON.parse(session)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getProfile(userSession.session.user.id)

				const processedUser = userData.map(user => {
					const { first_name, last_name, ...other } = user
					return {
						name: first_name + " " + last_name,
						...other
					}
				})[0]

				setProfileData(processedUser)
			} catch (error) {
				console.error(error)
			} finally {
				setIsloading(false)
			}
		}

		fetchData()
	}, [])

	return (
		<View className="flex p-7 h-full">
			{isLoading ? <View className="h-screen flex items-center justify-center">
					<LoaderKit style={{ width: 50, height: 50 }}
						name={'BallPulse'} // Optional: see list of animations below
						color={'#0E46A3'} />
				</View> : <>
				{/* Profile picture */}
				<View className="relative h-10 flex items-center flex-auto gap-1">
					<Image source={require("@/assets/images/employee-icon.png")} className="rounded-full w-40 h-40" />
					<Text className="text-h5 font-bold text-brand-900">{profileData.name}</Text>
					<Text className="text-caption rounded-lg bg-brand-800 text-white-500 px-[10px] py-[5px]">Employee</Text>
					<Pressable className="absolute right-0" onPress={() => { }}>
						<Feather name="edit" size={20} color="#082B63" />
					</Pressable>
				</View>

				{/* Personal Information */}
				<ProfileDetails data={profileData} />

				{/* Support */}
				<Support />

				{/* Logout Button */}
				<View className="flex flex-none items-center">
					<CustomButton onPress={handlePressLogout} styleType={StyleType.DESTRUCTIVE_SECONDARY} width="w-3/4">
						<Text className="text-red-700 ">Signout</Text>
						<MaterialIcons name="logout" size={16} color="#7B0F0F" />
					</CustomButton>
				</View>
			</>}

		</View>
	)
}

export default ProfileTab