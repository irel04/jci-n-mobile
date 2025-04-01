import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import OnScreenModal from "@/components/ui/OnScreenModal";
import CustomButton, { StyleType } from "@/components/ui/CustomButton";
import RNPickerSelect from 'react-native-picker-select';
import { TSetTable } from "@/components/types";
import { supabase } from "@/utils/supabase";


export default function SolarPower() {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [sets, setSets] = useState<TSetTable[]>(null)
    const [selectedSet, setSelectedSet] = useState<string>(null)

    const [isSetLocked, setIsSetLocked] = useState<boolean>(false)

    // Call sets for picker
    useEffect(() => {
        const fetchSets = async () => {
            const { data, error } = await supabase.from("sets").select("*")

            if (error) return
            setSets(data)

            setSelectedSet(data[0].id)

        }

        fetchSets()
    }, [])

    // check if unlocked or locked
    useEffect(() => {
        const fetchBinIsLockedStatus = async () => {
            try {
                const { data, error } = await supabase.from("bins").select("is_locked").eq("set", selectedSet)

                if(error) throw error


                setIsSetLocked(data[0].is_locked)
            
            } catch (error) {
                console.error(error)
            }
        }

        if(selectedSet) {
            
            const channels = supabase.channel('custom-all-channel')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'bins' },
                    (payload) => {
                        fetchBinIsLockedStatus()
                    }
                )
                .subscribe()
        }

        fetchBinIsLockedStatus()
    }, [selectedSet])

    const handleBinLocked = async (isLocked: boolean
    ) => {
        try {
            const { error } = await supabase.from("bins").update({ is_locked: isLocked }).eq("set", selectedSet)

            if(error) throw error

            console.log("Success")
            setModalVisible(false)
        } catch (error) {
            console.error(error)
        }
    }
 


    return (
        <View className='flex-col justify-between mt-5 rounded-xl items-center'>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={require('@/assets/images/trashbin.png')} className='w-[67.93px] h-[100px] items-center mb-5' />
            </TouchableOpacity>

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
            <OnScreenModal isVisible={modalVisible}>
                <View className="relative bg-white-500 p-5 max-w-72 rounded-lg flex flex-col">
                    <Pressable className="absolute right-5 top-5 z-50" onPress={() => setModalVisible(false)}>
                        <Text>X</Text>
                    </Pressable>
                    <Text className="mt-5 text-lg font-bold">Unlock Bins</Text>
                    <Text className="text-sm">Select which trash bin set you want to unlock</Text>
                    {sets && sets.length > 0 && <View className="my-5">
                        <RNPickerSelect items={sets.map((item) => {
                            return {
                                label: item.name,
                                value: item.id
                            }
                        })} onValueChange={(value) => setSelectedSet(value)}  value={sets[0].id} style={{
                            inputIOS: {
                              borderWidth: 1,
                              borderColor: 'lightgray',
                              color: 'black',
                              backgroundColor: '#E3E3E3',
                            },
                            inputAndroid: {
                              borderWidth: 1,
                              borderColor: 'lightgray',
                              color: 'black',
                              backgroundColor: '#E3E3E3',
                            },
                            placeholder: {
                              color: 'gray',
                              fontSize: 8,
                            },
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
            </OnScreenModal>
        </View>
    )
}


