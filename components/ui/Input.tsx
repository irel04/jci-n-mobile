import React, { ReactNode } from "react"
import { Image, ImageSourcePropType, Text, TextInput, View } from "react-native"


interface InputProps {
	onChange: VoidFunction ,
	placeholder: string,
	icon?: ReactNode | ImageSourcePropType
}

const Input = ({ icon, onChange, placeholder }: InputProps) => {
	return (
		<View className="w-72 flex px-5 bg-neutral-100 rounded-2xl">
			<TextInput placeholder={placeholder} onChangeText={onChange}/>
		</View>
	)
}


export default Input