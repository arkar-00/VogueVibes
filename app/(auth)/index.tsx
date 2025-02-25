import React, { useCallback, useState } from 'react';
import { View, ImageBackground, Pressable } from 'react-native';
import { AppText, ThemedView } from '@/components';
import { useRouter } from 'expo-router';
import OnboardingComponent from '@/components/auth/OnboardingComponent';

export default function OnboardingScreen() {
  const router = useRouter();
  const [showOnboarding, setShowOnborading] = useState<Boolean>(true);

  const handleOnShowOnboarding = useCallback(() => {
    setShowOnborading(false);
  }, []);

  if (showOnboarding) {
    return (
      <ThemedView style={{ flex: 1 }}>
        <OnboardingComponent onFinish={handleOnShowOnboarding} onSkip={handleOnShowOnboarding} />
      </ThemedView>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/auth/auth-bg.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1" />
      <View className="mb-6">
        <Pressable
          className="bg-white rounded-full p-3 m-1"
          onPress={() => router.push('/(auth)/login')}
        >
          <AppText weight="bold" className="text-xl font-bold text-center dark:text-black">
            Login
          </AppText>
        </Pressable>
        <Pressable
          className="rounded-full p-3 m-4 border border-white "
          onPress={() => router.push('/(auth)/signup')}
        >
          <AppText weight="bold" className="text-xl font-bold text-center  text-white ">
            Sign Up
          </AppText>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
