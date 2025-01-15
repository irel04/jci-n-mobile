import { DailySummarySchema } from "@/utils/schemas";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface OverflowProps {
    weekly_summary: any[],

}

const Overflow = ({ weekly_summary }: OverflowProps) => {
    // const data = [
    //     {
    //         name: "Bin A",
    //         population: 65,
    //         color: "#C2D7FA",
    //         legendFontColor: "#FFFFFF",
    //         legendFontSize: 12,
    //     },
    //     {
    //         name: "Bin B",
    //         population: 25,
    //         color: "#85B0F5",
    //         legendFontColor: "#FFFFFF",
    //         legendFontSize: 12,
    //     },
    //     {
    //         name: "Bin C",
    //         population: 10,
    //         color: "#4888EF",
    //         legendFontColor: "#FFFFFF",
    //         legendFontSize: 12,
    //     },
    // ];
    // const totalBinFullNess = weekly_summary.reduce((total, bin) => {
    //     return total + bin.fullness_100_count
    // }, 0)

    // const data = weekly_summary.map((bin, index) => {
    //     return {
    //         name: `${bin.bins.color}`,
    //         color: ["#C2D7FA","#85B0F5","#4888EF"][index],
    //         population: totalBinFullNess > 0 ? Math.round((bin.fullness_100_count / totalBinFullNess) * 100) : 0,
    //         legendFontColor: "#FFFFFF",
    //         legendFontSize: 12
    //     }
    // })

    const data = weekly_summary.reduce((acc, curr, index) => {
        const existingBin = acc.find(bin => bin.id === curr.bin_id)

        if(existingBin){
            existingBin.population = existingBin.population + curr.fullness_100_count
        } else {
            const color = ["#C2D7FA","#85B0F5","#4888EF"][acc.length]
            console.log(curr)
            acc.push({
                id: curr.bin_id,
                name: curr.bins.color,
                color: color,
                population: curr.fullness_100_count,
                legendFontColor: "#FFFFFF",
                legendFontSize: 12

            })
        }
        return acc
    }, [])

    console.log(data)

    return (
        <View className="flex-1 bg-brand-700 rounded-xl relative p-3">
            <Text className="flex-none text-white-500 text-title font-bold font-sans">Fullness Frequency</Text>

            <View className="flex-1">
                <PieChart
                    data={data}
                    width={screenWidth * 0.45} // Full width with padding
                    height={screenWidth * 0.33}
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
                <View className="absolute right-0 bottom-0 mr-2 mb-2">
                    {data.map((item, index) => (
                        <View key={index} className="flex-row items-center mb-2 py-1/2">
                            {/* Rectangle Indicator */}
                            <View
                                style={{
                                    width: 15, // Rectangle width
                                    height: 5, // Rectangle height
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