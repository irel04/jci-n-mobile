import pupLogo from "@/assets/images/pup-logo.png"
import Input from "@/components/ui/Input"
import { Image, Text, View } from "react-native"

const Main = () => {
	return (
		<View className="flex flex-col mt-10 px-5">
			<View className="flex flex-col justify-center items-center">
				<Image source={pupLogo} />
				<Text className="text-h3 font-bold text-brand-700 mt-24">Welcome Back</Text>
				<Text className="text-body mt-4">It's nice to see you again Kups! Please enter your details</Text>
				
				{/* Form */}
				<View className="mt-36 flex flex-col gap-7">
					<Input onChange={() => console.log("Hello")} placeholder="Email"/>
					<Input onChange={() => console.log("Hello")} placeholder="Password"/>
				</View>
			</View>
		</View>
	)
}


export default Main