import { TextInputProps } from 'react-native';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FloatingLabelInput from '../FloatingLabelInput';

interface FormInputProps extends TextInputProps {
  name: string;
  label: string;
  rules?: object;
}

export default function FormInput({ name, label, rules, ...rest }: FormInputProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name];
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <FloatingLabelInput
          label={label}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={error?.message as string}
          {...rest}
        />
      )}
    />
  );
}
