import { View, Text, Pressable, PressableProps, StyleSheet } from 'react-native'
import React from "react"
import { Ionicons, Entypo, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";


type TIconFamilies = "Entypo" | "Ionicons" | "MaterialCommunityIcons" | "AntDesign"

type TVariants = "default" | "secondary" | "neutral" | "destructive" | "ghost"

type TButton = PressableProps & {
	variant?: TVariants,
	icon?: string,
	iconFamily?: TIconFamilies,
	iconSize?: number,
	label?: string
}



const Button = ({ icon, iconFamily = "Entypo", iconSize = 18, label, variant="default", ...otherProps }: TButton) => {

	const iconMap: Record<TIconFamilies, React.ComponentType<any>> = {
		Entypo,
		Ionicons,
		MaterialCommunityIcons,
		AntDesign
	}

	const IconComponent = iconMap[iconFamily]



	return (
		<Pressable {...otherProps} style={{...styles.container, ...colorVariant[variant]}} disabled={variant === "ghost"}>
			{icon && IconComponent && React.createElement(IconComponent, {
				name: icon,
				size: iconSize,
				color: textVariant[variant].color
			})}

			{label && <Text style={textVariant[variant]}>{label}</Text>}
		</Pressable>
	)
}


const styles = StyleSheet.create({
	container: {
		alignSelf: "flex-start",
		display: "flex",
		flexDirection: "row",
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: 5,
		gap: 4,
		color: "#FFFFFF"
	},
})

const colorVariant = StyleSheet.create({
	default: {
		backgroundColor: "#4888EF",
	},
	neutral: {
		backgroundColor: "#757576",
		opacity: 70
	},
	secondary: {
		borderColor: "#4888EF",
		borderWidth: 2
	},
	destructive: {
		backgroundColor: "#E73737"
	},
	ghost: {
		backgroundColor: "#E3E3E3",
	}
})

const textVariant = StyleSheet.create({
	default: {
		color: "#FFFFFF"
	},
	neutral: {
		color: "#FFFFFF"
	},
	secondary: {
		color: "#757576"
	},
	destructive: {
		color: "#FFFFFF"
	},
	ghost: {
		color: "#C7C7C7"
	}
})

export default Button