import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import NotificationCard from '@/components/notifications/NotificationCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from "@/utils/supabase";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import { getLast30Days, getLast7Days, getToday, getYesterday } from "@/utils/helper";
import Entypo from '@expo/vector-icons/Entypo';
import { useSession } from "@/contexts/auth";
import { TUserSession } from "@/components/types";

export default function NotificationTab() {

    const [upComingNotifications, setUpComingNotifications] = useState([])

    const [last7Days, setLast7Days] = useState([])

    const [yesterdayNotification, setYesterdayNotification] = useState([])
    const [last30Days, setLast30Days] = useState([])


    // user id 
    const { session } = useSession()
    const userAuth = JSON.parse(session) as TUserSession

    const [isLoading, setIsLoading] = useState(false)

    const fetchNotifications = async () => {
        const formatString = "yyyy-MM-dd HH:mm:ss.SSSXX";

        try {
            setIsLoading(true); // Ensure loading state starts here


            const { yesterdayDateStart, yesterdayDateEnd } = getYesterday(formatString);

            const { todayDateStart, todayDateEnd } = getToday(formatString)

            const { last7DaysEnd, last7DaysStart } = getLast7Days(formatString)

            const {last30DaysStart, last30DaysEnd} = getLast30Days(formatString)

            // Run both queries in parallel
            const [{ data: upcomingNotifications, error: upcomingError }, { data: yesterdayNotifications, error: yesterdayError }, { data: last7DaysNotification, error: last7DaysError }, {data: last30DaysNotification, error: last30DaysNotificationError}] =
                await Promise.all([
                    supabase
                        .from("notifications")
                        .select(`notification_type, bins(color, set(id, name), id), created_at, is_read, id`)
                        .eq("nearest_user_id", userAuth.user_id)
                        .gte("created_at", todayDateStart)
                        .lte("created_at", todayDateEnd)
                        .order("created_at", { ascending: false }).order("bin_id", { ascending: true }),

                    supabase
                        .from("notifications")
                        .select(`notification_type, bins(color, set(id, name), id), created_at, is_read, id`)
                        .eq("nearest_user_id", userAuth.user_id)
                        .gte("created_at", yesterdayDateStart)
                        .lte("created_at", yesterdayDateEnd)
                        .order("created_at", { ascending: false }).order("bin_id", { ascending: true }),

                    supabase
                        .from("notifications")
                        .select(`notification_type, bins(color, set(id, name), id), created_at, is_read, id`)
                        .eq("nearest_user_id", userAuth.user_id)
                        .gte("created_at", last7DaysStart)
                        .lte("created_at", last7DaysEnd)
                        .order("created_at", { ascending: false }).order("bin_id", { ascending: true }),
                    supabase
                    .from("notifications")
                    .select(`notification_type, bins(color, set(id, name), id), created_at, is_read, id`)
                    .eq("nearest_user_id", userAuth.user_id)
                    .gte("created_at", last30DaysStart)
                    .lte("created_at", last30DaysEnd)
                    .order("created_at", { ascending: false }).order("bin_id", { ascending: true }),
                ]);

            // Log and handle errors
            if (upcomingError) throw upcomingError;
            if (yesterdayError) throw yesterdayError;
            if (last7DaysError) throw last7DaysError;
            if(last30DaysNotificationError) throw last30DaysNotificationError

            // Update state safely
            setUpComingNotifications(upcomingNotifications || []);
            setYesterdayNotification(yesterdayNotifications || []);
            setLast7Days(last7DaysNotification)
            setLast30Days(last30DaysNotification)
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetching of notification to load 
    useEffect(() => {

        fetchNotifications()

    }, [])


    const handlePressMarkAllAsRead = async () => {
        setIsLoading(true)
        try {
            const { error } = await supabase.from("notifications").update({ is_read: true }).eq("nearest_user_id", userAuth.user_id)

            if(error) throw error
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

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
            {isLoading ? <LoadingAnimation /> : <>
                <View className="flex-row justify-between p-5 items-end relative">
                    <View className='flex-row justify-between items-center gap-3'>
                        <Text className="text-left text-h5 font-bold">Notifications</Text>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </View>
                    <TouchableOpacity onPress={handlePressMarkAllAsRead}>
                        <Text className="text-body font-[400] text-brand-500">Mark all as read</Text>
                    </TouchableOpacity>
                </View>
                {upComingNotifications.length > 0 || yesterdayNotification.length > 0 || last7Days.length > 0 || last30Days.length > 0?
                    <ScrollView showsVerticalScrollIndicator={false} className='h-[95%] w-full'>
                        <View className="flex flex-col gap-2 pb-4">
                            {/* Pass the notifications data as props to NotificationCard */}
                            <NotificationCard notifications={upComingNotifications} label="Today" />

                            <NotificationCard notifications={yesterdayNotification} label="Yesterday" />

                            <NotificationCard notifications={last7Days} label="Last 7 Days" />

                            <NotificationCard notifications={last30Days} label="Last 30 Days" />

                        </View>
                    </ScrollView>
                    :
                    <View className="flex-1 justify-center items-center gap-4">
                        <Entypo name="notifications-off" size={48} color="#757576" />
                        <Text className="text-neutral-500 italic">You do not have any notification here right now</Text>
                    </View>
                } 
            </>}
        </>
    )
}
