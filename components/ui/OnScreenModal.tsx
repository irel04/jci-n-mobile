import React, { ReactNode } from 'react'
import { Modal, View } from "react-native"

type Props = {
	children: ReactNode,
	isVisible: boolean
}

const OnScreenModal = ({ children, isVisible }: Props) => {
	return (
		<Modal animationType="slide" visible={isVisible} transparent animationType="fade">
			<View className="bg-black/65 z-50 h-screen flex justify-center items-center">
				{children}
			</View>
		</Modal>
	)
}

export default OnScreenModal