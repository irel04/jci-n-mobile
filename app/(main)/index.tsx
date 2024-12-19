import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import Weather from '@/components/home/Weather';
import SolarPower from '@/components/home/SolarPower';
import TrashBinLevel from '@/components/home/TrashBinLevel';
import OverflowEvents from '@/components/home/OverflowEvents';

const Main = () => {
	const firstname = "Jonas Brian";

	return (
		<View className="flex-1 bg-white">
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
				<View>
					<Text className="text-left text-h5 font-[700] pb-5">Welcome, {firstname}!</Text>
				</View>

				<Weather />

				<View className="flex-row gap-[5%] mt-5">
					<View className="w-[30%]">
						<SolarPower />
					</View>
					
					<View className="flex-col justify-between p-3 rounded-xl bg-brand-700 items-left gap-2 w-[65%]">
						<OverflowEvents />
					</View>
				</View>

				<View>
					<TrashBinLevel />
				</View>

				<View className="mt-5">
					<View className="flex-col justify-between border-2 rounded-xl border-brand-700 items-left gap-2 w-full">
						<Image
							source={{ uri: 'https://via.placeholder.com/250' }}
							className="w-full h-[250px] rounded-lg"
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default Main;
