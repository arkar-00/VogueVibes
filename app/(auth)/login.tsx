import { View, Text, Image, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import FloatingLabelInput from '@/components/FloatingLabelInput';
import { useColorScheme } from 'nativewind';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <View className="justify-center items-center">
        <Image
          source={require('../../assets/images/auth/logo.png')}
          className="w-[100%] h-[150] mt-20"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 p-5">
        <Text className="font-poppins-bold text-3xl">Welcome!</Text>
        <Text className="text-3xl font-poppins text-black dark:text-white">{colorScheme}</Text>
        <Text className="font-poppins-bold text-3xl">Poppins Bold ✅</Text>
        <Text className="font-poppins dark:text-green-500">This should use Poppins Regular</Text>
        <Text className="color-gray-500">please login or sign up to continue out app</Text>
        <View className="w-full gap-8 mt-20">
          <FloatingLabelInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={error}
          />
          <FloatingLabelInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title="Validate"
            onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
          />
        </View>
      </View>
    </View>
  );
}
