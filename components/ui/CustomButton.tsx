import React, { ReactNode, useState } from 'react'
import { Alert, GestureResponderEvent, Pressable, Text, View } from "react-native"
import { Button } from "react-native"

export enum StyleType {
	BRAND_PRIMARY = "BRAND_PRIMARY" ,
	BRAND_SECONDARY = "BRAND_SECONDARY",
	BRAND_DISABLED = "BRAND_DISABLED",
	DESTRUCTIVE_PRIMARY = "DESTRUCTIVE_PRIMARY",
	DESTRUCTIVE_SECONDARY = "DESTRUCTIVE_SECONDARY",
	DESTRUCTIVE_DISABLED = "DESTRUCTIVE_DISABLED",
}
interface ButtonProps {
	onPress: VoidFunction,
	children?: ReactNode,
	title: string,
	styleType: StyleType

}

const BUTTONSTYLE = {
	BRAND_PRIMARY: "bg-blue-400 text-white-500",
	BRAND_SECONDARY: "border-blue-500 border-[1px] text-blue-900",
	BRAND_DISABLED: "bg-blue-200 text-white-500",
	DESTRUCTIVE_PRIMARY: "bg-red-400 text-white-500",
	DESTRUCTIVE_SECONDARY: "border-red-400 text-white-500 border-[1px]",
	DESTRUCTIVE_DISABLED: "bg-red-200 text-white-500",
}

const CustomButton = ({ children, onPress, title, styleType }: ButtonProps) => {
	const [] = useState(BUTTONSTYLE.BRAND_PRIMARY)

	return (
		<Pressable className={`flex flex-row  w-[123px] h-[43px] rounded-2xl justify-evenly items-center px-5 ${BUTTONSTYLE[styleType]}`} onPress={onPress} >
			<Text className={`${BUTTONSTYLE[styleType]}`}>{title}</Text>
			{children}
		</Pressable>
	)
}

export default CustomButton