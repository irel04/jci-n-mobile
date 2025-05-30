import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { DailySummarySchema } from "@/utils/schemas";

// const bins = [
//     { id: 'A', level: '50%' },
//     { id: 'B', level: '90%' },
//     { id: 'C', level: '30%' },
// ];

interface TrashBinLevelProps {
    daily_summary: DailySummarySchema[]
}

export default function TrashBinLevel({ daily_summary }: TrashBinLevelProps) {

    const bins = daily_summary.map((bin, index) => {
        return {
            id: bin.bins.id,
            color: bin.bins.color,
            level: bin.current_fill_level
        }
    })

    const averageLevel = Math.round(
        bins.reduce((total, bin) => total + bin.level, 0) / bins.length
    );


    return (
        <View className='flex-col justify-between mt-5 p-5 rounded-xl bg-brand-700'>
            <View className='flex-row justify-start gap-3 items-center'>
                <Text className='text-title font-bold text-white-500'>Trash Bins Level</Text>
                <MaterialIcons name="document-scanner" size={24} color="white" />
            </View>
            <View className='flex-row gap-4 justify-between items-center pl-6 pr-6'>
                <View>
                    {bins.map((bin) => (
                        <View key={bin.id} className="flex-row justify-start gap-6 items-center">
                            <View className="flex-row gap-2 items-center">
                                <Feather name="trash" size={15} color="white" />
                                <Text className="text-body font-semibold text-white-500">{`Bin ${bin.color}`}</Text>
                            </View>
                            <Text className="text-base text-white-500">{bin.level} %</Text>
                        </View>
                    ))}
                </View>
                {/* Circular Progress Bar */}
                <View className='flex-row justify-between items-center'>
                    <AnimatedCircularProgress
                        size={100} // Size of the progress bar
                        width={15} // Thickness of the bar
                        fill={averageLevel} // Percentage to fill
                        tintColor={averageLevel < 80 ? "#1362E1" : averageLevel >= 80 && averageLevel < 100 ? "#FF6D1C" : "#CF1919" } // Progress color
                        backgroundColor="#C2D7FA" // Background color
                        lineCap='round' // Rounded edges
                    >
                        {(fill) => (
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ffffff' }}>
                                {`${averageLevel}%`}
                            </Text>
                        )}
                    </AnimatedCircularProgress>
                </View>
            </View>
        </View>
    )
}