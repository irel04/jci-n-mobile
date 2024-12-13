import React, { ReactNode } from "react"
import { Image, ImageSourcePropType, Text, TextInput, View } from "react-native"



interface InputProps {
	onChange: VoidFunction ,
	placeholder: string,
	icon?: ImageSourcePropType | React.ReactNode,
	id: string
}

const Input = ({ icon, onChange, placeholder, id }: InputProps) => {
	return (
		<View className="w-72 flex px-5 bg-neutral-100 rounded-2xl">
			
			<TextInput placeholder={placeholder} onChangeText={onChange} id={id}/>
		</View>
	)
}


export default Input