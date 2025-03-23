import { View, Text } from 'react-native'
import React from 'react'
import Fontisto from "@expo/vector-icons/Fontisto"
import Ionicons from "@expo/vector-icons/Ionicons"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons"
import { TUserPersonalInfo } from "@/components/types"

interface ProfileProps {
	data: TUserPersonalInfo
}

const ProfileDetails = ({ data }: ProfileProps) => {
	return (
		<View className="flex flex-1 gap-4">
			<Text className="text-brand-900 font-bold text-title2">Information</Text>
			<View className="flex flex-col gap-5 p-5 border-neutral-300 border-[1px] rounded-lg ">
				<View className="flex flex-row items-center gap-1">
					<Fontisto name="email" size={16} color="#919192" className="flex-none" />
					<Text className="text-gray-500 flex-1 text-body">Email</Text>
					<Text className="text-gray-500 text-body"> {data.email_address}</Text>
				</View>
				<View className="flex flex-row items-center gap-1">
					<Ionicons name="phone-portrait-outline" size={16} color="#919192" className="flex-none" />
					<Text className="text-gray-500 flex-1 text-body">Phone</Text>
					<Text className="text-gray-500 text-body">{data.phone_number}</Text>
				</View>
				<View className="flex flex-row items-center gap-1">
					<SimpleLineIcons name="calendar" size={16} color="#919192" className="flex-none" />
					<Text className="text-gray-500 flex-1 text-body">BirthDay</Text>
					<Text className="text-gray-500 text-body">{data.birthdate}</Text>
				</View>
				<View className="flex flex-row items-center gap-1">
					<Ionicons name="location-outline" size={16} color="#919192" className="flex-none" />
					<Text className="text-gray-500 flex-1 text-body">Address</Text>
					<Text className="text-gray-500 text-body">{data.address}</Text>
				</View>
			</View>
		</View>
	)
}

export default ProfileDetails