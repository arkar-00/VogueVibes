import { View, useWindowDimensions, ImageURISource, StyleSheet } from 'react-native';
import React from 'react';
import Animated, { interpolate, useAnimatedStyle, SharedValue } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

export type ItemProps = { title1: string; title2: string; subTitle: string; image: ImageURISource };

type ListItemProps = {
  item: ItemProps;
  index: number;
  x: SharedValue<number>;
};

const ListItem = ({ item, index, x }: ListItemProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const createAnimatedStyle = (scale: number = 1, isText: boolean = false) =>
    useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ];

      const translateY = interpolate(x.value, inputRange, [100, 0, 100], 'clamp');
      const opacity = interpolate(x.value, inputRange, [0, 1, 0], 'clamp');

      return {
        opacity,
        transform: [{ translateY }],
        width: isText ? undefined : SCREEN_WIDTH * 0.9 * scale,
        height: isText ? undefined : SCREEN_WIDTH * 1.2 * scale,
      };
    });

  const imageStyle = createAnimatedStyle();
  const textStyle = createAnimatedStyle(0.5, true); // Scaled down for text

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <Animated.Image source={item.image} style={[imageStyle, styles.image]} resizeMode="cover" />
      <View style={{ width: SCREEN_WIDTH, padding: 20 }}>
        <Animated.Text
          style={[styles.textItem, textStyle, { color: isDark ? '#FFFFFF' : '#000000' }]}
        >
          {item.title1}
        </Animated.Text>
        <Animated.Text
          style={[styles.textItem, textStyle, { color: isDark ? '#FFFFFF' : '#000000' }]}
        >
          {item.title2}
        </Animated.Text>
        <Animated.Text style={[textStyle, { color: '#727272', lineHeight: 20, marginTop: 10 }]}>
          {item.subTitle}
        </Animated.Text>
      </View>
    </View>
  );
};

export default React.memo(ListItem);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  textItem: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
  },
  image: {
    borderRadius: 20,
    alignSelf: 'center',
  },
});
