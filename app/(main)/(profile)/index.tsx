
import { View, Text, Image, Pressable } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ProfileDetails from "@/components/profile/ProfileDetails";
import Support from "@/components/profile/Support";
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import { useSession } from "@/contexts/auth";
import { supabase } from "@/utils/supabase";
import LoaderKit from "react-native-loader-kit"
import { TUserPersonalInfo, TUserSession } from "@/components/types";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import * as WebBrowser from 'expo-web-browser';


const getProfile = async (userId: string) => {
	const { data, error } = await supabase.from("users_details").select("*").eq("id", userId).single()

	if (error) throw error

	return data
}


const ProfileTab = () => {

	const [profileData, setProfileData] = useState<TUserPersonalInfo | null>()
	const [isLoading, setIsloading] = useState(true)

	const { signOut, session } = useSession()
	const handlePressLogout = async () => {

		await signOut()

		router.push("/sign-in")

	}

	const userSession = useMemo(() => JSON.parse(session) as TUserSession, [session]);

	const fetchData = useCallback(async () => {
		try {
			const userData = await getProfile(userSession.user_id)
			setProfileData(userData)
		} catch (error) {
			console.error(error)
		} finally {
			setIsloading(false)
		}
	}, [userSession?.user_id])

	
	useEffect(() => {
		fetchData()
	}, [userSession?.user_id])

	useEffect(() => {
		supabase.channel("profile-changes")
			.on("postgres_changes", { event: "*", schema: "public", table: "users_details"}, (payload) => {
				fetchData()
			}).subscribe()

		return () => {
			supabase.channel("profile-changes").unsubscribe()
		}
	}, [fetchData])


	const _handlePressButtonAsync = async () => {
		try {
			await WebBrowser.openBrowserAsync('https://jci-n-web.vercel.app/edit-profile');
		} catch (error) {
			console.error(error)
		}
	};

	return (
		<View className="flex p-7 h-full">
			{isLoading ? <LoadingAnimation/> : <>
				{/* Profile picture */}
				<View className="relative h-10 flex items-center flex-auto gap-1">
					<Image source={require("@/assets/images/employee-icon.png")} className="rounded-full w-40 h-40" />
					<Text className="text-h5 font-bold text-brand-900">{profileData.first_name + " " + profileData.last_name}</Text>
					<Text className="text-caption rounded-lg bg-brand-800 text-white-500 px-[10px] py-[5px]">Employee</Text>
					<Pressable className="absolute right-0" onPress={_handlePressButtonAsync}>
						<Feather name="edit" size={20} color="#082B63" />
					</Pressable>
				</View>

				{/* Personal Information */}
				<ProfileDetails data={profileData} />

				{/* Support */}
				<Support />

				{/* Logout Button */}
				<View className="flex flex-none items-center">
					<CustomButton onPress={handlePressLogout} styleType={StyleType.DESTRUCTIVE_SECONDARY} width="w-3/4">
						<Text className="text-red-700 ">Signout</Text>
						<MaterialIcons name="logout" size={16} color="#7B0F0F" />
					</CustomButton>
				</View>
			</>}

		</View>
	)
}

export default ProfileTab