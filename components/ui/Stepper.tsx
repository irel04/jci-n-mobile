import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
	total: number
	current: number
}

const Stepper = ({ current, total }: Props) => {



	return (
		<View>
			<View className="relative flex  flex-row items-center p-2">
				<MaterialIcons name="keyboard-backspace" size={24} color="black" className="absolute"/>
				<Text className="flex-grow text-lg font-semibold text-center">Step {current} of {total}</Text>

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

const styles = StyleSheet.create({})