import { Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import styled, { css } from 'styled-components/native'

const { width } = Dimensions.get('window')

interface Props {
  offset: {
    top: number
    left: number
  }
}

export const Card = styled.View`
  width: ${width - 30}px;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;
  margin: 0 15px;
`

export const Pic = styled(Animated.Image).attrs({
  resizeMode: 'contain',
})<Props>`
  height: 104%;
  position: absolute;
  z-index: 99;

  ${({ offset }) =>
    offset.top &&
    css`
      top: ${offset.top}px;
    `}

  ${({ offset }) =>
    offset.left &&
    css`
      left: ${offset.left}px;
    `}
`

export const Background = styled(Animated.Image).attrs({
  resizeMode: 'contain',
})`
  height: 100%;
`
