import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Weather from '@/components/home/Weather';
import SolarPower from '@/components/home/SolarPower';
import TrashBinLevel from '@/components/home/TrashBinLevel';
import OverflowEvents from '@/components/home/OverflowEvents';
import Route from "@/app/(main)/(route)/index"
import { supabase } from "@/utils/supabase";
import { useSession } from "@/contexts/auth";

interface UserSchema {
	first_name: string,
	last_name: string,
	id: string
}

const Main = () => {
	const firstname = "Jonas Brian";

	const [currentUser, setCurrentUser] = useState<UserSchema[]>([])
	const [loading, setLoading] = useState(true);

	const { session } = useSession()
	const parseSession = JSON.parse(session)

	useEffect(() => {
		const getUser = async () => {
			try {
				const { data, error } = await supabase.from("users_details").select("first_name, last_name, id").eq("auth_id", parseSession.session.user.id) 

				if(error) throw error

				console.log(data)
				setCurrentUser(data)

			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false);
			}
		}

		// getUser()
	}, [])
	

	return (
		<View className="flex-1 bg-white">
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
				{loading ? (
					<ActivityIndicator size="large" color="#0000ff" />
				) : (
					<>
						<View>
							<Text className="text-left text-h5 font-[700] pb-5">Welcome, {currentUser[0].first_name}!</Text>
						</View>

						<Weather />

						<View className="flex-row gap-[5%] mt-5">
							<View className="w-[30%]">
								<SolarPower />
							</View>
							
							<View className="flex-col justify-between p-3 rounded-xl bg-brand-700 items-left gap-2 w-[65%]">
								<OverflowEvents />
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
		</View>
	);
};

export default Main;