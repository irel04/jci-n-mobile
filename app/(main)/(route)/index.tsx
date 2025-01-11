
import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import OnDevelopment from "@/components/OnDevelopment";
import GoogleMaps from "@/components/google-maps/GoogleMaps";
import { supabase } from "@/utils/supabase";
import { useSession } from "@/contexts/auth";

const Routes = () => {

	const [positions, setPositions] = useState([])
	const [toggle, setToggle] = useState(false)

	//  This get the user id logged in mobile
	const { session } = useSession()
	const userSession = JSON.parse(session)

	const fetchUserLocation = async () => {
		try {
			const { data, error } = await supabase.from("users_details").select("lat, lng, first_name").eq("auth_id", userSession.session.user.id)


			if(error){
				throw error
			}

			setPositions((pos:any) => [...pos, {
				longitude: data[0].lng,
				latitude: data[0].lat,
				title: data[0].first_name,
				type: "user"
			}])

			

		} catch (error) {
			console.error(error);
		}
	}

	// This fetches the bin location
	const fetchBinLocation = async() => {
		try {
			const { data, error } = await supabase.from("bins").select(`set, location(lng, lat)`)

			if(error){
				throw error
			}


			const flattenData = data.map(bin => {
				return {
					title: bin.set,
					longitude: bin.location[0].lng,
					latitude: bin.location[0].lat,
					type: "bin"
				}
			})


			setPositions((pos:any) => [...pos, ...flattenData])
			

		} catch (error) {
			console.error(error);
		}
	}

	// Trigger fetch user location
	useEffect(() => {
		fetchUserLocation()
		fetchBinLocation()
	}, [toggle])

	// This susbcribes to changes happen on the user location
	useEffect(() => {

		const channels = supabase.channel('custom-update-channel')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'users_details' },
				(payload) => {
					const { lng: longitude, lat: latitude, first_name } = payload.new
					
					setToggle(!toggle)
				}
			)
			.subscribe()
	}, [])

	return (
		// <OnDevelopment/>
		<View className="flex w-screen h-full border-2 border-red-500">
			{positions.length !== 0 && <GoogleMaps markerCoordinates={positions}/>}
		</View>
	)
}

export default Routes