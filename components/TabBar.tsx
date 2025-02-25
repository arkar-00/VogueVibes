import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const icons: { [key: string]: (props: any) => JSX.Element } = {
    index: (props: any) => <Feather name="home" size={21} color={'#ffffff'} {...props} />,
    cart: (props: any) => <Feather name="shopping-cart" size={21} color={'#ffffff'} {...props} />,
    notifications: (props: any) => <Feather name="bell" size={21} color={'#ffffff'} {...props} />,
    profile: (props: any) => <Feather name="user" size={21} color={'#ffffff'} {...props} />,
  };
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            icon={icons[route.name]}
            label={label}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
});

export default TabBar;
