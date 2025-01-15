import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Overflow from '@/components/statistics/Overflow';
import BinUsage from '@/components/statistics/BinUsage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PickupFrequency from '@/components/statistics/PickupFrequency';
import CollectionFrequency from '@/components/statistics/CollectionFrequency';
import RNPickerSelect from 'react-native-picker-select';
import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { DailySummarySchema } from "@/utils/schemas";
import { getDailySummary, getWeeklySummary } from "@/app/(main)";
import LoaderKit from "react-native-loader-kit"


const Statistics = () => {
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedBatch, setSelectedBatch] = useState<string>('Batch 1');

  const [isLoading, setIsloading] = useState(true)
  const currentDate = new Date()
  const [dailySummary, setDailySummary] = useState<DailySummarySchema[]>([])

  // Data for bin usage 
  const trashBinUsageData = {
    'Batch 1': [
      { label: 'Bin A', data: [500, 450, 300, 500, 150, 350, 400], color: () => `rgba(133, 176, 245, 1)` },
      { label: 'Bin B', data: [100, 250, 150, 200, 300, 450, 200], color: () => `rgba(72, 136, 239, 1)` },
      { label: 'Bin C', data: [50, 150, 300, 250, 350, 100, 450], color: () => `rgba(19, 98, 255, 1)` },
    ],
    'Batch 2': [
      { label: 'Bin D', data: [300, 200, 400, 300, 500, 200, 100], color: () => `rgba(133, 176, 245, 1)` },
      { label: 'Bin E', data: [200, 100, 150, 300, 250, 400, 350], color: () => `rgba(72, 136, 239, 1)` },
      { label: 'Bin F', data: [400, 300, 200, 100, 450, 350, 300], color: () => `rgba(19, 98, 255, 1)` },
    ],
  };

  // Data for collection frequency
  const CollectionFrequencyData = {
    'Batch 1': [
      { label: 'Bin A', data: [500, 450, 300, 500, 150, 350, 400], color: () => `rgba(133, 176, 245, 1)` },
      { label: 'Bin B', data: [100, 250, 150, 200, 300, 450, 200], color: () => `rgba(72, 136, 239, 1)` },
      { label: 'Bin C', data: [50, 150, 300, 250, 350, 100, 450], color: () => `rgba(19, 98, 255, 1)` },
    ],
    'Batch 2': [
      { label: 'Bin D', data: [300, 200, 400, 300, 500, 200, 100], color: () => `rgba(133, 176, 245, 1)` },
      { label: 'Bin E', data: [700, 100, 150, 300, 250, 400, 350], color: () => `rgba(72, 136, 239, 1)` },
      { label: 'Bin F', data: [400, 300, 200, 100, 450, 350, 300], color: () => `rgba(19, 98, 255, 1)` },
    ],
  };

  // data for overflow events
  const overflowEventsData = {
    "Batch 1": [
      { name: "Bin A", population: 65, color: "#C2D7FA", legendFontColor: "#FFFFFF", legendFontSize: 12 },
      { name: "Bin B", population: 25, color: "#85B0F5", legendFontColor: "#FFFFFF", legendFontSize: 12 },
      { name: "Bin C", population: 10, color: "#4888EF", legendFontColor: "#FFFFFF", legendFontSize: 12 },
    ],
    "Batch 2": [
      { name: "Bin D", population: 55, color: "#C2D7FA", legendFontColor: "#FFFFFF", legendFontSize: 12 },
      { name: "Bin E", population: 30, color: "#85B0F5", legendFontColor: "#FFFFFF", legendFontSize: 12 },
      { name: "Bin F", population: 15, color: "#4888EF", legendFontColor: "#FFFFFF", legendFontSize: 12 },
    ],
  };

  // Generate week labels
  const generateWeekLabels = () => {
    const weeks = [];
    const currentDate = new Date();
    const startOfThisWeek = startOfWeek(currentDate, { weekStartsOn: 1 });

    for (let i = 0; i < 5; i++) {
      const startOfWeekDate = addDays(startOfThisWeek, -i * 7);
      const endOfWeekDate = endOfWeek(startOfWeekDate, { weekStartsOn: 1 });
      const label = `${format(startOfWeekDate, 'MMM d')} - ${format(endOfWeekDate, 'MMM d')}, ${selectedYear}`;
      weeks.push({ label, value: label });
    }

    return weeks;
  };

  // Load daily summary using the function component in main dashboard
  useEffect(() => {
    const fetchData = async () => {
      try {
        const daily_summary = await getWeeklySummary(currentDate.toISOString().split("T")[0])
        console.log(daily_summary) 

      } catch (error) {
        console.error(error)
      } finally {
        setIsloading(false)
      }
    }

    fetchData()

  }, [])

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {isLoading ? <View className="h-screen flex items-center justify-center">
        <LoaderKit style={{ width: 50, height: 50 }}
          name={'BallPulse'} // Optional: see list of animations below
          color={'#0E46A3'} />
      </View> : <>
        {/* Header */}
        <View className="flex-row items-center my-2 px-2">
          <Text className="text-h5 font-sans font-bold ml-2">Reports</Text>
          <View className="pl-2">
            <MaterialIcons name="query-stats" size={28} color="black" />
          </View>
        </View>

        <View className="flex-row my-4">
          {/* Week Selector Dropdown */}
          <View className="flex-initial w-64 mx-2">
            <RNPickerSelect
              onValueChange={(value) => setSelectedWeek(value)}
              items={generateWeekLabels()}
              style={{
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
              }}
              placeholder={{
                label: 'Select Week',
                value: null,
                color: 'gray',
              }}
            />
          </View>

          {/* Batch Selector Dropdown */}
          <View className="flex-initial w-32 mx-2">
            <RNPickerSelect
              onValueChange={(value) => setSelectedBatch(value)}
              items={[
                { label: 'Batch 1', value: 'Batch 1' },
                { label: 'Batch 2', value: 'Batch 2' },
              ]}
              style={{
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
              }}
              placeholder={{
                label: 'Select Batch',
                value: 'Batch 1',
                color: 'gray',
              }}
            />
          </View>
        </View>


        {/* Components */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-col justify-start items-center my-4 px-2">
            <View>
              <BinUsage datasets={trashBinUsageData[selectedBatch]} />
            </View>
            <View className="mt-5">
              <Overflow datasets={overflowEventsData[selectedBatch]} />
            </View>
            <View className="mt-5">
              <PickupFrequency />
            </View>
            <View className="my-5">
              <CollectionFrequency datasets={CollectionFrequencyData[selectedBatch]} />
            </View>
          </View>
        </ScrollView>

      </>}
    </View>
  );
};

export default Statistics;
