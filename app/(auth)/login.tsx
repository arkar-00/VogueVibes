import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';

import LoginForm from '@/features/auth/components/LoginForm';
import FormWrapper from '@/components/FormWrapper';

export default function Login() {
  return (
    <FormWrapper>
     <ScrollView>
     <View className="flex-1 bg-white dark:bg-black">
        <View className="justify-center items-center">
          <Image
            source={require('../../assets/images/auth/logo.png')}
            className="w-[100%] h-[150] mt-20"
            resizeMode="cover"
          />
        </View>

        <View className="p-5">
          <Text className="font-poppins-bold text-3xl mb-1">Welcome!</Text>
          <Text className="text-gray-500 mb-[50]">please login or sign up to continue our app</Text>

          <LoginForm />
        </View>
      </View>
     </ScrollView>
    </FormWrapper>
  );
}
