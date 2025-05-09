import { Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { timeAgo } from "@/utils/helper"
import { supabase } from "@/utils/supabase"
import { router } from "expo-router"
import { Bins } from "@/utils/schemas"
import { TNotifications } from "@/components/types/notifications"



interface Props {
    notifications: TNotifications[],
    label: string;
}

export default function NotificationCard({ notifications, label }: Props) {
    // State to toggle the visibility of all notifications for Today and Last 7 Days
    const [showAllToday, setShowAllToday] = useState(false)
    const [showAllLast7Days, setShowAllLast7Days] = useState(false)


    const handlePressNotification = async (id: string) => {
        try {
            const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", id)

            if (error) throw error


            router.push("/(main)/(statistics)")
            router.setParams({ id })


        } catch (error) {
            console.error(error)
        }
    }

    const displayedNotifications = showAllToday ? notifications : notifications.slice(0, 10)

    if (displayedNotifications.length === 0) {
        return null
    }

    return (

        < View className="relative mb-5" >
            <View className="flex-row justify-between items-center px-5">
                <Text className="text-lg font-bold">{label}</Text>
            </View>
            {displayedNotifications.map((notification, index: number) => (
                <TouchableOpacity key={index} className={`flex-row items-center px-5 py-2  ${!notification.is_read ? "bg-neutral-200" : ""}`} onPress={() => handlePressNotification(notification.id)}>
                    <Image
                        source={require("@/assets/images/pup-logo.png")}
                        className="w-14 h-14 rounded-full mr-4"
                    />
                    <View className="flex-1">
                        {notification.notification_type !== "all full" ? <>
                            <Text className="text-[14px]">
                                <Text className="font-bold">{notification.bins.set.name}</Text>
                                <Text className="font-bold"> {notification.bins.color}</Text>
                                <Text> is</Text>
                                <Text className="font-bold"> {notification.notification_type}</Text>
                            </Text>
                        </>
                        :
                        <>
                            <Text>
                                    <Text className="font-bold">{notification.bins.set.name} Bins</Text>
                                    <Text> are</Text>
                                    <Text className="font-bold"> {notification.notification_type}</Text>
                                    <Text>. Please unlock and collect the bins</Text>
                            </Text>
                        
                        </>}
                        <Text className="text-caption text-gray-500">{timeAgo(notification.created_at)}</Text>
                    </View>
                    {!notification.is_read && <View className="w-3 h-3 bg-blue-500 rounded-full ml-2" />}
                </TouchableOpacity>
            ))}

            {
                notifications.length > 10 && <TouchableOpacity onPress={() => setShowAllToday(!showAllToday)}>
                    <Text className="text-brand-300 text-body absolute right-[2%] underline">{showAllToday ? 'See Less' : 'See All'}</Text>
                </TouchableOpacity>
            }
        </View >
    )
}
