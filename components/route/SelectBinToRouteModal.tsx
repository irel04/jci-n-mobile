import { View, Text } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'
import style from "@/components/route/Style"

interface BinProps {
	title: string, 
	bin_color: string,
	id: string
}
interface SelectBinToRouteProps {
	bins: BinProps[],
	handleSelectValue: (binId: string) => void
}

const SelectBinToRouteModal = React.forwardRef<Picker<string>, SelectBinToRouteProps>(({ bins, handleSelectValue }, ref) => {
	return (
		<View className="flex flex-col gap-5">
			<Text className="text-title text-brand-700 font-bold">Select Bin Destination</Text>
			<Picker ref={ref} style={style.picker} onValueChange={handleSelectValue}>
				{bins.map((bin: BinProps, index) => {
					return <Picker.Item label={`${bin.title} ${bin.bin_color}`} value={bin.id} key={index}/>
				})}
			</Picker>
		</View>
	)
})

export default SelectBinToRouteModal