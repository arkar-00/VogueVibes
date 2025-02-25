import React, { memo, useEffect, useState } from 'react';
import { TextInput, View, Text, TextInputProps, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

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
  const [isTextHidden, setIsTextHidden] = useState(secureTextEntry);
  const labelPosition = useSharedValue(value ? -20 : 0);

  const labelStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 8,
    top: labelPosition.value,
    fontSize: labelPosition.value === 0 ? 16 : 12,
    color: error ? '#EF4444' : '#9ca3af',
  }));

  useEffect(() => {
    labelPosition.value = withTiming(value ? -20 : 0);
  }, [value]);

  const handleFocus = () => {
    labelPosition.value = withTiming(-20);
  };

  const handleBlur = () => {
    if (!value) labelPosition.value = withTiming(0);
  };

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
          style={[styles.input, error ? styles.errorBorder : styles.defaultBorder, inputStyle]}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsTextHidden(!isTextHidden)} style={styles.icon}>
            {isTextHidden ? (
              <Ionicons name="eye" size={20} />
            ) : (
              <Ionicons name="eye-off" size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default memo(FloatingInput);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    borderBottomWidth: 2,
    minHeight: 48,
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
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#EF4444',
  },
});
