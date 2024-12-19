import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Overflow from '@/components/statistics/Overflow';
import BinUsage from '@/components/statistics/BinUsage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PickupFrequency from '@/components/statistics/PickupFrequency';
import CollectionFrequency from '@/components/statistics/CollectionFrequency';
import ModalDropdown from 'react-native-modal-dropdown';
import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';
import Entypo from '@expo/vector-icons/Entypo';

const Statistics = () => {
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const generateWeekLabels = () => {
    const weeks = [];
    const currentDate = new Date();
    const startOfThisWeek = startOfWeek(currentDate, { weekStartsOn: 1 });

    for (let i = 0; i < 5; i++) {
      const startOfWeekDate = addDays(startOfThisWeek, -i * 7);
      const endOfWeekDate = endOfWeek(startOfWeekDate, { weekStartsOn: 1 });
	  const label = `${format(startOfWeekDate, 'MMM d')} - ${format(endOfWeekDate, 'MMM d')}, ${selectedYear}`;
      weeks.push(label);
    }

    return weeks;
  };

  // Handle the selection of a week
  const handleWeekSelect = (index: number, value: string) => {
    setSelectedWeek(value);
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="flex-row items-center my-2 px-2">
        <Text className="text-h5 font-sans font-bold ml-2">Reports</Text>
        <View className="pl-2">
          <MaterialIcons name="query-stats" size={28} color="black" />
        </View>
      </View>

      {/* Week Selector Dropdown */}
      <View className="my-4">
        <ModalDropdown
          options={generateWeekLabels()}
          onSelect={handleWeekSelect}
          style={{
            marginLeft: 10,
            padding: 10,
            borderColor: 'lightgray',
            borderWidth: 1,
            borderRadius: 5,
            width: 200,
            backgroundColor: '#E3E3E3',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          textStyle={{ fontSize: 14, color: 'black' }}
          dropdownStyle={{ width: 180, backgroundColor: '#E3E3E3', padding: 10 }}
        >
          <View className="flex-row items-center">
            <Text>{selectedWeek ? selectedWeek : 'Select Week'}</Text>
            <Entypo name="chevron-down" size={20} color="black" style={{ marginLeft: 20 }} /> 
          </View>
        </ModalDropdown>
      </View>

      {/* Components */}
      <ScrollView>
        <View className="flex-col justify-start items-center my-4 px-2">
          <View>
            <BinUsage />
          </View>
          <View className="mt-5">
            <Overflow />
          </View>
          <View className="mt-5">
            <PickupFrequency />
          </View>
          <View className="my-5">
            <CollectionFrequency />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Statistics;
