
import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import ProfileDetails from "@/components/profile/ProfileDetails";
import Support from "@/components/profile/Support";
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

const ProfileTab = () => {

	const profileData = { 
		name: "Jonas Brian Macacua",
		birthdate: "December 24, 2001",
		email: "jonas@gmail.com",
		phoneNumber: "+63 9704778642",
		address: "Muslim Compound",
	}

	const handlePressLogout = () => {
		router.push("/sign-in")
	}

	return (
		<View className="flex p-7 h-full">
			{/* Profile picture */}
			<View className="relative h-10 flex items-center flex-auto gap-1">
				<Image source={require("@/assets/images/jb-profile.png")} className="rounded-full" />
				<Text className="text-h5 font-bold text-brand-900">Jonas Brian Macacua</Text>
				<Text className="text-caption rounded-lg bg-brand-800 text-white-500 px-[10px] py-[5px]">Employee</Text>
				<Pressable className="absolute right-0" onPress={() => {}}>
					<Feather name="edit" size={20} color="#082B63" />
				</Pressable>
			</View>

			{/* Personal Information */}
			<ProfileDetails data={profileData}/>

			{/* Support */}
			<Support/>

			{/* Logout Button */}
			<View className="flex flex-none items-center">
				<CustomButton onPress={handlePressLogout} title="Logout" styleType={StyleType.DESTRUCTIVE_SECONDARY} width="w-3/4">
					<Text className="text-red-700 ">Signout</Text>
					<MaterialIcons name="logout" size={16} color="#7B0F0F" />
				</CustomButton>
			</View>

		</View>
	)
}

export default ProfileTab