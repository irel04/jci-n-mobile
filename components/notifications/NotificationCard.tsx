import { Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { timeAgo } from "@/utils/helper"


interface Bins {
    color: string,
    set: string,
}

interface NotificationObj {
    notification_type: string,
    created_at: string,
    bins: Bins
}

interface NotificationCardAttr {
    notifications: NotificationObj[]
}

export default function NotificationCard({ notifications }: NotificationCardAttr) {
    // State to toggle the visibility of all notifications for Today and Last 7 Days
    const [showAllToday, setShowAllToday] = useState(false)
    const [showAllLast7Days, setShowAllLast7Days] = useState(false)

    // Function to render notifications with pagination (show first 5 and then full list)
    const renderNotifications = (notifications: any, showAll: any) => {
        const displayedNotifications = showAll ? notifications : notifications.slice(0, 10)

        return displayedNotifications.map((notification: NotificationObj, index: number) => (
            <View key={index} className="flex-row items-center py-2">
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
            </View>
        ))
    }

    return (
        <View className="p-4 mb-10">
            {/* Today's Notifications */}
            <View className="relative mb-5 bg">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold">Earlier</Text>
                </View>
                {renderNotifications(notifications, showAllToday)}

                {notifications.length > 10 && <TouchableOpacity onPress={() => setShowAllToday(!showAllToday)}>
                    <Text className="text-brand-300 text-body absolute right-[2%] underline">{showAllToday ? 'See Less' : 'See All'}</Text>
                </TouchableOpacity>}
            </View>

            {/* Last 7 Days Notifications */}
            {/* <View className="mt-6 relative">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-bold">Last 7 Days</Text>
                </View>
                {renderNotifications(notifications.last7Days, showAllLast7Days)}

                <TouchableOpacity onPress={() => setShowAllLast7Days(!showAllLast7Days)}>
                    <Text className="text-brand-300 text-body absolute right-[2%] underline">{showAllLast7Days ? 'See Less' : 'See All'}</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}
