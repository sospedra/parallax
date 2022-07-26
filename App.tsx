import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native'
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import PHOTO from './assets/images/target.png'
import BG from './assets/images/target-bg.jpg'

export default function App() {
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 10,
  })
  const picAniamtedStyle = useAnimatedStyle(() => {
    const qx = Math.abs(animatedSensor.sensor.value.qx)
    return {
      transform: [{ translateX: withTiming(qx * 80, { duration: 100 }) }],
    }
  })
  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const qx = Math.abs(animatedSensor.sensor.value.qx)
    return {
      transform: [{ translateX: withTiming(qx * 160, { duration: 50 }) }],
    }
  })

  return (
    <SafeAreaView style={s.container}>
      <View style={s.card}>
        <Animated.Image source={PHOTO} style={[s.pic, picAniamtedStyle]} />
        <Animated.Image source={BG} style={[s.bg, backgroundAnimatedStyle]} />
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#464756',
    justifyContent: 'space-between',
  },
  card: {
    width: Dimensions.get('window').width - 32,
    alignItems: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  pic: {
    height: '104%',
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: 0,
  },
  bg: {
    height: '100%',
  },
})
