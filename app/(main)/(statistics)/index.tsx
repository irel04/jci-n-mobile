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
import { CollectionFrequencyData, overflowEventsData} from "@/data";


const Statistics = () => {
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedBatch, setSelectedBatch] = useState<string>('Batch 1');

  const [isLoading, setIsloading] = useState(true)
  const currentDate = new Date()
  
  // Datasets
  const [trashBinUsageData, setTrashbinUsageData] = useState([])
  const [fullnessFrequencyData, setFullFrequencyData] = useState([])

  

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
        const weekly_summary = await getWeeklySummary(currentDate.toISOString().split("T")[0])
        
        // This manifest usage dataset
        const usage = weekly_summary.reduce((acc, curr, index) => {
          // Find if the bin_id already exists in the accumulator
          const existingBin = acc.find(item => item.id === curr.bin_id);


          if (existingBin) {
            // If the bin_id exists, combine the current usage into the data array
            existingBin.data.push(curr.usage);
          } else {
            // If the bin_id does not exist, create a new entry with the data array
            const color = ["rgba(133, 176, 245, 1)", "rgba(72, 136, 239, 1)", "rgba(19, 98, 255, 1)"][acc.length]
            acc.push({
              id: curr.bin_id,
              label: `Bin ${curr.bins.color}`,
              data: [curr.usage],
              color: () => color
            });
          }

          return acc;
        }, []);
        setTrashbinUsageData(usage)
        // Reduce the data needed for Fullness frequency of each bin in a week
        
        const fullnessFrequency = weekly_summary.reduce((acc, curr) => {
          const existingBin = acc.find(item => item.id === curr.bin_id);

          console.log("acc", acc)

          if (existingBin) {
            existingBin["population"] = existingBin["population"] + curr.fullness_100_count
          } else {
            const color = ["#C2D7FA", "#85B0F5", "#4888EF"][acc.length]
            acc.push({
              id: curr.bin_id,
              name: `Bin ${curr.bins.color}`,
              population: curr.fullness_100_count,
              legendFontSize: 12,
              legendFontColor: "#FFFFFF",
              color
            })
          }

          return acc
        }, [])

        setFullFrequencyData(fullnessFrequency)
       
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
              <BinUsage datasets={trashBinUsageData} />
            </View>
            <View className="mt-5">
              <Overflow datasets={fullnessFrequencyData} />
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
