import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Overflow = ({ datasets }) => {
  return (
    <View className="flex-row items-center justify-center">
      <View className="w-full bg-brand-700 rounded-lg p-4">
        <Text className="text-white-500 text-title2 font-bold font-sans">Fullness Frequency</Text>
        <Text className="text-white-500 text-caption mb-4 font-sans">
          This records the bins fullness freqency every week
        </Text>

        <PieChart
          data={datasets}
          width={screenWidth - 40} // Full width with padding
          height={180}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"10"}
          absolute={false}
          hasLegend={false}
        />

        {/* Custom Legend with Rectangles Vertically on the right */}
        <View className="absolute right-0 bottom-0 mb-2 mr-2">
          {datasets.map((item, index) => (
            <View key={index} className="flex-row items-center mb-2 py-1/2">
              {/* Rectangle Indicator */}
              <View
                style={{
                  width: 24, // Rectangle width
                  height: 9, // Rectangle height
                  backgroundColor: item.color,
                  marginRight: 8, // Spacing between rectangle and text
                }}
              />
              {/* Legend Text */}
              <Text className="text-white-500 text-caption font-sans">
                {item.name} - {item.population}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Overflow;
