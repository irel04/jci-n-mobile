import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import NotificationCard from '@/components/notifications/NotificationCard'

export default function NotificationTab() {
    // Notifications data moved here
    const notifications = {
        today: [
            { id: 1, message: 'Bin A is almost full', time: '5 mins ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 2, message: 'Bin B is almost empty', time: '10 mins ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 3, message: 'Bin C is almost full', time: '15 mins ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 4, message: 'Bin D is being cleaned', time: '1 hour ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 5, message: 'Bin E needs repair', time: '2 hours ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 6, message: 'Bin F is full', time: '3 hours ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 7, message: 'Bin G is almost full', time: '4 hours ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 8, message: 'Bin H is being cleaned', time: '5 hours ago', imageUri: 'https://via.placeholder.com/50' },
        ],
        last7Days: [
            { id: 1, message: 'Bin G was emptied', time: '2 days ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 2, message: 'Bin H needs cleaning', time: '3 days ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 3, message: 'Bin I was replaced', time: '5 days ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 4, message: 'Bin J is overflowing', time: '6 days ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 5, message: 'Bin K was cleaned', time: '7 days ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 6, message: 'Bin L was emptied', time: '7 days ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 7, message: 'Bin M needs repair', time: '4 days ago', imageUri: 'https://via.placeholder.com/50' },
            { id: 8, message: 'Bin N is full', time: '5 days ago', imageUri: 'https://via.placeholder.com/50' },
        ]
    }

    return (
        <View className="p-5">
            <View className="flex-row justify-between pb-4 items-end relative">
                <Text className="text-left text-h5 font-bold">Notifications</Text>
                <TouchableOpacity>
                    <Text className="text-body font-[400] text-brand-500">Mark all as read</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className='h-[95%]'>
                <View>
                    {/* Pass the notifications data as props to NotificationCard */}
                    <NotificationCard notifications={notifications} />
                </View>
            </ScrollView>
        </View>
    )
}
