import { Platform } from "react-native";
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications"
import { supabase } from "@/utils/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";

export type TMessagePushNotication = {
	to: string,
	sound: string,
	title: string,
	body: string,
	data?: {
		[key: string]: string
	}

}

export async function sendPushNotification(message: TMessagePushNotication) {
	
	const response = await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});



	if(!response.ok){
		throw new Error("Sending Push Notification Failed")
	}


}


export async function registerForPushNotificationsAsync() {
	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			handleRegistrationError('Permission not granted to get push token for push notification!');
			return;
		}
		const projectId =
			Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
		if (!projectId) {
			handleRegistrationError('Project ID not found');
		}
		try {
			const pushTokenString = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			).data;
			return pushTokenString;
		} catch (e: unknown) {
			handleRegistrationError(`${e}`);
		}
	} else {
		handleRegistrationError('Must use physical device for push notifications');
	}
}

export async function getPushToken(): Promise<string> {
	const projectId =
			Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
		if (!projectId) {
			handleRegistrationError('Project ID not found');
		}
		try {
			const pushTokenString = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			).data;
			return pushTokenString;
		} catch (e: unknown) {
			handleRegistrationError(`${e}`);
		}
}

export function handleRegistrationError(errorMessage: string) {
	alert(errorMessage);
	throw new Error(errorMessage);
}

export function setUpNoticationChannel(expoPushToken: string): RealtimeChannel {
	const notification_channel = supabase.channel('notification-channel')
		.on(
			'postgres_changes',
			{ event: 'INSERT', schema: 'public', table: 'notifications' },
			async (payload) => {
				console.log('Change received!', payload)

				try {
					const { data, error } = await supabase.from("notifications").select("*, bins(color, set(id, name)), users_details(last_name, first_name)").eq("id", payload.new.id).single()

					if (error) throw error

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

	return notification_channel
}