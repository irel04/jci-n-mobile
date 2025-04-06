import CustomButton, { StyleType } from "@/components/ui/CustomButton"
import React, { useEffect, useState } from "react"
import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import RNPickerSelect from 'react-native-picker-select';
import { TSetTable } from "@/components/types";
import { supabase } from "@/utils/supabase";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialIcons } from "@expo/vector-icons";

const BinConfigModal = () => {

	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const [sets, setSets] = useState<TSetTable[]>(null)
	const [selectedSet, setSelectedSet] = useState<string>(null)

	const [isSetLocked, setIsSetLocked] = useState<boolean>(false)


	const handleBinLocked = async (isLocked: boolean
	) => {
		try {
			const { error } = await supabase.from("bins").update({ is_locked: isLocked }).eq("set", selectedSet)

			if (error) throw error

			console.log("Success")
			// setModalVisible(false)
		} catch (error) {
			console.error(error)
		}
	}

	const fetchBinIsLockedStatus = async () => {
		try {

			const { data: binSets, error: binSetsError } = await supabase.from("sets").select("*").order("name")

			if (binSetsError) return
			setSets(binSets)



			const { data, error } = await supabase.from("bins").select("is_locked").eq("set", binSets[0].id)

			if (error) throw error


			setIsSetLocked(data[0].is_locked)

		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchBinIsLockedStatus()
	}, [])

	// check if unlocked or locked
	useEffect(() => {


		const channels = supabase.channel('custom-all-channel')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'bins' },
				(payload) => {
					fetchBinIsLockedStatus()
				}
			)
			.subscribe()


		return () => {
			channels.unsubscribe()
		}
	}, [])   

	return (
		<>
			
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<Image source={require('@/assets/images/trashbin.png')} className='w-[67.93px] h-[100px] items-center mb-5' />
			</TouchableOpacity>
			<Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)} >
				<View style={styles.container}>
					<Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
						<MaterialIcons name="close" size={18} color="black" />
					</Pressable>
					<View className="flex-row items-center gap-3">
						<Text className="font-bold text-h5 text-neutral-500">Bin Config</Text>
						<Ionicons name="settings-outline" size={24} color="#737373" />
					</View>
					<View className="relative border-neutrals-200 border-b-[1px] pb-4 mt-5">
						<View className="flex-row gap-2 items-center mt-5 ">
							<Feather name="lock" size={16} color="#737373" />
							<Text className="text-xl font-bold text-neutral-500">Control </Text>
						</View>
						<Text className="text-sm mb-2 text-neutral-400">
							Choose set of bins and manually control its lock state.
						</Text>

						{sets && sets.length > 0 && <View className="my-5">
							<RNPickerSelect items={sets.map((item) => {
								return {
									label: item.name,
									value: item.id
								}
							})} onValueChange={(value) => setSelectedSet(value)} value={sets[0].id} style={{
								inputAndroid: {
									borderWidth: 1,
									borderColor: 'lightgray',
									color: 'black',
									backgroundColor: '#E3E3E3',
								}
							}} />
						</View>}
						<View className="flex flex-row gap-2 justify-end w-full mt-5">
							<CustomButton styleType={isSetLocked ? StyleType.DESTRUCTIVE_DISABLED : StyleType.DESTRUCTIVE_PRIMARY} width="w-max" onPress={() => handleBinLocked(true)} disabled={isSetLocked}>
								<Text className="text-white-500">Lock</Text>
							</CustomButton>
							<CustomButton styleType={isSetLocked ? StyleType.BRAND_PRIMARY : StyleType.BRAND_DISABLED} width="w-max" onPress={() => handleBinLocked(false)} disabled={!isSetLocked}>
								<Text className="text-white-500">Unlock</Text>
							</CustomButton>
						</View>
					</View>
					<View className="relative border-neutrals-200 border-b-[1px] pb-4 mt-5">
						<View className="flex-row gap-2 items-center mt-5 ">
						<FontAwesome6 name="calendar" size={16} color="#737373" />
							<Text className="text-xl font-bold text-neutral-500">Schedule </Text>
						</View>
						<Text className="text-sm mb-2 text-neutral-400">
							Set a schedule for the bin to automatically sleep and power back on.
						</Text>

					</View>
				</View>
			</Modal>
		</>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		position: 'relative',
	},
	closeButton: {
		position: 'absolute',
		top: 13,
		right: 10,
		zIndex: 1,
	}
})

export default BinConfigModal