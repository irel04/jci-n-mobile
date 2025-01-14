import { View, Text, Modal } from 'react-native'
import React, { ReactNode } from 'react'

interface ModalAttr {
	children: ReactNode,
	isVisible: boolean,
	setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomModal = ({ children, isVisible, setIsVisible }: ModalAttr) => {
	return (
		<Modal visible={isVisible} transparent={true}>
			<View className="flex-1 bg-black/50 justify-center items-center">
				{children}
			</View>
		</Modal>
	)
}

export default CustomModal