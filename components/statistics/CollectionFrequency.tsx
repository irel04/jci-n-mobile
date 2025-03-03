import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const CollectionFrequency = ({ datasets }) => {
  return (
    <View className="flex-row items-center justify-center">
      <View className="w-full bg-brand-700 rounded-lg p-4">
        <Text className="text-white-500 text-title2 font-bold font-sans">Collection Frequency</Text>
        <Text className="text-white-500 text-caption mb-4 font-sans">
        This tracks the efficient collection over the week
        </Text>

        <LineChart
          data={{
            labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
            datasets,
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
          {datasets.map((bin, index) => (
            <View key={index} className="flex-row items-center mx-2">
              <View
                className="w-[24px] h-[10px] mr-1"
                style={{ backgroundColor: bin.color() }}
              />
              <Text className="text-white-500 text-caption">{bin.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CollectionFrequency;

