import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

const Header = ({ title }) => {
  const { textStyle, viewStyle } = styles
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{title}</Text>
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

const styles = {
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewStyle: {
    paddingTop: 10,
    marginHorizontal: 10,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.2,
    position: 'relative',
  },
}

export { Header }
