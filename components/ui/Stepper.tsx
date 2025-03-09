import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
	total: number
	current: number
	handlePressBack: () => void,
	stepUp?: () => void // For debugging purpose
}

const Stepper = ({ current, total, handlePressBack, stepUp }: Props) => {



	return (
		<View>
			<View className="relative flex  flex-row items-center p-4">
				<TouchableOpacity className="absolute left-2" >
					<MaterialIcons name="keyboard-backspace" size={27} color="black" onPress={handlePressBack} />
				</TouchableOpacity>
				<Text className="flex-grow text-lg font-semibold text-center">Step {current} of {total}</Text>
				{stepUp && <TouchableOpacity className="absolute right-2" onPress={stepUp}>
					<Text>Next</Text>
				</TouchableOpacity>}
			</View>
			{/* Progress */}
			<View className="flex flex-row gap-[0.1rem]">
				{Array.from({ length: total }).map((_, index) => {
					return <View className={`${current > index ? "border-brand-300 border-2 " : ""} flex-grow rounded-sm`} key={index} />
				})}
			</View>
		</View>
	)
}

export default Stepper
