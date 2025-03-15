import { View, Text, Alert, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Redirect, Tabs } from "expo-router"
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSession } from "@/contexts/auth";
import { TUserSession } from "@/components/types";
import { supabase } from "@/utils/supabase";
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, sendPushNotification, TMessagePushNotication } from "@/components/notifications/push-notification";
// import * as TaskManager from "expo-task-manager"

const BACKGROUND_NOTIFICATION = 'BACKGROUND-NOTIFICATION-TASK'


Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true
	})
})

// TaskManager.defineTask(BACKGROUND_NOTIFICATION, async ({ data, error, executionInfo }) => {
// 	console.log('Received a notification in the background!');
// 	// Do something with the notification data
//   });


Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION)

const MainLayout = () => {

	const { isLoading, session } = useSession()


	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState<Notifications.Notification | undefined>(
		undefined
	);
	const notificationListener = useRef<Notifications.EventSubscription>();
	const responseListener = useRef<Notifications.EventSubscription>();

	// This block register the notification to push notification
	useEffect(() => {
		registerForPushNotificationsAsync(Notifications)
			.then(token => setExpoPushToken(token ?? ''))
			.catch((error: any) => setExpoPushToken(`${error}`));

		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
		});

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(notificationListener.current);
			responseListener.current &&
				Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);


	const userSession = session ? JSON.parse(session) as TUserSession : null 

	// Send push notification while watching notification table
	useEffect(() => {
		const channels = supabase.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'notifications' },
				async (payload) => {
					console.log('Change received!', payload)

					try {
						const { data, error } = await supabase.from("notifications").select("*, bins(color, set(id, name)), users_details(last_name, first_name)").eq("id", payload.new.id).single()

						if(error) throw error

						const actionMessage = data.notification_type === "empty" ? "The current bin is now empty. Keep it up!" : "Kindly check the bin as we preventing the overflow of trashes"

						const message: TMessagePushNotication = {
							to: expoPushToken,
							body: `Hello ${data.users_details.first_name}! ${actionMessage}`,
							title: `${data.bins.set.name.toUpperCase()} ${data.bins.color.toUpperCase()} is ${data.notification_type}`,
							sound: "Default"
						}

						await sendPushNotification(message)
					} catch (error) {
						console.error(error)
					}
				}
			)
			.subscribe()

		// Cleanup function to unsubscribe when the component unmounts
		return () => {
			channels.unsubscribe();
		};	
	}, [])

	// You can keep the splash screen open, or render a loading screen like we do here.
	if (isLoading) return

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!userSession) {
		return <Redirect href="/sign-in" />
	}



	return (
		<Tabs screenOptions={{
			headerShown: false, headerTintColor: "#0E46A3", tabBarStyle: {
				backgroundColor: "#E3E3E3",
				paddingTop: 6
			}
		}}>
			<Tabs.Screen name="index"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <Entypo name="home" size={22} color={color}
					/>
				}}
			/>

			<Tabs.Screen name="(statistics)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <Entypo name="bar-graph" size={22} color={color} />
				}}
			/>

			<Tabs.Screen name="(route)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <FontAwesome name="map" size={20} color={color} />
				}}
			/>

			<Tabs.Screen name="(notification)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <Ionicons name="notifications" size={22} color={color} />
				}}
			/>
			<Tabs.Screen name="(profile)"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color }) => <FontAwesome name="user" size={22} color={color} />
				}}
			/>

		</Tabs>
	)
}

export default MainLayout