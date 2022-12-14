import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'

export default class CCInput extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,

    status: PropTypes.oneOf(['valid', 'invalid', 'incomplete']),

    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBecomeEmpty: PropTypes.func,
    onBecomeValid: PropTypes.func,
    additionalInputProps: PropTypes.shape(TextInput.propTypes),
  }

  static defaultProps = {
    label: '',
    value: '',
    status: 'incomplete',
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => {},
    onChange: () => {},
    onBecomeEmpty: () => {},
    onBecomeValid: () => {},
    additionalInputProps: {},
  }

  componentDidUpdate(prevProps) {
    const { status, value, onBecomeEmpty, onBecomeValid, field } = prevProps
    const { status: newStatus, value: newValue } = this.props

    if (value !== '' && newValue === '') {
      onBecomeEmpty(field)
    }
    if (status !== 'valid' && newStatus === 'valid') {
      onBecomeValid(field)
    }
  }

  focus = () => this.refs.input.focus()

  _onFocus = () => this.props.onFocus(this.props.field)
  _onChange = (value) => this.props.onChange(this.props.field, value)

  render() {
    const {
      label,
      value,
      placeholder,
      status,
      keyboardType,
      containerStyle,
      inputStyle,
      labelStyle,
      validColor,
      invalidColor,
      placeholderColor,
      additionalInputProps,
    } = this.props
    return (
      <View style={[containerStyle]}>
        {!!label && <Text style={[labelStyle]}>{label}</Text>}
        <TouchableOpacity onPress={this.focus}>
          <TextInput
            ref="input"
            {...additionalInputProps}
            keyboardType={keyboardType}
            autoCapitalise="words"
            autoCorrect={false}
            style={[
              inputStyle,
              validColor && status === 'valid'
                ? { color: validColor }
                : invalidColor && status === 'invalid'
                ? { color: invalidColor }
                : {},
            ]}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={placeholderColor}
            placeholder={placeholder}
            value={value}
            onFocus={this._onFocus}
            onChangeText={this._onChange}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
