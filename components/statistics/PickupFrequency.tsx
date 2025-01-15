import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";


const PickupFrequency = () => {
  // Define bar data
  const barData = [
    { value: 20, label: "Sun", frontColor: "#4888EF" },
    { value: 45, label: "Mon", frontColor: "#4888EF"},
    { value: 28, label: "Tues", frontColor: "#4888EF"},
    { value: 80, label: "Wed", frontColor: "#4888EF"},
    { value: 99, label: "Thurs", frontColor: "#4888EF"},
    { value: 43, label: "Fri", frontColor: "#4888EF"},
    { value: 43, label: "Sat", frontColor: "#4888EF"}

  ];

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
            <Text className="text-white-500 text-caption">Number of collection perday</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PickupFrequency;
