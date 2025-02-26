import React, { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { TextInput, View, Text, TextInputProps, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

interface FloatingInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  inputStyle?: object;
  containerStyle?: object;
  secureTextEntry?: boolean;
}

function FloatingInput({
  label,
  value,
  onChangeText,
  error,
  inputStyle = {},
  containerStyle = {},
  secureTextEntry = false,
  ...props
}: FloatingInputProps) {
  const { colorScheme } = useColorScheme();
  const [isTextHidden, setIsTextHidden] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useSharedValue(value?.length > 0 || isFocused ? -20 : 0);

  const labelStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      left: 8,
      top: labelPosition.value,
      fontSize: labelPosition.value === 0 ? 16 : 12,
      fontFamily: 'Poppins-SemiBold',
      color: error ? '#EF4444' : '#9ca3af',
    }),
    [error]
  );

  useEffect(() => {
    labelPosition.value = withTiming(value?.length > 0 || isFocused ? -20 : 0, { duration: 150 });
  }, [value, isFocused]);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const toggleTextVisibility = useCallback(() => setIsTextHidden((prev) => !prev), []);

  const borderColorStyle = useMemo(
    () => (error ? styles.errorBorder : styles.defaultBorder),
    [error]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>

      <View style={styles.inputWrapper}>
        <TextInput
          {...props}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isTextHidden}
          cursorColor="#000000"
          style={[
            styles.input,
            borderColorStyle,
            inputStyle,
            { color: colorScheme === 'dark' ? '#ffffff' : '#000000' },
          ]}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={toggleTextVisibility} style={styles.icon}>
            <Ionicons name={isTextHidden ? 'eye-off' : 'eye'} size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error" size={14} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

export default memo(FloatingInput);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight:62,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    borderBottomWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    padding: 8,
    position: 'absolute',
    right: 0,
  },
  defaultBorder: {
    borderBottomColor: '#d1d5db',
  },
  errorBorder: {
    borderBottomColor: '#EF4444',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginLeft: 4,
    fontFamily: 'Poppins-Regular',
  },
});
