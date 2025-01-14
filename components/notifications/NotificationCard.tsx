import { Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { timeAgo } from "@/utils/helper"
import { supabase } from "@/utils/supabase"
import { router } from "expo-router"
import { Bins } from "@/utils/schemas"



interface NotificationObj {
    notification_type: string,
    created_at: string,
    bins: Bins,
    is_read: boolean,
    id: string
}

interface NotificationCardAttr {
    notifications: NotificationObj[]
}

export default function NotificationCard({ notifications }: NotificationCardAttr) {
    // State to toggle the visibility of all notifications for Today and Last 7 Days
    const [showAllToday, setShowAllToday] = useState(false)
    const [showAllLast7Days, setShowAllLast7Days] = useState(false)


    const handlePressNotification = async (id: string) => {
        try {
            const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", id)

            if(error) throw error

            
            router.push("/(main)/(statistics)")
            router.setParams({ id })
            

        } catch (error) {
            console.error(error)
        }
    }

    // Function to render notifications with pagination (show first 5 and then full list)
    const renderNotifications = (notifications: any, showAll: any) => {
        const displayedNotifications = showAll ? notifications : notifications.slice(0, 10)

        return displayedNotifications.map((notification: NotificationObj, index: number) => (
            <TouchableOpacity key={index} className={`flex-row items-center px-5 py-2  ${!notification.is_read ? "bg-neutral-200" : ""}`} onPress={() => handlePressNotification(notification.id)}>
                <Image
                    source={require("@/assets/images/pup-logo.png")}
                    className="w-14 h-14 rounded-full mr-4"
                />
                <View className="flex-1">
                    <Text className="text-[14px]">
                        <Text className="font-bold">{notification.bins.set}</Text>
                        <Text className="font-bold"> {notification.bins.color}</Text>
                        <Text> is</Text>
                        <Text className="font-bold"> {notification.notification_type}</Text>
                    </Text>
                    <Text className="text-caption text-gray-500">{timeAgo(notification.created_at)}</Text>
                </View>
                {!notification.is_read && <View className="w-3 h-3 bg-blue-500 rounded-full ml-2" />}
            </TouchableOpacity>
        ))
    }

    return (
        // <View className="p-4 mb-10 border-blue-700 border-2">


        //     {/* Last 7 Days Notifications */}
        //     <View className="mt-6 relative">
        //         <View className="flex-row justify-between items-center">
        //             <Text className="text-lg font-bold">Last 7 Days</Text>
        //         </View>
        //         {renderNotifications(notifications.last7Days, showAllLast7Days)}

        //         <TouchableOpacity onPress={() => setShowAllLast7Days(!showAllLast7Days)}>
        //             <Text className="text-brand-300 text-body absolute right-[2%] underline">{showAllLast7Days ? 'See Less' : 'See All'}</Text>
        //         </TouchableOpacity>
        //     </View>
        // </View>
        <>
            {/* Today's Notifications */}
            < View className="relative mb-5" >
                <View className="flex-row justify-between items-center px-5">
                    <Text className="text-lg font-bold">Earlier</Text>
                </View>
                {renderNotifications(notifications, showAllToday)}

                {
                    notifications.length > 10 && <TouchableOpacity onPress={() => setShowAllToday(!showAllToday)}>
                        <Text className="text-brand-300 text-body absolute right-[2%] underline">{showAllToday ? 'See Less' : 'See All'}</Text>
                    </TouchableOpacity>
                }
            </View >
        </>
    )
}
