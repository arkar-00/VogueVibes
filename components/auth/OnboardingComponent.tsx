import { View,ImageURISource, StyleSheet, ViewToken } from 'react-native';
import React, { useCallback } from 'react';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import ListItem, { ItemProps } from './ListItem';
import PaginationElement from './PaginationElement';
import Button from './Button';
import { SafeAreaView } from 'react-native-safe-area-context';

const pages: ItemProps[] = [
  {
    title1: '20% Discount',
    title2: 'New Arrival Product',
    subTitle: 'Publish up your selfies to make yourself more beautiful with this app',
    image: require('../../assets/images/onboarding/lisa4.jpeg'),
  },
  {
    title1: 'Take Advantage',
    title2: 'Of The Offer Shopping',
    subTitle: 'Publish up your selfies to make yourself more beautiful with this app',
    image: require('../../assets/images/onboarding/lisa2.jpeg'),
  },
  {
    title1: 'All Types Offers',
    title2: 'Within Your Reach',
    subTitle: 'Publish up your selfies to make yourself more beautiful with this app',
    image: require('../../assets/images/onboarding/lisa3.jpeg'),
  },
];

export default function OnboardingComponent({
  onFinish,
}: {
  onFinish: () => void;
  onSkip: () => void;
}) {

  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      text: string;
      image: ImageURISource;
    }>
  >();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    []
  );
  
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({ item, index }: { item: ItemProps; index: number }) => {
      return <ListItem item={item} index={index} x={x} />;
    },
    [x]
  );

  return (
    <SafeAreaView className="flex-1">
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandle}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled={true}
        data={pages}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.bottomContainer}>
        <PaginationElement length={pages.length} x={x} />
        <Button
          currentIndex={flatListIndex}
          length={pages.length}
          flatListRef={flatListRef}
          onFinish={onFinish}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
