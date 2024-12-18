
import { View, Text, Image } from 'react-native'
import React from 'react'

const ProfileTab = () => {
  return (
	<View className="flex p-2 border-red-500 border-2 h-full">
	  {/* Profile picture */}
	  <View className="border-blue-500 border-2 h-10 flex items-center flex-auto gap-1">
		<Image source={require("@/assets/images/jb-profile.png")} className="rounded-full"/>
		<Text className="text-h5 font-bold text-brand-900">Jonas Brian Macacua</Text>
		<Text className="text-caption rounded-lg bg-brand-800 text-white-500 px-[10px] py-[5px]">Employee</Text>
	  </View>
	  {/* Personal Information */}
	  <View className="border-blue-500 border-2 flex flex-auto gap-1">
		<Text className="text-brand-900 font-bold text-title2">Information</Text>
		<View className="flex flex-col">
			
		</View>
	  </View>
	  
	</View>
  )
}

export default ProfileTab