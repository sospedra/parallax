import React from 'react'
import {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { Card, Pic, Background } from './styles'
import PHOTO from '../../../assets/images/target.png'
import BG from '../../../assets/images/target-bg.jpg'

export default function Content() {
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
      transform: [{ translateX: withTiming(qx * 300, { duration: 50 }) }],
    }
  })

  return (
    <Card>
      <Pic
        source={PHOTO}
        offset={{ top: 0, left: 0 }}
        style={picAniamtedStyle}
      />
      <Background source={BG} style={backgroundAnimatedStyle} />
    </Card>
  )
}
