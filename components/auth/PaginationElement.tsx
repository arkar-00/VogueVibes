import { StyleSheet, View, useWindowDimensions } from 'react-native';
import React, { memo, useCallback } from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';

type Props = {
  length: number;
  x: SharedValue<number>;
};

const PaginationElement = ({ length, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const PaginationComponent = useCallback(
    ({ index }: { index: number }) => {
      const itemRnStyle = useAnimatedStyle(() => {
        const inputRange = [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ];

        const width = interpolate(x.value, inputRange, [35, 16, 35], 'clamp');

        const bgColor = interpolateColor(x.value, inputRange, ['#D0D0D0', 'gray', '#D0D0D0']);

        return {
          width,
          backgroundColor: bgColor,
        };
      }, [x]);

      return <Animated.View style={[styles.itemStyle, itemRnStyle]} />;
    },
    [SCREEN_WIDTH, x]
  );

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <PaginationComponent index={index} key={index} />
      ))}
    </View>
  );
};

export default memo(PaginationElement);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    width: 30,
    height:5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
