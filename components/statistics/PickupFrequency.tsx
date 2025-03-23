import { TPickUpTable, TUserSession } from "@/components/types";
import { useSession } from "@/contexts/auth";
import { startEndOfWeek } from "@/utils/helper";
import { supabase } from "@/utils/supabase";
import { endOfWeek, format, getDay, startOfWeek } from "date-fns";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";




const PickupFrequency = () => {
  // Define bar data
  const [barData, setBarData] = useState([
    { value: 0, label: "Sun", frontColor: "#4888EF" },
    { value: 0, label: "Mon", frontColor: "#4888EF" },
    { value: 0, label: "Tues", frontColor: "#4888EF" },
    { value: 0, label: "Wed", frontColor: "#4888EF" },
    { value: 0, label: "Thurs", frontColor: "#4888EF" },
    { value: 0, label: "Fri", frontColor: "#4888EF" },
    { value: 0, label: "Sat", frontColor: "#4888EF" }

  ]);

  

  const { session } = useSession()
  const user  = JSON.parse(session) as TUserSession
  

  useEffect(() => {

    const fetchUserPickupFrequency = async (userId: string) => {

      // Get start (Sunday) and end (Saturday) of the current week
      const now = new Date();
     const {formattedStartOfWeek, formattedEndOfWeek} = startEndOfWeek(now)
    
      const { data, error } = await supabase
        .from("pickups")
        .select("*") // Adjust columns as needed
        .eq("collected_by", userId)
        .gte("pickup_at", formattedStartOfWeek) // >= Sunday
        .lte("pickup_at", formattedEndOfWeek); // <= Saturday
    
      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
          // Initialize an object to count pickups for each day (0: Sun, 1: Mon, ..., 6: Sat)
        const weekData = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

        data.forEach((record: TPickUpTable) => {
          const dayIndex = getDay(new Date(record.pickup_at))
          
          weekData[dayIndex]++
          
        })

        setBarData(barData.map((item, index) => ({...item, value: weekData[index]})))
        
      }
    };

    fetchUserPickupFrequency(user.user_id)
  }, [])
  
  


  return (
    <View className="flex-row items-center justify-center">
      <View className="w-full bg-brand-700 rounded-lg p-4">
        {/* Title */}
        <Text className="text-white-500 text-title2 font-bold font-sans">
          Pickup Frequency
        </Text>
        <Text className="text-white-500 text-caption mb-4 font-sans">
          Shows staff how many times he/she collects the garbage
        </Text>

        {/* Bar Chart */}
        <BarChart
          data={barData}
          barWidth={23}
          spacing={10}
          maxValue={5}
          noOfSections={4}
          yAxisThickness={0}
          xAxisThickness={1}
          xAxisColor={"#FFF"}
          yAxisTextStyle={{ color: "#FFF", fontSize: 12 }}
          xAxisLabelTextStyle={{color: '#FFF', textAlign: 'center', fontSize: 10}}
        
        />

        {/* Legends */}
        <View className="flex-row justify-center mt-2">
          {/* <View className="flex-row items-center mx-2">
            <View className="w-[24px] h-[10px] bg-brand-100 mr-1" />
            <Text className="text-white-500 text-caption">Bin A</Text>
          </View>
          <View className="flex-row items-center mx-2">
            <View className="w-[24px] h-[10px] bg-brand-200 mr-1" />
            <Text className="text-white-500 text-caption">Bin B</Text>
          </View> */}
          <View className="flex-row items-center mx-2">
            <View className="w-[24px] h-[10px] bg-brand-300 mr-1" />
            <Text className="text-white-500 text-caption">Number of collection per day</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PickupFrequency;
