import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import Overflow from '@/components/statistics/Overflow';
import BinUsage from '@/components/statistics/BinUsage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PickupFrequency from '@/components/statistics/PickupFrequency';
import CollectionFrequency from '@/components/statistics/CollectionFrequency';
import { subWeeks, addWeeks, startOfDay, isEqual } from 'date-fns';
import { getWeeklySummary } from "@/app/(main)";
import { supabase } from "@/utils/supabase";
import { startEndOfWeek } from "@/utils/helper";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import Button from "@/components/ui/Button";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Papa from 'papaparse';

const getPickup = async (date: Date) => {

  const { formattedEndOfWeekISO, formattedStartOfWeekISO } = startEndOfWeek(date)

  const { data, error } = await supabase.from("pickups").select("*").gte("pickup_at", formattedStartOfWeekISO).lte("pickup_at", formattedEndOfWeekISO)

  if(error) throw error

  return data


}

const Statistics = () => {

  const [isLoading, setIsloading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())

  // Datasets
  const [trashBinUsageData, setTrashbinUsageData] = useState([])
  const [fullnessFrequencyData, setFullFrequencyData] = useState([])
  const [collectionFrequencyData, setCollectionFrequencyData] = useState([])

  // Color label
  const color = ["rgba(133, 176, 245, 1)", "rgba(72, 136, 239, 1)", "rgba(19, 98, 255, 1)"]


  const fetchData = async () => {
    try {
      const weekly_summary = await getWeeklySummary(currentDate)
      
      // This manifest usage dataset
      const usage = weekly_summary.reduce((acc, curr, index) => {
        // Find if the bin_id already exists in the accumulator
        const existingBin = acc.find(item => item.id === curr.bin_id);


        if (existingBin) {
          // If the bin_id exists, combine the current usage into the data array
          existingBin.data.push(curr.usage);
        } else {
          // If the bin_id does not exist, create a new entry with the data array
          const labelColor = color[acc.length]
          // console.log(labelColor)
          acc.push({
            id: curr.bin_id,
            label: `Bin ${curr.bins.color}`,
            data: [curr.usage],
            color: () => labelColor
          });
        }

        return acc;
      }, []);
      setTrashbinUsageData(usage)

      // Reduce the data needed for Fullness frequency of each bin in a week
      const fullnessFrequency = weekly_summary.reduce((acc, curr) => {
        const existingBin = acc.find(item => item.id === curr.bin_id);


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

      const collectionFrequency = weekly_summary.reduce((acc, curr, index) => {
        const existingBin = acc.find(bin => bin.id === curr.bin_id)

        if(existingBin){
          existingBin.data.push(curr.total_pickups)
        } else {
          const labelColor = color[acc.length]
          // console.log(labelColor)
          acc.push({
            id: curr.bin_id,
            label: `Bin ${curr.bins.color}`,
            data: [curr.total_pickups],
            color: () => labelColor
          })
        }

        return acc
      }, [])

      setCollectionFrequencyData(collectionFrequency)

      const weekly_pickup = await getPickup(currentDate)

      // console.log(weekly_pickup)
      
    } catch (error) {
      console.error(error)
    } finally {
      setIsloading(false)
    }
  }


  // Load daily summary using the function component in main dashboard
  useEffect(() => {
    
    fetchData()

  }, [currentDate])

  useEffect(() => {

    const channels = supabase.channel('stats_watch')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'daily_summary' },
        (payload) => {
          console.log("Changes received on statistics")
          setCurrentDate(new Date())
          fetchData()
        }
      )
      .subscribe()
  }, [])


  const { formattedStartOfWeekHeader, formattedEndOfWeekHeader, formattedStartOfWeek, formattedEndOfWeek } = useMemo(() => startEndOfWeek(currentDate), [currentDate])

  const isDayEqualorToday = useMemo(() => isEqual(startOfDay(currentDate), startOfDay(new Date())), [currentDate])

  const handleGoPreviousWeek = () => {
    setCurrentDate(prev => subWeeks(prev, 1))
  }

  const handleGoNextWeek = () => {
    setCurrentDate(prev => addWeeks(prev, 1))
  }

  const handleDownloadCsv = async () => {
    setIsloading(true)
    try {
      const { data, error } = await supabase.from("daily_summary").select("total_pickups, usage, fullness_100_count, date").gte("date", formattedStartOfWeek).lte("date", formattedEndOfWeek).order("date", { ascending: false });

      if(error) throw error
      
      const csv = Papa.unparse(data);
      const fileUri = FileSystem.documentDirectory + "weekly_summary.csv";

      await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });

      if(!(await Sharing.isAvailableAsync())) {
        Alert.alert("Error", "Sharing is not available on this device");
        return;
      }

      await Sharing.shareAsync(fileUri, {
        dialogTitle: "Download weekly summary",
        mimeType: "text/csv",
        UTI: "public.plain-text"
      });

      Alert.alert("Success", "CSV file imported successfully");

    } catch (error) {
      console.error("Error downloading csv");
      Alert.alert("Error", "Failed to download csv file");
    } finally{
      setIsloading(false)
    }
  }


  return (
    <View className="flex-1 bg-gray-100 p-4">
      {isLoading ? <LoadingAnimation/> : <>
        {/* Header */}
        <View className="my-2 flex-row flex items-center justify-between">
          <View className="flex-row items-center px-2">
            <Text className="text-h5 font-sans font-bold ml-2">Reports</Text>
            <View className="pl-2">
              <MaterialIcons name="query-stats" size={28} color="black" />
            </View>
          </View>

          <Button label="Import csv" variant="neutral" iconFamily="Fontisto" icon="import" iconSize={16} onPress={handleDownloadCsv}/>
        </View>


        {/* Components */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-col justify-start items-center my-4 px-2">
            <View className="w-full border-brand-700 border-[1px] rounded-lg p-4 justify-between flex-row items-center">
              <Button variant="neutral" iconFamily="AntDesign" icon="arrowleft" iconSize={14} onPress={handleGoPreviousWeek}/>
              <Text className="text-lg text-neutral-500">{formattedStartOfWeekHeader} - {formattedEndOfWeekHeader}</Text>
              <Button variant={isDayEqualorToday ? "ghost" : "neutral"} iconFamily="AntDesign" icon="arrowright" iconSize={14} onPress={handleGoNextWeek} />
            </View>
            <View className="mt-5">
              <BinUsage datasets={trashBinUsageData} />
            </View>
            <View className="mt-5">
              <Overflow datasets={fullnessFrequencyData} />
            </View>
            <View className="mt-5">
              <PickupFrequency date={currentDate}/>
            </View>
            <View className="my-5">
              <CollectionFrequency datasets={collectionFrequencyData} />
            </View>
          </View>
        </ScrollView>

      </>}
    </View>
  );
};

export default Statistics;
