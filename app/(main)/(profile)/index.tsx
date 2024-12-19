
import { View, Text, Image } from 'react-native'
import React from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import ProfileDetails from "@/components/profile/ProfileDetails";

const ProfileTab = () => {

	const profileData = { 
		name: "Jonas Brian Macacua",
		birthdate: "December 24, 2001",
		email: "jonas@gmail.com",
		phoneNumber: "+63 9704778642",
		address: "Muslim Compound",
	}

	return (
		<View className="flex p-2 border-red-500 border-2 h-full">
			{/* Profile picture */}
			<View className="border-blue-500 border-2 h-10 flex items-center flex-auto gap-1">
				<Image source={require("@/assets/images/jb-profile.png")} className="rounded-full" />
				<Text className="text-h5 font-bold text-brand-900">Jonas Brian Macacua</Text>
				<Text className="text-caption rounded-lg bg-brand-800 text-white-500 px-[10px] py-[5px]">Employee</Text>
			</View>

			{/* Personal Information */}
			<ProfileDetails data={profileData}/>

		</View>
	)
}

export default ProfileTab