import React from 'react'
import { TextInput } from 'react-native'

import styles from './styles'

const validColor = '#555555'
const invalidColor = '#ff4d00'
const CustomInput = ({
  style,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  secureTextEntry,
  keyboardType,
  valid,
  refer,
}) => {
  return (
    <TextInput
      style={[
        style &&
          styles.font &&
          (valid ? { color: validColor } : { color: invalidColor }),
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      placeholderTextColor={'#aaaaaa'}
      ref={refer}
    />
  )
}

export default CustomInput
