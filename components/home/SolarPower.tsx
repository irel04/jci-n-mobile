import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function SolarPower() {
    return (
        <View className='flex-col justify-between mt-5 rounded-xl items-center'>
            <Image source={require('@/assets/images/trashbin.png')} className='w-[67.93px] h-[100px] items-center mb-5' />

            <View className='flex-col justify-between p-3 rounded-xl bg-brand-700 items-left gap-2 w-full'>
                <Text className='text-title2 text-white-500 font-sans font-bold'>Solar Power</Text>

                <View className='flex-row gap-[5px] items-center'>
                    <Text className='text-body text-white-500 font-sans'>220 Watts </Text>
                    <View style={{ position: 'relative' }}>
                        {/* White outline icon */}
                        <FontAwesome6
                            name="bolt-lightning"
                            size={18}
                            color="white"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1, // Ensures it's behind the filled icon
                                transform: [{ translateX: 0 }, { translateY: -1 }], // Slight offset to create the outline effect
                            }}
                        />
                        {/* Orange filled icon */}
                        <FontAwesome6
                            name="bolt-lightning"
                            size={16}
                            color="orange"
                            style={{
                                zIndex: 2, // Ensures it's on top of the white outline icon
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}
