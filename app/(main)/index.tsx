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

	const [currentWeather, setCurrentWeather] = useState(null)

	const getUser = async () => {
		const { data, error } = await supabase.from("users_details").select("first_name, last_name, id, lng, lat").eq("auth_id", parseSession.session.user.id)

		if (error) throw error

		
		return data
	}

	const getDailySummary = async () => {
		const { data, error } = await supabase.from("daily_summary").select("*, bins(*)").eq("date", currentDate.toISOString().split("T")[0])

		if(error) throw error

		console.log(data)
		setDailySummary(data)
	}

	const getWeather = async (lat: number, lon: number) => {
		const API_KEY = process.env.EXPO_PUBLIC_OPWKEY; // Replace with your OpenWeatherMap API key
		const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

		const response = await fetch(API_URL);
		if (!response.ok) {
			throw new Error('Failed to fetch weather data');
		}
		const data = await response.json();

		setCurrentWeather(data)
	};

	const fetchData = async () => {
		try {
			// Get user
			const user = await getUser()
			setCurrentUser(user)

			// get daily summary
			await getDailySummary()

			await getWeather(user[0].lat, user[0].lng)

		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		
		fetchData()
	}, [])


	// Make it realtime using subscribe
	useEffect(() => {

		const channels = supabase.channel('daily-summary-changes').on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'daily_summary' },
				() => {
					fetchData()
				}).subscribe()
		
		return () => {
			supabase.removeChannel(channels);
		};

	}, [])
	

	return (
		<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }} >
				{loading ? (
				<View className="h-screen flex items-center justify-center">
					<LoaderKit style={{ width: 50, height: 50 }}
						name={'BallPulse'} // Optional: see list of animations below
						color={'#0E46A3'} />
				</View>
				) : (
					<>
						<View>
							<Text className="text-left text-h5 font-[700] pb-5">Welcome, {currentUser[0].first_name}!</Text>
						</View>

						<Weather currentDate={currentDate.toDateString()} degree={currentWeather.main.feels_like}/>

						<View className="flex-row  mt-5 gap-2">
							<SolarPower />

							<OverflowEvents daily_summary={dailySummary} />
						</View>

						<View>
							<TrashBinLevel daily_summary={dailySummary}/>
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