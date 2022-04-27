import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CreateCard from './CreditCardScreen/components/CreateCard'
import { CheckoutLogic, styles } from './CheckoutLogic'
import { View } from 'react-native'
class CheckoutScreen extends CheckoutLogic {
  constructor(props) {
    super(props)
  }

  onPaymentSuccess(res) {
    this.props.navigation.navigate({
      name: this.myProps.previousScreen,
      params: { successResponse: res, failureResponse: '' },
      merge: true,
    })
  }
  onPaymentFailure(res) {
    this.props.navigation.navigate({
      name: this.myProps.previousScreen,
      params: { successResponse: '', failureResponse: res },
      merge: true,
    })
  }
  closeScreen() {
    this.props.navigation.pop(1)
  }
  cardContainer() {
    const backgroundColor = this.myProps.backgroundColor
      ? this.myProps.backgroundColor
      : '#fff'

    return {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: backgroundColor,
    }
  }
  render() {
    return (
      <KeyboardAwareScrollView style={this.cardContainer()}>
        {this.renderPaymentInfo()}
        <CreateCard
          cardColor={this.myProps.cardColor}
          onChange={this.onDataChange}
        />
        {this.renderRememberMe()}
        {this.renderButtonType()}
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
