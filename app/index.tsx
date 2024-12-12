import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AuthScreen from "@/app/auth/Main"


import "../global.css"


const App = () => {
	const Stack = createNativeStackNavigator()

	return (
		<Stack.Navigator>
			{/* Auth Page */}
			<Stack.Screen name="auth" component={AuthScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	)
}

export default App