import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const BinUsage = () => {
  return (
    <View className="flex-row items-center justify-center">
      <View className="w-full bg-brand-700 rounded-lg p-4">
        <Text className="text-white-500 text-title2 font-bold font-sans">Trash Bin Usage</Text>
        <Text className="text-white-500 text-caption mb-4 font-sans">
          This is the usage of trash bin over the week
        </Text>

        <LineChart
          data={{
            labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
            datasets: [
              {
                data: [500, 450, 300, 500, 150, 350, 400], // Bin A data
                color: () => `rgba(133, 176, 245, 1)`, 
                strokeWidth: 3,
              },
              {
                data: [100, 250, 150, 200, 300, 450, 200], // Bin B data
                color: () => `rgba(72, 136, 239, 1)`, 
                strokeWidth: 3,
              },
              {
                data: [50, 150, 300, 250, 350, 100, 450], // Bin C data
                color: () => `rgba(19, 98, 255, 1)`, 
                strokeWidth: 3,
              },
            ],
          }}
          width={screenWidth - 60} 
          height={220}  
          withDots={false}
          withShadow={false}
          chartConfig={{
            backgroundGradientFrom: "#082B63",
            backgroundGradientTo: "#082B63",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
          }}
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

export default BinUsage;
