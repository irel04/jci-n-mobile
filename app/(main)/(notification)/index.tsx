import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import NotificationCard from '@/components/notifications/NotificationCard'
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from "@/utils/supabase";
import LoaderKit from "react-native-loader-kit"
import LoadingAnimation from "@/components/ui/LoadingAnimation";


export default function NotificationTab() {

    const [upComingNotifications, setUpComingNotifications] = useState([])

    const [isLoading, setIsloading] = useState(true)

    const fetchNotifications = async () => {
        try {
            const { data: userAuth } = await supabase.auth.getUser()

            if (!userAuth.user) return

            const { data: user } = await supabase.from("users_details").select("id").eq("auth_id", userAuth.user.id)

            const { data: notifications } = await supabase.from("notifications").select(`notification_type, bins(color, set, id), created_at, is_read, id`).eq("nearest_user_id", user[0].id).order('created_at', { ascending: false });

            setUpComingNotifications(notifications)

        } catch (error) {
            console.error(error)
        } finally {
            setIsloading(false)
        }
    }
    // Initial fetching of notification to load 
    useEffect(() => {

        fetchNotifications()

    }, [])

    // Update Realtime using subscribe
    useEffect(() => {
        const channels = supabase.channel('custom-insert-update-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'notifications' },
                (payload) => {
                    fetchNotifications()
                }
            )
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'notifications' },
                (payload) => {
                    fetchNotifications()
                }
            )
            .subscribe()

        return () => {
            channels.unsubscribe()
        }
    }, [])


    return (
        <>
            {isLoading ? <LoadingAnimation/> : <>
                <View className="flex-row justify-between p-5 items-end relative">
                    <View className='flex-row justify-between items-center gap-3'>
                        <Text className="text-left text-h5 font-bold">Notifications</Text>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </View>
                    <TouchableOpacity>
                        <Text className="text-body font-[400] text-brand-500">Mark all as read</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} className='h-[95%] w-full'>
                    <View>
                        {/* Pass the notifications data as props to NotificationCard */}
                        <NotificationCard notifications={upComingNotifications} />
                    </View>
                </ScrollView>
            </>}
        </>
    )
}
