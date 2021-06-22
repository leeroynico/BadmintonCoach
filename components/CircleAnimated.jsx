import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleAnimated = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = () => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start()
  }
  const circleRef = useRef();
  useEffect(() => {
    animation()
    animatedValue.addListener((v) => {
      const strokeDashoffset = 55 * Math.PI
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset
        });
      }
    })
  })
  return (
    <View >

      <Svg height="50%" width="50%">
        <G rotation="70" origin="200,100">
          <Circle cx="50%" cy="50%" r="40" stroke="#e05a3f" strokeWidth="6" />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r="40"
            stroke="green"
            strokeWidth="8"
            strokeDasharray={45 * Math.PI * 2}
            strokeDashoffset={45 * Math.PI * 2}
            strokeLinecap='round' />
        </G>
        <Text>Circle</Text>
      </Svg>

    </View>
  )
}

export default CircleAnimated
