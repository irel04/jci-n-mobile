import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import RNPickerSelect, { Item } from 'react-native-picker-select'
import { TSetTable } from "@/components/types"

type TBinToRoutes = {
	sets: TSetTable[],
	handleSelectValue: (value: string) => void
}

const SelectBinToRouteModal = (({ sets, handleSelectValue }: TBinToRoutes) => {

	const options = useMemo((): Item[] => {
		return sets.map((item, index) => {
			return {
				label: item.name,
				value: item.id,
				key: `set-${index}`
			}
		})
	}, [sets])
	

	return (
		<View className="flex flex-col gap-5">
			<Text className="text-title text-brand-700 font-bold">Select Bin Destination</Text>
			<RNPickerSelect onValueChange={handleSelectValue}  items={options}/>
		</View>
	)
})

export default SelectBinToRouteModal