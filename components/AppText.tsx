import React, { ReactNode } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { twMerge } from 'tailwind-merge';

// ✅ Define allowed font weights
type FontWeight = 'regular' | 'light' | 'medium' | 'bold' | 'semibold' | 'italic';

// ✅ Props for AppText
interface AppTextProps extends TextProps {
  children: ReactNode;
  className?: string;
  weight?: FontWeight;
  style?: TextStyle;
}

const AppText: React.FC<AppTextProps> = ({
  children,
  className = '',
  weight = 'regular',
  style,
  ...props
}) => {
  // Map weights to Poppins font families
  const fontMap: Record<FontWeight, string> = {
    regular: 'Poppins-Regular',
    light: 'Poppins-Light',
    medium: 'Poppins-Medium',
    bold: 'Poppins-Bold',
    semibold: 'Poppins-SemiBold',
    italic: 'Poppins-Italic',
  };

  return (
    <Text
      {...props}
      style={[{ fontFamily: fontMap[weight] }, style]}
      className={twMerge(
        `text-base text-black dark:text-white`,
        className
      )}
    >
      {children}
    </Text>
  );
};

export default AppText;
