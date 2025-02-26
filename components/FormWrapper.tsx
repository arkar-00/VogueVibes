import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

// TypeScript Props
interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>{children}</View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default FormWrapper;
