import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CreateCard from './CreditCardScreen/components/CreateCard'
import { CheckoutLogic, styles } from './CheckoutLogic'
import { View, Text } from 'react-native'
import {TextInput} from 'react-native-paper';

class CheckoutScreen extends CheckoutLogic {
  constructor(props) {
    super(props)
  }

  closeScreen() {
    this.props.navigation.pop(1)
  }
  cardContainer() {
    const backgroundColor = this.getBackgroundColor()

    return {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: backgroundColor,
    }
  }

  renderTextInputRow(label, varName, defaultValue, isBilling) {
    const textColor = this.getTextColor()
    return (
      <TextInput
        label={label}
        theme={{
          colors: {
            primary: textColor, // Outline color here
            text: textColor,
            placeholder: textColor
          }
        }}
        style={this.TextInputRowStyle()}
        mode="outlined"
        dense={true}
        onChangeText={this.onAddressChange.bind(
          this,
          varName,
          isBilling
        )}
        defaultValue={defaultValue}
      />
    );
  }
  
  renderAddress(isBilling) {
    const {lang} = this.myProps;
    if(lang === 'Arabic') {
      return this.renderAddressAR(isBilling);
    }
    return this.renderAddressEN(isBilling);
  }
  renderAddressAR(isBilling) {
    const textColor = this.getTextColor()
    const backgroundColor = this.getBackgroundColor()
    return (
      <View>
        <Text style={this.TitleStyle()}>{isBilling ? "عنوان الدفع" : "عنوان الشحن"}</Text>
        {this.renderTextInputRow(
          'الدوله',
          '_countryCode',
          isBilling ? this.state.billingAddress._countryCode :  this.state.shippingAddress._countryCode,
          isBilling
        )}
        {this.renderTextInputRow(
          'الشارع و رقم المنزل',
          '_street',
          isBilling ? this.state.billingAddress._street :  this.state.shippingAddress._street,
          isBilling
        )}
        <View
          style={
            {
              flexDirection: 'row',
              marginVertical: 10,
            }
          }>
          <TextInput
            label="المحافظه"
            theme={{
              colors: {
                primary: textColor, // Outline color here
                text: textColor,
                placeholder: textColor,
                background: backgroundColor,
              }
            }}
            style={{flex: 3, marginRight: 10, textAlign: 'right'}}
            mode="outlined"
            dense={true}
            onChangeText={this.onAddressChange.bind(
              this,
              '_city',
              isBilling
            )}
            defaultValue={isBilling ? this.state.billingAddress._city :  this.state.shippingAddress._city}
          />
          <TextInput
            label="الرقم البريدى"
            theme={{
              colors: {
                primary: textColor, // Outline color here
                text: textColor,
                placeholder: textColor,
                background: backgroundColor,
              }
            }}
            style={{flex: 3, textAlign: 'right'}}
            mode="outlined"
            dense={true}
            onChangeText={this.onAddressChange.bind(
              this,
              '_postCode',
              isBilling
            )}
            defaultValue={isBilling ? this.state.billingAddress._postCode :  this.state.shippingAddress._postCode}
          />
        </View>
      </View>
    );
  }
  renderAddressEN(isBilling) {
    const textColor = this.getTextColor()
    const backgroundColor = this.getBackgroundColor()
    return (
      <View>
        <Text style={this.TitleStyle()}> {isBilling? 'Billing address' : 'Shipping address'} </Text>
        {this.renderTextInputRow(
          'Country Code',
          '_countryCode',
          isBilling ? this.state.billingAddress._countryCode :  this.state.shippingAddress._countryCode,
          isBilling
        )}
        {this.renderTextInputRow(
          'Street name & number',
          '_street',
          isBilling ? this.state.billingAddress._street :  this.state.shippingAddress._street,
          isBilling
        )}
        <View
          style={
            {
              flexDirection: 'row',
              marginVertical: 10,
            }
          }>
          <TextInput
            label="City"
            theme={{
              colors: {
                primary: textColor, // Outline color here
                text: textColor,
                placeholder: textColor,
                background: backgroundColor,
              }
            }}
            style={{flex: 3, marginRight: 10}}
            mode="outlined"
            dense={true}
            onChangeText={this.onAddressChange.bind(
              this,
              '_city',
              isBilling
            )}
            defaultValue={isBilling ? this.state.billingAddress._city :  this.state.shippingAddress._city}
          />
          <TextInput
            label="Postal"
            theme={{
              colors: {
                primary: textColor, // Outline color here
                text: textColor,
                placeholder: textColor,
                background: backgroundColor,
              }
            }}
            style={{flex: 3}}
            mode="outlined"
            dense={true}
            onChangeText={this.onAddressChange.bind(
              this,
              '_postCode',
              isBilling
            )}
            defaultValue={isBilling ? this.state.billingAddress._postCode :  this.state.shippingAddress._postCode}
          />
        </View>
      </View>
    );
  }
  render() {
    const language = this.myProps.lang;
    return (
      <KeyboardAwareScrollView style={this.cardContainer()}>
        <Text style={this.TitleStyle()}>{language === 'English'? 'Payment' : 'الدفع' }</Text>
        <CreateCard
          language={language}
          textColor={this.getTextColor()}
          backgroundColor={this.getBackgroundColor()}
          onChange={this.onDataChange}
        />
        {this.myProps.showSaveCard ? this.renderRememberMe() : null}
        {this.myProps.showBilling ? this.renderAddress(true) : null}
        {this.myProps.showShipping ? this.renderAddress(false) : null}
        {this.renderButtonType()}

        {this.renderPaymentInfo()}

        <View
          style={{
            marginTop: 15,
          }}
        />
        {this._renderThreeDSecure()}
      </KeyboardAwareScrollView>
    )
  }
}

export default CheckoutScreen
