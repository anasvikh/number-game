import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

export function NumberItem({ item, isShowHint, onPress }: any) {

  useEffect(() => {
    if (isShowHint) {
      fadeIn();
    }
  }, [isShowHint]);

  const fadeAnim = useRef(new Animated.Value(item?.opacity)).current;
  const fontSizeAnim = useRef(new Animated.Value(item?.fontSize)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.parallel([
      // after decay, in parallel:
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(fontSizeAnim, {
        toValue: 36,
        duration: 1000,
        useNativeDriver: false
      })
    ]).start();
  };

  const positionStyles = {
    top: item?.top,
    left: item?.left,
    zIndex: item?.zIndex
  };

  const fontStyles = {
    fontSize: item.fontSize,
    opacity: item.opacity,
    color: 'white',
    fontFamily: 'champagne-limousines'
  };

  return (
    <Pressable
      onPress={() => onPress(item?.value)}
      style={[numberStyles.container, positionStyles]}
      hitSlop={35}>
      <Animated.Text
        style={[fontStyles, {
          opacity: fadeAnim,
          fontSize: fontSizeAnim,
          color: colorAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['white', 'yellow']
          })
        }]}
      >
        {item?.value}
      </Animated.Text>
    </Pressable>
  );
}

const numberStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
});