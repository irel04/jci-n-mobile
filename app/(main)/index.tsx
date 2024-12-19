import { View, Text, Image } from 'react-native'
import React from 'react'
import Weather from '@/components/home/Weather'
import SolarPower from '@/components/home/SolarPower';
import TrashBinLevel from '@/components/home/TrashBinLevel';

const Main = () => {
  const firstname = "Jonas Brian"; // Define the firstname variable


  return (
	<View className="p-4">
		<Text className='text-left text-h5 font-[700] pb-5'>Welcome, {firstname}!</Text>
		
		<Weather />

		<View>
			<SolarPower />
		</View>

		<TrashBinLevel />
	</View>
  )
}

export default Main