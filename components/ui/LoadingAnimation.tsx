import { View, Text } from 'react-native'
import React from 'react'
import LoaderKit from "react-native-loader-kit"


type Props = {
	animationName?: string,
	displayMessage?: string,
	backgroundColor?: "bg-none" | "bg-white-500"
}

const LoadingAnimation = ({ animationName, displayMessage, backgroundColor }: Props) => {
	return (
		<View className={`flex h-screen items-center justify-center gap-4 ${backgroundColor}`}>
			<LoaderKit style={{ width: 50, height: 50, marginTop: 20 }}
				name={animationName || 'BallSpinFadeLoader'} // Optional: see list of animations below
				color={'#757576'} />
			<Text className="text-neutral-500">{displayMessage || "Please wait..."}</Text>
		</View>
	)
}

export default LoadingAnimation