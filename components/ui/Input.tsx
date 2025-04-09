import React, { ReactNode, useState } from "react";
import { ErrorOption } from "react-hook-form";
import { NativeSyntheticEvent, NativeTouchEvent, Text, TextInput, TextInputFocusEventData, TextInputProps, View } from "react-native";



interface InputProps extends TextInputProps {
	onChangeText?: (text: string) => void,
	placeholder: string,
	children?: ReactNode,
	id: string,
	value: string,
	secureTextEntry?: boolean,
	error?: ErrorOption,
	onPress?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void
}

const Input = ({ children, onChangeText, placeholder, id, value, secureTextEntry, error, onPress, ...otherProps }: InputProps) => {


	const [isFocus, setIsFocus] = useState<boolean>(value ? true : false)

	return (
		<View>
			<View className={`flex px-5 py-2 bg-neutral-100 rounded-lg flex-row items-center justify-between w-full min-h-14 ${error?.message ? "border-red-500 border-[1px]" : ""}`}>
				<View className="w-full">
					<Text className={`text-xs text-neutral-500/75 transition-all ${isFocus || value ? "flex" : "hidden"}`}>{placeholder}</Text>
					<TextInput placeholder={placeholder} onChangeText={onChangeText} id={id} className="text-body w-full" maxLength={25} value={value} secureTextEntry={secureTextEntry} onBlur={() => setIsFocus(false)} onPress={onPress}  {...otherProps} />
				</View>
				{/* Pass the icon as */}
				{children}
			</View>
			<Text className="text-xs text-red-500 ml-2">{error?.message}</Text>
		</View>
	)
}


export default Input