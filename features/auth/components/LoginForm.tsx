import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginFormSchema, LoginFormSchemaType } from '../schemas/LoginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { TouchableOpacity, View } from 'react-native';
import { AppText } from '@/components';
import FormInput from '@/components/form/FormInput';
import FormWrapper from '@/components/FormWrapper';

export default function LoginForm() {
  const methods = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log('FormData', data);
  });
  return (
    <FormProvider {...methods}>
        <FormInput name="email" label="Email" />
        <FormInput name="password" label="Password" secureTextEntry />
        <TouchableOpacity
          className="bg-black rounded-full justify-center items-center mt-10 min-h-12"
          onPress={onSubmit}
        >
          <AppText weight="bold" className="text-xl font-bold text-center text-white">
            Login
          </AppText>
        </TouchableOpacity>
    </FormProvider>
  );
}
