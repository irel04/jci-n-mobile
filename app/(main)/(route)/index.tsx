
import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import OnDevelopment from "@/components/OnDevelopment";
import GoogleMaps from "@/components/google-maps/GoogleMaps";
import { supabase } from "@/utils/supabase";
import { useSession } from "@/contexts/auth";
import * as Location from "expo-location"


const Routes = () => {

	const [positions, setPositions] = useState([])
	const [userPos, setUserPos] = useState(null)
	
	

	useEffect(() => {
		let locationWatcher: Location.LocationSubscription; // Declare the location watcher variable

		const requestPermissionsAndTrackLocation = async () => {
			// Request permissions
			let { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
			if (foregroundStatus !== 'granted') {
				console.log('Foreground permission denied');
				return;
			}

			let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
			if (backgroundStatus !== 'granted') {
				console.log('Background permission denied');
				return;
			}

			// Watch location updates
			locationWatcher = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 5000,
					distanceInterval: 5,
				},
				async (newLocation) => {
					// Update supabase location
					try {
						const { data: userAuth } = await supabase.auth.getUser();

						if (!userAuth) return;

						// This ensures the level of accuracy before updating the location
						if(newLocation.coords.accuracy > 2.5) return 

						const { data, error } = await supabase
							.from('users_details')
							.update({
								lng: newLocation.coords.longitude,
								lat: newLocation.coords.latitude,
							})
							.eq('auth_id', userAuth.user.id)
							.select();

						if (error) throw error;

						console.log(data);
						console.log('User location updated', newLocation.coords);
						console.log('User id', userAuth.user.id);
					} catch (error) {
						console.error(error);
					}
				}
			);
		};

		requestPermissionsAndTrackLocation();

		// Cleanup function
		// return () => {
		// 	if (locationWatcher) {
		// 		locationWatcher.remove(); // Stop the location watcher
		// 		console.log('Location watcher stopped');
		// 	}
		// };
	}, []); // Add dependencies if needed
	

	// Trigger fetch user location
	useEffect(() => {
		// This fetches the bin location
		const fetchBinLocation = async () => {
			try {
				const { data, error } = await supabase.from("bins").select(`set, location(lng, lat)`)

				

				if (error) {
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


				setPositions((pos: any) => [...pos, ...flattenData])


			} catch (error) {
				console.error(error);
			}
		}

		const fetchUserLocation = async () => {
			try {

				const { data: userAuth } = await supabase.auth.getUser()


				if(!userAuth) return


				const { data, error } = await supabase.from("users_details").select("lat, lng, first_name").eq("auth_id", userAuth.user.id)


				if (error) {
					throw error
				}

				setUserPos({
					longitude: data[0].lng,
					latitude: data[0].lat,
					title: data[0].first_name,
					type: "user"
				})


			} catch (error) {
				console.error(error);
			}
		}

		fetchUserLocation()
		fetchBinLocation()
	}, [])


	return (
		// <OnDevelopment/>
		<View className="flex-auto flex w-full h-full">
			{positions.length > 0 && userPos &&<GoogleMaps markerCoordinates={positions} movingMarkerCoords={userPos} />}
		</View>
	)
}

export default Routes