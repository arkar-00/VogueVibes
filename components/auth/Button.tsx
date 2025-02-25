import { Pressable, StyleSheet } from 'react-native';
import React, { memo, useCallback } from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

type Props = {
  currentIndex: SharedValue<number>;
  length: number;
  flatListRef: any;
  onFinish: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({ currentIndex, length, flatListRef, onFinish }: Props) => {
  // Animated button style
  const rnBtnStyle = useAnimatedStyle(
    () => ({
      width: withSpring(currentIndex.value === length - 1 ? 140 : 48),
      height: 48,
    }),
    [currentIndex.value, length]
  );

  // Animated "Get Started" text style
  const rnTextStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(currentIndex.value === length - 1 ? 1 : 0),
      transform: [
        {
          translateX: withTiming(currentIndex.value === length - 1 ? 0 : 100),
        },
      ],
    }),
    [currentIndex.value, length]
  );

  // Animated arrow image style
  const imageAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(currentIndex.value !== length - 1 ? 1 : 0),
      transform: [
        {
          translateX: withTiming(currentIndex.value !== length - 1 ? 0 : 100),
        },
      ],
    }),
    [currentIndex.value, length]
  );

  // Handle button press
  const onPress = useCallback(() => {
    if (currentIndex.value === length - 1) {
      onFinish();
    } else {
      flatListRef?.current?.scrollToIndex({
        index: currentIndex.value + 1,
      });
    }
  }, [currentIndex.value, length, flatListRef]);

  return (
    <AnimatedPressable style={[styles.container, rnBtnStyle]} onPress={onPress}>
      <Animated.Text style={[styles.textStyle, rnTextStyle]}>Get Started</Animated.Text>
      <Animated.Image
        source={require('../../assets/images/auth/arrow.png')}
        style={[styles.imageStyle, imageAnimatedStyle]}
      />
    </AnimatedPressable>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  textStyle: {
    color: 'white',
    position: 'absolute',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  imageStyle: {
    width: 24,
    height: 24,
    position: 'absolute',
  },
});
