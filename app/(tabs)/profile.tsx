import { View, Text, Image } from 'react-native';
import React from 'react';

export default function profile() {
  return (
    <View className="flex-1 ">
      <View className="flex-row items-center">
        <Image
          source={require('../../assets/images/react-logo.png')}
          className="w-64 h-32 bg-gray-600 rounded-full mr-3"
        />
        <Text className="text-2xl font-bold">jabez</Text>
      </View>
    </View>
  );
}
