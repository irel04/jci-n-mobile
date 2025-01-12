
import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import OnDevelopment from "@/components/OnDevelopment";
import GoogleMaps from "@/components/google-maps/GoogleMaps";
import { supabase } from "@/utils/supabase";
import { useSession } from "@/contexts/auth";
import * as Location from "expo-location"

interface RouteComponent {
	showPolyline?: boolean
}

interface UpdateLocation {
	latitude: number,
	longitude: number
}

const Routes = ({ showPolyline=true }: RouteComponent) => {

	const [positions, setPositions] = useState([])
	const [userPos, setUserPos] = useState(null)
	
	

	useEffect(() => {
		let locationWatcher: Location.LocationSubscription; // Declare the location watcher variable

		const updateSupabaseLocation = async (lastLocation: UpdateLocation) => {
			try {
				const { data: userAuth } = await supabase.auth.getUser();

				if (!userAuth) return;

				const { data, error } = await supabase
					.from('users_details')
					.update({
						lng: lastLocation.longitude,
						lat: lastLocation.latitude,
					})
					.eq('auth_id', userAuth.user.id)
					.select();

				if (error) throw error;
				;
			} catch (error) {
				console.error(error);
			}
		}

		
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

			let lastValidLocation = null;

			locationWatcher = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.BestForNavigation,
					timeInterval: 5000,
					distanceInterval: 5,
				},
				async (newLocation) => {
					const { accuracy, latitude, longitude } = newLocation.coords;

					// Reject updates with poor accuracy
					if (accuracy > 10) return;

					// Smooth the location updates using weighted averaging
					if (lastValidLocation) {
						const weight = accuracy / (accuracy + lastValidLocation.accuracy);
						const smoothedLatitude = weight * latitude + (1 - weight) * lastValidLocation.latitude;
						const smoothedLongitude = weight * longitude + (1 - weight) * lastValidLocation.longitude;

						lastValidLocation = {
							latitude: smoothedLatitude,
							longitude: smoothedLongitude,
							accuracy: (accuracy + lastValidLocation.accuracy) / 2,
						};
					} else {
						lastValidLocation = newLocation.coords;
					}

					console.log('Smoothed Location:', lastValidLocation);

					// Proceed with updating Supabase
					await updateSupabaseLocation(lastValidLocation);
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
			{positions.length > 0 && userPos &&<GoogleMaps markerCoordinates={positions} movingMarkerCoords={userPos} showPolyLine={showPolyline }/>}
		</View>
	)
}

export default Routes