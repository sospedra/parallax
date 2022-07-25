import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Content from './components/Content'

export default function Main() {
  return (
    <SafeAreaView style={s.container}>
      <Content />
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#464756',
    justifyContent: 'space-between',
  },
})
