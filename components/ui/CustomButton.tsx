import React, { ReactNode } from 'react'
import { Alert, GestureResponderEvent, Pressable, Text, View } from "react-native"
import { Button } from "react-native"

interface ButtonProps {
	onPress: VoidFunction,
	children?: ReactNode,
	title: string

}

const defaultStyle = "bg-blue-400 text-white-500"

const CustomButton = ({ children, onPress, title }: ButtonProps) => {



	return (
		<Pressable className={`flex flex-row  w-[123px] h-[43px] rounded-2xl justify-evenly items-center px-5 ${defaultStyle}`} onPress={onPress} >
			<Text className={`${defaultStyle}`}>{title}</Text>
			{children}
		</Pressable>
	)
}

export default CustomButton