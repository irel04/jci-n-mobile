
import { View, Text, Alert, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import OnDevelopment from "@/components/OnDevelopment";
import GoogleMaps, { MarkerCoordinate } from "@/components/google-maps/GoogleMaps";
import { supabase } from "@/utils/supabase";
import { useSession } from "@/contexts/auth";
import * as Location from "expo-location"
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import CustomModal from "@/components/ui/Modal";
import SelectBinToRouteModal from "@/components/route/SelectBinToRouteModal";
import { TSetTable, TUserSession } from "@/components/types";

interface RouteComponent {
	showButton?: boolean,
	bins?: MarkerCoordinate[],
}

interface UpdateLocation {
	latitude: number,
	longitude: number,
}

const Routes = ({ showButton = true, bins }: RouteComponent) => {

	const [positions, setPositions] = useState([])
	const [userPos, setUserPos] = useState(null)

	const [sets, setSets] = useState<TSetTable[]>(null)

	const [showRoute, setShowRoute] = useState(false)
	const [showChoseModal, setShowChoseModal] = useState(false)
	const pickerRef = useRef(null)

	const [selectedSetId, setSelectedSetId] = useState(null)

	
	const { session } = useSession()
	const userAuth = session ? JSON.parse(session) as TUserSession : null

	// side effect for prompting user about permission on location sharing and navigation
	useEffect(() => {
		let locationWatcher: Location.LocationSubscription; // Declare the location watcher variable

		const updateSupabaseLocation = async (lastLocation: UpdateLocation) => {
			try {
				

				if (!userAuth.user_id) return;

				const { data, error } = await supabase
					.from('users_details')
					.update({
						lng: lastLocation.longitude,
						lat: lastLocation.latitude,
					})
					.eq('id', userAuth.user_id)
					.select();

				if (error) throw error;
				
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
					const { accuracy, latitude, longitude, speed } = newLocation.coords;

					console.log(accuracy)
					// Reject updates with poor accuracy
					if (accuracy > 20) return;

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
	}, []); 
	

	// This fetches the bin location
	const fetchBinLocation = async () => {
		try {


			if (!userAuth) return

			const { data, error } = await supabase.from("bins").select(`set, location(lng, lat), color, id, is_full`)


			if (error) {
				throw error
			}

			const flattenData: MarkerCoordinate[] = data.map(bin => {
				return {
					id: bin.id,
					title: bin.is_full ? "Full" : "Available",
					longitude: bin.location[0]?.lng,
					latitude: bin.location[0]?.lat,
					type: "bin",
					setId: bin.set
				}
			})


			setPositions(flattenData)


		} catch (error) {
			console.error(error);
		}
	}

	// Trigger fetch user location
	useEffect(() => {
		

		const fetchUserLocation = async () => {
			try {

				if(!userAuth) return


				const { data, error } = await supabase.from("users_details").select("lat, lng, first_name").eq("id", userAuth.user_id)


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

	useEffect(()=> {
		const channels = supabase.channel('custom-bin-channel').on("postgres_changes", { event: '*', schema: 'public', table: 'bins' }, () => {
			fetchBinLocation();
			console.info("Occured")
		}).on("postgres_changes", { event: '*', schema: 'public', table: 'location' }, () => {
			fetchBinLocation()
			console.info("Changes occured")
		})

		channels.subscribe();


		return () => {
			channels.unsubscribe();
		}
	}, [])

	// Fetch sets
	useEffect(() => {
		const fetchSets = async () => {
			try {
				const {data, error} = await supabase.from("sets").select("*")

				if(error) throw error

				setSets(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchSets()

	}, [])
	
	
	
	// This function is for recording changes via the dropdowns -- it feeds the record for handlecontinue
	function handleSelectBin(setId: string){
		setSelectedSetId(setId)
	}

	// Function for showing the actual polyline/route on the maps 
	function handleContinueOnRoute(){
		setShowRoute(true)
		setShowChoseModal(!showChoseModal)
	}

	// This is for the show route button where it is parameter for the choose modal 
	function handleOnPressShowRoute (){
		if (!showRoute) {
			setShowChoseModal(!showChoseModal)
		} else {
			setShowRoute(!showRoute)
		}

	}


	return (
		// <OnDevelopment/>
		<View className="flex-auto flex w-full h-full relative">
			{showButton && <View className="absolute right-5 top-5 z-10">
				<CustomButton styleType={StyleType.BRAND_PRIMARY} width="w-32" onPress={handleOnPressShowRoute}>
					<Text className="text-white-500 text-sm">{showRoute ? "Hide Route" : "Show Route"}</Text>
				</CustomButton>
			</View>}
			{userPos &&<GoogleMaps markerCoordinates={bins || positions} movingMarkerCoords={userPos} showRoute={showRoute} selectedSetId={selectedSetId}/>}
			{/* Modal */}
			<CustomModal isVisible={showChoseModal}>
				<View className="bg-white-500 p-5 rounded-lg shadow-lg flex justify-center items-center w-3/4 gap-10">
					{sets && <SelectBinToRouteModal sets={sets} handleSelectValue={handleSelectBin} />}
					<View className="gap-2">
						<CustomButton styleType={StyleType.BRAND_PRIMARY} width="w-36" onPress={handleContinueOnRoute}>
							<Text className="text-white-500">Continue</Text>
						</CustomButton>
						<CustomButton styleType={StyleType.DESTRUCTIVE_SECONDARY} width="w-36" onPress={() => setShowChoseModal(!showChoseModal)}>
							<Text>Cancel</Text>
						</CustomButton>
					</View>
				</View>
			</CustomModal>
		</View>
	)
}

export default Routes