import React, { useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface TabBarButtonProps {
  isFocused: boolean;
  onPress: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  label: string;
  icon: (props: { style: ViewStyle | TextStyle }) => React.ReactNode;
  accessibilityLabel?: string;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({
  isFocused,
  onPress,
  onLongPress,
  label,
  icon,
  accessibilityLabel,
}) => {
  const scale = useSharedValue(0);
  const iconPositionX = useSharedValue(0);
  const textPositionX = useSharedValue(0);
  const backgroundOpacity = useSharedValue(0);
  const buttonWidth = useSharedValue(width / 5);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 900 });
    iconPositionX.value = withSpring(isFocused ? -5 : 1, { duration: 900 });
    textPositionX.value = withSpring(isFocused ? 0 : 1, { duration: 900 });
    backgroundOpacity.value = withTiming(isFocused ? 1 : 0, { duration: 900 });
    buttonWidth.value = withSpring(isFocused ? width / 4.5 : width / 10, { duration: 1200 });
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(scale.value, [0, 1], [0.8, 1]) },
        { translateX: iconPositionX.value },
      ],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scale.value, [0, 1], [0, 1]),
      transform: [{ translateX: textPositionX.value }],
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      width: buttonWidth.value,
    };
  });

  return (
    <Animated.View style={[styles.tabBarButton, animatedButtonStyle]}>
      <Pressable
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.pressable}
      >
        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
          {icon({ style: { color: '#ffffff' } })}
        </Animated.View>

        {/* Only show the label when focused */}
        {isFocused && (
          <Animated.Text style={[styles.label, animatedTextStyle]}>{label}</Animated.Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    height: width / 10,
    backgroundColor: '#EEEEEE',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 10,
    height: width / 10,
    borderRadius: 20,
  },
  label: {
    color: '#000000',
    paddingRight: 5,
    fontWeight: 'bold',
  },
});

export default TabBarButton;
