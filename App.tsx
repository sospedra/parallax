import React, { useReducer } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import PHOTO from './assets/images/target.png'
import BG from './assets/images/target-bg.jpg'
import Slider from '@react-native-community/slider'

type S = typeof DEFAULT_STATE
const DEFAULT_STATE = {
  sensor: 10,
  pic: 80,
  bg: 160,
  radius: 2,
}

export default function App() {
  const [state, dispatch] = useReducer(
    (
      state = DEFAULT_STATE,
      action: {
        key: keyof S
        value: S[keyof S]
      }
    ): S => {
      return { ...state, [action.key]: action.value }
    },
    DEFAULT_STATE
  )
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: state.sensor,
  })
  const picAniamtedStyle = useAnimatedStyle(() => {
    const qx = Math.abs(animatedSensor.sensor.value.qx)
    return {
      transform: [
        { translateX: withTiming(qx * state.pic, { duration: 100 }) },
      ],
    }
  })
  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const qx = Math.abs(animatedSensor.sensor.value.qx)
    return {
      transform: [{ translateX: withTiming(qx * state.bg, { duration: 50 }) }],
    }
  })

  return (
    <SafeAreaView style={s.container}>
      <View style={s.card}>
        <Animated.Image
          source={BG}
          blurRadius={state.radius}
          style={backgroundAnimatedStyle}
        />
        <Animated.Image source={PHOTO} style={[s.pic, picAniamtedStyle]} />
      </View>
      <View>
        <Text style={s.label}>Sensor interval</Text>
        <Slider
          minimumValue={1}
          maximumValue={20}
          value={state.sensor}
          onValueChange={(value) => dispatch({ key: 'sensor', value })}
        />
        <Text style={s.label}>Picture QX</Text>
        <Slider
          minimumValue={1}
          maximumValue={200}
          value={state.pic}
          onValueChange={(value) => dispatch({ key: 'pic', value })}
        />
        <Text style={s.label}>Background QX</Text>
        <Slider
          minimumValue={1}
          maximumValue={200}
          value={state.bg}
          onValueChange={(value) => dispatch({ key: 'bg', value })}
        />
        <Text style={s.label}>Blur radius</Text>
        <Slider
          minimumValue={1}
          maximumValue={10}
          value={state.radius}
          onValueChange={(value) => dispatch({ key: 'radius', value })}
        />
      </View>
      <Text style={s.footer}>
        Cameo Confidential {new Date().getFullYear()}
      </Text>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  card: {
    width: Dimensions.get('window').width - 32,
    alignItems: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  pic: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  label: {
    color: 'white',
    fontSize: 12,
    marginBottom: -8,
    opacity: 0.5,
  },
  footer: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    opacity: 0.5,
    padding: 16,
  },
})
