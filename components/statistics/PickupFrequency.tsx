import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";


const PickupFrequency = () => {
  // Define bar data
  const barData = [
    { value: 50, label: "1st Floor", labelWidth: 50, frontColor: "#C2D7FA", spacing: 2, },
    { value: 60, frontColor: "#85B0F5", spacing: 2 },
    { value: 42, frontColor: "#4888EF" },
    
    { value: 75, label: "2nd Floor", labelWidth: 50, frontColor: "#C2D7FA", spacing: 2 },
    { value: 80, frontColor: "#85B0F5", spacing: 2, },
    { value: 60, frontColor: "#4888EF" },

    { value: 90, label: "3rd Floor", labelWidth: 50, frontColor: "#C2D7FA",spacing: 2},
    { value: 70, frontColor: "#85B0F5", spacing: 2 },
    { value: 80, frontColor: "#4888EF" },
    
    { value: 30, label: "4th Floor", labelWidth: 50, frontColor: "#C2D7FA", spacing: 2},
    { value: 50, frontColor: "#85B0F5", spacing: 2, },
    { value: 70, frontColor: "#4888EF" },
  ];

  return (
    <View className="flex-row items-center justify-center">
      <View className="w-full bg-brand-700 rounded-lg p-4">
        {/* Title */}
        <Text className="text-white-500 text-title2 font-bold font-sans">
          Pickup Frequency
        </Text>
        <Text className="text-white-500 text-caption mb-4 font-sans">
          This records the frequency of trash bin pickup in CEA
        </Text>

        {/* Bar Chart */}
        <BarChart
          data={barData}
          barWidth={17}
          spacing={10}
          maxValue={100}
          noOfSections={5}
          yAxisThickness={0}
          xAxisThickness={1}
          xAxisColor={"#FFF"}
          yAxisTextStyle={{ color: "#FFF", fontSize: 12 }}
          xAxisLabelTextStyle={{color: '#FFF', textAlign: 'center', fontSize: 10}}
        
        />

        {/* Legends */}
        <View className="flex-row justify-center mt-2">
          <View className="flex-row items-center mx-2">
            <View className="w-[24px] h-[10px] bg-brand-100 mr-1" />
            <Text className="text-white-500 text-caption">Bin A</Text>
          </View>
          <View className="flex-row items-center mx-2">
            <View className="w-[24px] h-[10px] bg-brand-200 mr-1" />
            <Text className="text-white-500 text-caption">Bin B</Text>
          </View>
          <View className="flex-row items-center mx-2">
            <View className="w-[24px] h-[10px] bg-brand-300 mr-1" />
            <Text className="text-white-500 text-caption">Bin C</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PickupFrequency;
