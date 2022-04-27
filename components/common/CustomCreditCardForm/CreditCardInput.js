import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  NativeModules,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  findNodeHandle,
  Image,
  TextInput,
} from 'react-native';

import Icons from './Icons'

import CCInput from './CCInput';
import { InjectedProps } from './connectToState';

let deviceWidth = Dimensions.get('window').width*0.9

const INPUTWIDTH = '100%';
const CVCWIDTH = '45%';

const s = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  form: {
    paddingHorizontal: 20,
    width: deviceWidth,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
  },
  input: {
    height: 45,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  expiryCvc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    top: -30,
  },
  iconContainer: {
    position: 'relative',
    top: -60,
    left: '85%',
    height: 30,
    width: 50,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  cvc: {
    width: CVCWIDTH,
    flexDirection: 'column',
  },
})

export default class CreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,
    labels: PropTypes.object,
    placeholders: PropTypes.object,

    labelStyle: Text.propTypes.style,
    inputStyle: TextInput.propTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    cardImageFront: PropTypes.number,
    cardImageBack: PropTypes.number,
    cardScale: PropTypes.number,
    cardFontFamily: PropTypes.string,
    cardBrandIcons: PropTypes.object,

    allowScroll: PropTypes.bool,

    additionalInputsProps: PropTypes.objectOf(
      PropTypes.shape(TextInput.propTypes)
    ),

    scrollViewProps: PropTypes.object,
  }

  static defaultProps = {
    labels: {
      name: '',
      number: '',
      expiry: '',
      cvc: '',
      postalCode: 'Postal Code',
    },
    placeholders: {
      name: 'Your name',
      number: 'Card Number',
      expiry: 'MM/YY',
      cvc: 'CVV',
      postalCode: '',
    },
    inputContainerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: '#aaaaaa',
    },
    validColor: '',
    invalidColor: 'red',
    placeholderColor: 'gray',
    allowScroll: false,
    additionalInputsProps: {},
  }

  componentDidMount = () => this._focus(this.props.focused)

  componentDidUpdate(prevProps) {
    if (prevProps.focused !== this.props.focused)
      this._focus(this.props.focused)
  }

  _focus = (field) => {
    if (!field) {return;}

    const scrollResponder = this.refs.Form.getScrollResponder()
    const nodeHandle = findNodeHandle(this.refs[field])

    NativeModules.UIManager.measureLayoutRelativeToParent(
      nodeHandle,
      (e) => {
        throw e
      },
      (x) => {
        scrollResponder.scrollTo({ x: Math.max(x), animated: true })
        this.refs[field].focus()
      }
    )
  }

  _inputProps = (field) => {
    const {
      inputStyle,
      labelStyle,
      validColor,
      invalidColor,
      placeholderColor,
      placeholders,
      labels,
      values,
      status,
      onFocus,
      onChange,
      onBecomeEmpty,
      onBecomeValid,
      additionalInputsProps,
    } = this.props

    return {
      inputStyle: [s.input, inputStyle],
      labelStyle: [s.inputLabel, labelStyle],
      validColor,
      invalidColor,
      placeholderColor,
      ref: field,
      field,

      label: labels[field],
      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus,
      onChange,
      onBecomeEmpty,
      onBecomeValid,

      additionalInputProps: additionalInputsProps[field],
    }
  }

  renderCardIcon(type) {
    return (
      <View style={s.iconContainer}>
        <Image style={s.icon} source={Icons[type]} />
      </View>
    )
  }

  render() {
    const {
      inputContainerStyle,
      values: { type },
      allowScroll,
      requiresName,
      requiresCVC,
      requiresPostalCode,
      scrollViewProps,
    } = this.props
    return (
      <View style={s.container}>
        <ScrollView
          ref="Form"
          vertical
          keyboardShouldPersistTaps="always"
          scrollEnabled={allowScroll}
          style={s.form}
          {...scrollViewProps}
        >
          {requiresName && (
            <CCInput
              {...this._inputProps('name')}
              containerStyle={[
                s.inputContainer,
                inputContainerStyle,
                { width: INPUTWIDTH },
              ]}
            />
          )}
          <CCInput
            {...this._inputProps('number')}
            keyboardType="numeric"
            containerStyle={[
              s.inputContainer,
              inputContainerStyle,
              { width: INPUTWIDTH },
            ]}
          />
          {this.renderCardIcon(type)}
          <View style={s.expiryCvc}>
            <CCInput
              {...this._inputProps('expiry')}
              keyboardType="numeric"
              containerStyle={[s.cvc, s.inputContainer, inputContainerStyle]}
            />
            {requiresCVC && (
              <CCInput
                {...this._inputProps('cvc')}
                keyboardType="numeric"
                containerStyle={[s.cvc, s.inputContainer, inputContainerStyle]}
              />
            )}
          </View>
          {requiresPostalCode && (
            <CCInput
              {...this._inputProps('postalCode')}
              containerStyle={[
                s.inputContainer,
                inputContainerStyle,
                { width: INPUTWIDTH, position: 'relative', top: -30 },
              ]}
            />
          )}
        </ScrollView>
      </View>
    )
  }
}
