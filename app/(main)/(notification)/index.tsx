import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import NotificationCard from '@/components/notifications/NotificationCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from "@/utils/supabase";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import { getLast7Days, getToday, getYesterday } from "@/utils/helper";
import Entypo from '@expo/vector-icons/Entypo';

export default function NotificationTab() {

    const [upComingNotifications, setUpComingNotifications] = useState([])

    const [last7Days, setLast7Days] = useState([])

    const [yesterdayNotification, setYesterdayNotification] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const fetchNotifications = async () => {
        const formatString = "yyyy-MM-dd HH:mm:ss.SSSXX";

        try {
            setIsLoading(true); // Ensure loading state starts here

            // Get user authentication info
            const { data: userAuth, error: authError } = await supabase.auth.getUser();
            if (authError || !userAuth.user) throw new Error("User authentication failed.");

            // Get user ID from users_details
            const { data: user, error: userError } = await supabase
                .from("users_details")
                .select("id")
                .eq("auth_id", userAuth.user.id);

            if (userError || !user || user.length === 0) throw new Error("User not found.");

            const userId = user[0].id;
            const { yesterdayDateStart, yesterdayDateEnd } = getYesterday(formatString);

            const { todayDateStart, todayDateEnd } = getToday(formatString)

            const { last7DaysEnd, last7DaysStart } = getLast7Days(formatString)

            // Run both queries in parallel
            const [{ data: upcomingNotifications, error: upcomingError }, { data: yesterdayNotifications, error: yesterdayError }, { data: last7DaysNotification, error: last7DaysError }] =
                await Promise.all([
                    supabase
                        .from("notifications")
                        .select(`notification_type, bins(color, set(id, name), id), created_at, is_read, id`)
                        .eq("nearest_user_id", userId)
                        .gte("created_at", todayDateStart)
                        .lte("created_at", todayDateEnd)
                        .order("created_at", { ascending: false }).order("bin_id", { ascending: true }),

                    supabase
                        .from("notifications")
                        .select(`notification_type, bins(color, set(id, name), id), created_at, is_read, id`)
                        .eq("nearest_user_id", userId)
                        .gte("created_at", yesterdayDateStart)
                        .lte("created_at", yesterdayDateEnd)
                        .order("created_at", { ascending: false }).order("bin_id", { ascending: true }),

                    supabase
                        .from("notifications")
                        .select(`notification_type, bins(color, set(id, name), id), created_at, is_read, id`)
                        .eq("nearest_user_id", userId)
                        .gte("created_at", last7DaysStart)
                        .lte("created_at", last7DaysEnd)
                        .order("created_at", { ascending: false }).order("bin_id", { ascending: true }),
                ]);

            // Log and handle errors
            if (upcomingError) throw upcomingError;
            if (yesterdayError) throw yesterdayError;
            if (last7DaysError) throw last7DaysError;


            // Update state safely
            setUpComingNotifications(upcomingNotifications || []);
            setYesterdayNotification(yesterdayNotifications || []);
            setLast7Days(last7DaysNotification)
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
                    <TouchableOpacity>
                        <Text className="text-body font-[400] text-brand-500">Mark all as read</Text>
                    </TouchableOpacity>
                </View>
                {upComingNotifications.length > 0 && yesterdayNotification.length > 0 && last7Days.length > 0 ?
                    <ScrollView showsVerticalScrollIndicator={false} className='h-[95%] w-full'>
                        <View className="flex flex-col gap-2 pb-4">
                            {/* Pass the notifications data as props to NotificationCard */}
                            <NotificationCard notifications={upComingNotifications} label="Today" />

                            <NotificationCard notifications={yesterdayNotification} label="Yesterday" />

                            <NotificationCard notifications={last7Days} label="Last 7 Days" />


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
