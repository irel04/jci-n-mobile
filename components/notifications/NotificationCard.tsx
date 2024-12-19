import { Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function NotificationCard({ notifications }) {
    // State to toggle the visibility of all notifications for Today and Last 7 Days
    const [showAllToday, setShowAllToday] = useState(false)
    const [showAllLast7Days, setShowAllLast7Days] = useState(false)

    // Function to render notifications with pagination (show first 5 and then full list)
    const renderNotifications = (notifications, showAll) => {
        const displayedNotifications = showAll ? notifications : notifications.slice(0, 5)

        return displayedNotifications.map((notification) => (
            <View key={notification.id} className="flex-row items-center mt-2">
                <Image
                    source={{ uri: notification.imageUri }}
                    className="w-12 h-12 rounded-full mr-4"
                />
                <View className="flex-1">
                    <Text className="text-body">{notification.message}</Text>
                    <Text className="text-caption text-gray-500">{notification.time}</Text>
                </View>
            </View>
        ))
    }

    return (
        <View className="p-4 mb-10">
            {/* Today's Notifications */}
            <View className="relative mb-5">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-bold">Today</Text>
                </View>
                {renderNotifications(notifications.today, showAllToday)}

                <TouchableOpacity onPress={() => setShowAllToday(!showAllToday)}>
                    <Text className="text-brand-300 text-body absolute right-[2%] underline">{showAllToday ? 'See Less' : 'See All'}</Text>
                </TouchableOpacity>
            </View>

            {/* Last 7 Days Notifications */}
            <View className="mt-6 relative">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-bold">Last 7 Days</Text>
                </View>
                {renderNotifications(notifications.last7Days, showAllLast7Days)}

                <TouchableOpacity onPress={() => setShowAllLast7Days(!showAllLast7Days)}>
                    <Text className="text-brand-300 text-body absolute right-[2%] underline">{showAllLast7Days ? 'See Less' : 'See All'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
