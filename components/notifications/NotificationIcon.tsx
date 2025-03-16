import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Ionicons } from "@expo/vector-icons"
import { useSession } from "@/contexts/auth"
import { TUserSession } from "@/components/types"
import { supabase } from "@/utils/supabase"

type Props = {
	color: string
}

const NotificationIcon = ({ color }: Props) => {
	const [notificationCount, setNotificationCount] = useState<number>(100)

	const { session } = useSession()
	const userAuth = session ? JSON.parse(session) as TUserSession : null

	const fetchNotification = useCallback(async () => {
		try {
			const { count, error } = await supabase.from("notifications").select("id", { count: 'exact' }).eq("nearest_user_id", userAuth.user_id).eq("is_read", false)

			if(error) throw error

			setNotificationCount(count)
		} catch (error) {
			console.error(error)
		}
	}, [])

	useEffect(() => {
		fetchNotification()
	}, [])

	useEffect(() => {
		const channel = supabase
		.channel('counting-notifications')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, payload => {
			console.log("Count me in")

			fetchNotification()
		  
		})
		.subscribe()
	  

		return () => {
			channel.unsubscribe()
		}
	}, [])


	return (
		<View>
			<Ionicons name="notifications" size={22} color={color} />
			{notificationCount > 0  && (
				notificationCount < 100 ? <View
				style={{
					position: "absolute",
					right: -6,
					top: -2,
					backgroundColor: "red",
					borderRadius: 10,
					paddingVertical: 2,  // Top & Bottom padding
					paddingHorizontal: 4, // Left & Right padding
					minWidth: 16,
					minHeight: 16,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text className="text-white-500 font-bold text-[0.6rem]">
					{notificationCount}
				</Text>
			</View> : <View
					style={{
						position: "absolute",
						right: -1,
						top: -2,
						backgroundColor: "red",
						borderRadius: 10,
						paddingVertical: 2,  // Top & Bottom padding
						paddingHorizontal: 4, // Left & Right padding
						minWidth: 10,
						minHeight: 10,
						justifyContent: "center",
						alignItems: "center",
					}}/>
					
			)}
		</View>
	)
}

export default NotificationIcon