import React from 'react'
import { View, StyleSheet } from 'react-native'
import {TextInput} from 'react-native-paper';

const validColor = '#555555'
const invalidColor = '#ff4d00'
const CustomInput = ({
  style,
  placeholder,
  label,
  value,
  onChangeText,
  backgroundColor,
  textColor,
  secureTextEntry,
  keyboardType,
  valid,
  language,
  refer,
}) => {
  return (
      <TextInput
          theme={{
            colors: {
              primary: textColor, // Outline color here
              text: textColor,
              placeholder: textColor,
              background: backgroundColor,
            }
          }}
            style={[
              style && { 
                backgroundColor: backgroundColor,
                textAlign: language == 'English' ? 'left' : 'right',
              } 
                // && styles.font &&
                // (valid ? { color: validColor } : { color: invalidColor }),
            ]}
            placeholder={placeholder}
            label={label}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            ref={refer}
            mode="outlined"
          />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  font: {
    fontSize: 14,
    color: '#555555',
    borderBottomColor: '#555555',
    borderBottomWidth: 1,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});

export default CustomInput
