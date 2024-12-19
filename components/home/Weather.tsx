import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

export default function Weather() {
    return (
        <View className='flex-row justify-between p-5 rounded-xl bg-brand-700 items-center'>
            <View className='flex-col gap-[7px]'>
                <Text className='text-h5 text-white-500 font-sans'>Sta Mesa Manila</Text>
                <Text className='text-body text-white-500 font-sans'>Saturday, November 30</Text>
            </View>

            <View className='flex-row gap-[5px] items-center'>
                <Text className='text-h3 font-bold text-white-500 font-sans'>30°</Text>
                <Feather name="sun" size={32} color="white"  />
            </View>
            
        </View>
    )
}
