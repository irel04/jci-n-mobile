import AuthScreen from "@/app/(auth)/index"


import { View } from "react-native"
import "../global.css"
import { useFonts } from "expo-font"


const App = () => {

	return (
		<View className="bg-white-500 h-screen text-base">
			<AuthScreen />
		</View>
	)
}

export default App