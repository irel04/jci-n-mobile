import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Weather from '@/components/home/Weather';
import SolarPower from '@/components/home/SolarPower';
import TrashBinLevel from '@/components/home/TrashBinLevel';
import OverflowEvents from '@/components/home/OverflowEvents';
import Route from "@/app/(main)/(route)/index"
import { supabase } from "@/utils/supabase";
import { useSession } from "@/contexts/auth";
import LoaderKit from "react-native-loader-kit"
import { DailySummarySchema, UserSchema } from "@/utils/schemas";



const Main = () => {

	const [currentUser, setCurrentUser] = useState<UserSchema[]>([])
	const [loading, setLoading] = useState(true);

	const { session } = useSession()
	const parseSession = JSON.parse(session)

	const currentDate = new Date()
	const [dailySummary, setDailySummary] = useState<DailySummarySchema[]>([])

	const getUser = async () => {
		const { data, error } = await supabase.from("users_details").select("first_name, last_name, id").eq("auth_id", parseSession.session.user.id)

		if (error) throw error

		setCurrentUser(data)
	}

	const getDailySummary = async () => {
		const { data, error } = await supabase.from("daily_summary").select("*, bins(*)").eq("date", currentDate.toISOString().split("T")[0])

		if(error) throw error

		console.log(data)

		setDailySummary(data)
	}


	useEffect(() => {
		const fetchData = async () => {
			try {
				// Get user
				await getUser()

				// get daily summary
				await getDailySummary()

			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false);
			}
		}

		fetchData()
	}, [])
	

	return (
		<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, height: "100%" }} className="">
				{loading ? (
				<View className=" h-full flex items-center justify-center">
					<LoaderKit style={{ width: 50, height: 50 }}
						name={'BallPulse'} // Optional: see list of animations below
						color={'#0E46A3'} />
				</View>
				) : (
					<>
						<View>
							<Text className="text-left text-h5 font-[700] pb-5">Welcome, {currentUser[0].first_name}!</Text>
						</View>

						<Weather currentDate={currentDate.toDateString()}/>

						<View className="flex-row gap-[5%] mt-5">
							<View className="w-[30%]">
								<SolarPower />
							</View>
							
							<View className="flex-col justify-between p-3 rounded-xl bg-brand-700 items-left gap-2 w-[65%]">
								<OverflowEvents daily_summary={dailySummary}/>
							</View>
						</View>

						<View>
							<TrashBinLevel />
						</View>

						<View className="flex h-52 mt-5 border-brand-700 border-2 rounded-xl p-1">
							<Route showButton={false}/>
						</View>
					</>
				)}
			</ScrollView>
	);
};

export default Main;