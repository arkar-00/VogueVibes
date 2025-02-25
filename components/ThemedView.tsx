import { View, type ViewProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type ThemedViewProps = ViewProps & {
  className?: string;
};

const ThemedView = ({ style, className, ...otherProps }: ThemedViewProps) => {
  return (
    <View style={style} className={twMerge('bg-white dark:bg-black', className)} {...otherProps} />
  );
};

export default ThemedView;

