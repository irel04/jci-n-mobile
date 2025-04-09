import CustomButton, { StyleType } from "@/components/ui/CustomButton"
import React, { useEffect, useMemo, useState } from "react"
import { Alert, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import RNPickerSelect from 'react-native-picker-select';
import { TSetTable } from "@/components/types";
import { supabase } from "@/utils/supabase";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "@/components/ui/Button";
import * as yup from "yup"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, parse } from "date-fns";


const validationSchema = yup.object({
	set: yup.string().required().min(1),
	time_on: yup.string().required("Time on is required"),
	time_off: yup
	  .string()
	  .required("Time off is required")
  });


type TSchedule = {
	set: string, 
	time_on: string,
	time_off: string,
} 

const BinConfigModal = () => {

	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const { control, handleSubmit, formState: { isValid }, reset, setValue, watch } = useForm({
		resolver: yupResolver(validationSchema),
		mode: "onChange",
		defaultValues: {
			time_on: "00:00",
			time_off: "00:00",
			set: ""
		}
	})

	const [sets, setSets] = useState<TSetTable[]>(null)
	const [selectedSet, setSelectedSet] = useState<string>(null)

	const [showTimeOnPicker, setShowTimeOnPicker] = useState<boolean>(false)
	const [showTimeOffPicker, setShowTimeOffPicker] = useState<boolean>(false)

	const [isSetLocked, setIsSetLocked] = useState<boolean>(false)


	const handleBinLocked = async (isLocked: boolean
	) => {
		try {
			const { error } = await supabase.from("bins").update({ is_locked: isLocked }).eq("set", selectedSet)

			if (error) throw error

			console.log("Success")
			// setModalVisible(false)
			Alert.alert("Bin Status Updated", `The bin has been ${isLocked ? "locked" : "unlocked"} successfully. You can now proceed.`)

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

	const selectedSetForSchedule = watch("set")

	// Fetch bin time on/off
	useEffect(() => {
		const fetchBinSchedule = async () => {
			try {
				const { data, error } = await supabase.from("bins").select("time_on, time_off").eq("set", selectedSetForSchedule)

				if(error) throw error

				if(data[0].time_on && data[0].time_off){
					setValue("time_on", data[0].time_on.slice(0, 5))
					setValue("time_off", data[0].time_off.slice(0, 5))
				}
				
			} catch (error) {
				console.error(error);
			}
		}

		if(selectedSetForSchedule !== "" && selectedSetForSchedule !== undefined &&selectedSetForSchedule !== null){
			fetchBinSchedule()
		}
	}, [selectedSetForSchedule])

	const handleSave = async  (value: TSchedule) => {

		const { set, ...payload } = value
		try {
			const { error } = await supabase.from("bins").update(payload).eq("set", set)

			if(error) throw error

			Alert.alert("Schedule Updated", "You successfully updated bin on/off schedule")

			reset()
		} catch (error) {
			console.error(error);
		}

	}


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
						<FontAwesome6 name="calendar" size={16} color="#737373" />
							<Text className="text-xl font-bold text-neutral-500">Schedule </Text>
						</View>
						<Text className="text-sm mb-2 text-neutral-400">
							Set a schedule for the bin to automatically sleep and power back on.
						</Text>
						{sets && sets.length > 0 && <View className="my-5">
							<Controller control={control} name="set" render={({field: {onChange, value}}) => (
								<RNPickerSelect items={sets.map((item) => {
									return {
										label: item.name,
										value: item.id
									}
								})} onValueChange={onChange} style={{
									inputAndroid: {
										borderWidth: 1,
										borderColor: 'lightgray',
										color: '#737373',
										backgroundColor: '#E3E3E3',
									}
								}} value={value} />
							)}/>
						</View>}
						{/* Time picker */}
						<View className="flex flex-row gap-4">
							<Controller control={control} name="time_on" render={({field: {onChange, value}}) => (
								<View className="flex gap-2">
								<Text className="text-sm text-neutral-500 font-bold">Turn On</Text>
								<Button label={value} icon="clock-check-outline"
								variant="neutral"
								iconFamily="MaterialCommunityIcons" onPress={() => setShowTimeOnPicker(true)}/>
								<DateTimePickerModal 
								mode="time"
								isVisible={showTimeOnPicker}
								onCancel={() => setShowTimeOnPicker(false)} onConfirm={(date: Date) => {
									const formatDate = format(date, "HH:mm")
									onChange(formatDate)
									setShowTimeOnPicker(false)
								}}
								/>
							</View>
							)}/>

							<Controller control={control} name="time_off" render={({field: {value, onChange}}) => (
								<View className=" flex gap-2">
								<Text className="text-sm text-neutral-500 font-bold">Turn Off</Text>
								<Button label={value} icon="clock-check-outline"variant="neutral" iconFamily="MaterialCommunityIcons" onPress={() => setShowTimeOffPicker(true)} />
								<DateTimePickerModal
								mode="time"
								isVisible={showTimeOffPicker}
								 onCancel={() => setShowTimeOffPicker(false)} onConfirm={(date: Date) => {
									const formatDate = format(date, "HH:mm")
									onChange(formatDate)
									setShowTimeOffPicker(false)
								}}/>
							</View>
							)}/>

						</View>

						<View className="flex justify-end flex-row mt-4">
							<Button label="Save"
								icon="save" variant={isValid ? "default" : "ghost"} iconFamily="Entypo"
								onPress={handleSubmit(handleSave)}/>
						</View>

						

					</View>

					<View className="relative mt-5">
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
									color: '#737373',
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