import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Overflow from '@/components/statistics/Overflow';
import BinUsage from '@/components/statistics/BinUsage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PickupFrequency from '@/components/statistics/PickupFrequency';
import CollectionFrequency from '@/components/statistics/CollectionFrequency';

const Statistics = () => {
	return (
		<View className="flex-1 bg-gray-100 p-4">
			{/* Header */}
			<View className="flex-row items-center my-2 px-2">
				<Text className="text-h5 font-sans font-bold ml-2">Reports</Text>
				<View className='pl-2'>
					<MaterialIcons name="query-stats" size={28} color="black" />
				</View>

			</View>

			{/* Components */}
			<ScrollView>
				<View className="flex-col justify-start items-center my-4 px-2">
					<View className="my-4">
						<BinUsage />
					</View>
					<View className="my-4">
						<Overflow />
					</View>
					<View className="my-4">
						<PickupFrequency />
					</View>
					<View className="my-4">
						<CollectionFrequency />
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default Statistics;
