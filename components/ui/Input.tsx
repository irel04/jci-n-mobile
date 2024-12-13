import React, { Key, ReactNode } from "react"
import { Image, ImageSourcePropType, Text, TextInput, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';



interface InputProps {
	onChange: VoidFunction ,
	placeholder: string,
	children?: ReactNode,
	id: string
}

const Input = ({ children, onChange, placeholder, id }: InputProps) => {
	return (
		<View className="w-72 flex px-5 bg-neutral-100 rounded-2xl flex-row items-center justify-between">
			<TextInput placeholder={placeholder} onChangeText={onChange} id={id} className="w-5/6 text-body" maxLength={25}/>
			{/* Pass the icon as */}
			{children}
		</View>
	)
}


export default Input