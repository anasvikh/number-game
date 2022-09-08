import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { MonoText } from '../../../components/StyledText';

export function NumberItem({ item, isShowHint, onPress }: any) {

  useEffect(() => {
    if (isShowHint) {
      fadeIn();
    }
  }, [isShowHint]);

  const fadeAnim = useRef(new Animated.Value(item?.opacity)).current;
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
    fontFamily: 'quicksand'
  };

  return (
    <Pressable
      onPress={() => onPress(item?.value)}
      style={[numberStyles.container, positionStyles]}
      hitSlop={35}>
      <Animated.Text
        style={[fontStyles, {
          opacity: fadeAnim,
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