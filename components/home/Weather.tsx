import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Original weather data fetching logic is commented out
/*
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const API_KEY = process.env.EXPO_PUBLIC_API_KEY; // Replace with your OpenWeatherMap API key
            const lat = 14.5995;
            const lon = 121.0122;
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) {
        return (
            <View className="flex-row justify-center items-center p-5 rounded-xl bg-brand-700">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-row justify-center items-center p-5 rounded-xl bg-brand-700">
                <Text className="text-body text-white-500 font-sans">{error}</Text>
            </View>
        );
    }

    const { name, weather, main } = weatherData;

    return (
        <View className="flex-row justify-between p-5 rounded-xl bg-brand-700 items-center">
            <View className="flex-col gap-[7px]">
                <Text className="text-h5 text-white-500 font-bold font-sans">{name}</Text>
                <Text className="text-body text-white-500 font-sans">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </Text>
            </View>

            <View className="flex-row gap-[5px] items-center">
                <Text className="text-h3 font-bold text-white-500 font-sans">{Math.round(main.temp)}°</Text>
                <Feather
                    name={getWeatherIcon(weather[0].main)}
                    size={32}
                    color="white"
                />
            </View>
        </View>
    );
}

// Helper function to map weather conditions to Feather icons
const getWeatherIcon = (condition) => {
    switch (condition) {
        case 'Clear':
            return 'sun';
        case 'Clouds':
            return 'cloud';
        case 'Rain':
            return 'cloud-rain';
        case 'Snow':
            return 'cloud-snow';
        case 'Thunderstorm':
            return 'cloud-lightning';
        case 'Drizzle':
            return 'cloud-drizzle';
        default:
            return 'cloud';
    }
};
*/

interface WeatherProps {
    currentDate: string,
    degree: string
}
export default function Weather({ currentDate, degree }: WeatherProps) {
    // Hardcoded values for the design
    const location = 'Sta Mesa, Manila';
    const date = 'Saturday, November 30';
    const temperature = `${parseFloat(degree).toFixed(1)}°`;
    const condition = 'sun'; // Feather icon name

    return (
        <View className="flex-row justify-between p-5 rounded-xl bg-brand-700 items-center">
            <View className="flex-col gap-[7px]">
                <Text className="text-title text-white-500 font-bold font-sans">{location}</Text>
                <Text className="text-body text-white-500 font-sans">{currentDate}</Text>
            </View>

            <View className="flex-row gap-[5px] items-center">
                <Text className="text-h4 font-bold text-white-500 font-sans">{temperature}</Text>
                <Feather name={condition} size={32} color="white" />
            </View>
        </View>
    );
}
