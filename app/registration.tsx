import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Stepper from "@/components/ui/Stepper"

type Props = {}

const Registration = (props: Props) => {
	return (
		<KeyboardAvoidingView className="flex-1 p-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View className=" flex-1">
					<Stepper current={1} total={3}/>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

export default Registration

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})