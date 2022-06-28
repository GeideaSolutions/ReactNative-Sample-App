import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Switch } from 'react-native'
import { Section, Button } from './common'
import GeideaApi from '../actions/GeideaApi'
import InitiateAuthenticationRequestBody from '../request/InitiateAuthenticationRequestBody'
import PayerAuthenticationRequestBody from '../request/PayerAuthenticationRequestBody'
import PayDirectRequestBody from '../request/PayDirectRequestBody'
import PaymentCard from '../models/PaymentCard'
import expiryDate from '../models/expiryDate'
import AuthenticationApiResponse from '../response/AuthenticationApiResponse'
import OrderResponse from '../response/OrderApiResponse'
import { formatCurrencyAmountLabel } from '../utils'
import ThreeDSScreenModal from './ThreeDSModal'
import Address from 'react_geideapay/models/adress';
let returnUrl = 'https://returnurl.com';
class CheckoutLogic extends Component {
  constructor(props) {
    super(props)
    this.state = this._calculateState(props)
    this.type = 'modal'
    if (props.route != null && props.route.params != null) {
      this.type = 'screen'
      this.myProps = this.props.route.params
    }
    console.log(this.type, this.state)

    this.onDataChange = this.onDataChange.bind(this)
    this.onAddressChange = this.onAddressChange.bind(this)

  }

  _calculateState(props) {
    var shippingAddress
    var billingAddress
    if (props != null && props.shippingAddress != null) {
      shippingAddress = props.shippingAddress
    }
    if (props != null && props.billingAddress != null) {
      billingAddress = props.billingAddress
    }
    var callbackUrl = 'https://returnurl.com'
    if (props != null && props.route != null && props.route.params != null) {
      shippingAddress = this.props.route.params.shippingAddress
      billingAddress = this.props.route.params.billingAddress
      callbackUrl = this.props.route.params.callbackUrl == '' ? 'https://returnurl.com' : this.props.route.params.callbackUrl
    }
    return {
      loading: false,
      creditCardFormValid: false,
      creditCardFormData: {},
      rememberMe: false,
      threeDSecureModalVisible: false,
      htmlBodyContent: '',
      orderId: null,
      threeDSecureId: null,
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
      callbackUrl: callbackUrl,
    }
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
  _handlePaymentRequest() {
    const { amount, currency, publicKey, apiPassword, paymentOperation } =
      this.type === 'modal' ? this.props : this.myProps
    const { rememberMe, callbackUrl,  billingAddress, shippingAddress } = this.state
    console.log(this.state)
    this.setState({ loading: true })
    this._initiateAuthentication(
      amount,
      currency,
      callbackUrl,
      returnUrl,
      publicKey,
      apiPassword,
      billingAddress, 
      shippingAddress
    )
      .then((res) => {
        let initiateAuthenticationResponse =
          AuthenticationApiResponse.fromJson(res)
        if (initiateAuthenticationResponse.responseCode !== '000') {
          return this.onPaymentFailure(initiateAuthenticationResponse)
        }
        this._payerAuthentication(
          amount,
          currency,
          initiateAuthenticationResponse.orderId,
          callbackUrl,
          returnUrl,
          rememberMe,
          publicKey,
          apiPassword,
          paymentOperation
        )
          .then((payerAuthenticationResponse) => {
            //console.log(payerAuthenticationResponse)
            let response = AuthenticationApiResponse.fromJson(
              payerAuthenticationResponse
            )
            if (response.responseCode === '000') {
              //handle 3d secure
              let htmlBodyContent = response.html.replace(
                'target="redirectTo3ds1Frame"',
                'target="_top"'
              )
              htmlBodyContent = htmlBodyContent.replace(
                'target="challengeFrame"',
                'target="_top"'
              )
              this.setState({
                threeDSecureModalVisible: true,
                htmlBodyContent: htmlBodyContent,
                orderId: response.orderId,
                threeDSecureId: response.threeDSecureId,
              })
            } else {
              return this.onPaymentFailure(response)
            }
          })
          .catch((err) => {
            return this.onPaymentFailure(err)
          })
      })
      .catch((err) => this.onPaymentFailure(err))
  }

  _initiateAuthentication(
    amount,
    currency,
    callbackUrl,
    returnUrl,
    publicKey,
    apiPassword,
    billingAddressProp, 
    shippingAddressProp
  ) {

    let billingAddress = new Address({
      countryCode: billingAddressProp._countryCode,
      street: billingAddressProp._street,
      city: billingAddressProp._city,
      postCode: billingAddressProp._postCode,
    });

    let shippingAddress = new Address({
      countryCode: shippingAddressProp._countryCode,
      street: shippingAddressProp._street,
      city: shippingAddressProp._city,
      postCode: shippingAddressProp._postCode,
    });

    let initiateAuthenticationRequestBody =
      new InitiateAuthenticationRequestBody(
        amount,
        currency,
        this.state.creditCardFormData.number.replace(/\s+/g, ''),
        {
          callbackUrl: callbackUrl,
          returnUrl: returnUrl,
          cardOnFile: this.state.rememberMe,
          billing: billingAddress,
          shipping: shippingAddress,
        }
      )
    console.log(initiateAuthenticationRequestBody.paramsMap())

    return GeideaApi.initiateAuthentication(
      initiateAuthenticationRequestBody,
      publicKey,
      apiPassword
    )
  }

  _payerAuthentication(
    amount,
    currency,
    orderId,
    callbackUrl,
    returnUrl,
    cardOnFile,
    publicKey,
    apiPassword,
    paymentOperation
  ) {
    let expireDate = this.state.creditCardFormData.expiry.replace(/\s+/g, '')
    var monthYear = expireDate.split('/')
    let exDate = new expiryDate(monthYear[0], monthYear[1])
    let card = new PaymentCard(
      this.state.creditCardFormData.name.replace(/\s+/g, ''),
      this.state.creditCardFormData.number.replace(/\s+/g, ''),
      this.state.creditCardFormData.cvc.replace(/\s+/g, ''),
      exDate
    )
    let payerAuthenticationRequestBody = new PayerAuthenticationRequestBody(
      amount,
      currency,
      card,
      orderId,
      {
        callbackUrl: callbackUrl,
        returnUrl: returnUrl,
        cardOnFile: cardOnFile,
        paymentOperation: paymentOperation,
      }
    )
    console.log(payerAuthenticationRequestBody.paramsMap())

    return GeideaApi.payerAuthentication(
      payerAuthenticationRequestBody,
      publicKey,
      apiPassword,
      null
    )
  }

  _directPay(
    amount,
    currency,
    orderId,
    threeDSecureId,
    publicKey,
    apiPassword
  ) {
    let expireDate = this.state.creditCardFormData.expiry.replace(/\s+/g, '')
    var monthYear = expireDate.split('/')
    let exDate = new expiryDate(monthYear[0], monthYear[1])
    let card = new PaymentCard(
      this.state.creditCardFormData.name.replace(/\s+/g, ''),
      this.state.creditCardFormData.number.replace(/\s+/g, ''),
      this.state.creditCardFormData.cvc.replace(/\s+/g, ''),
      exDate
    )
    let payDirectRequestBody = new PayDirectRequestBody(
      threeDSecureId,
      orderId,
      amount,
      currency,
      card
    )
    console.log(payDirectRequestBody.paramsMap())

    return GeideaApi.payDirect(payDirectRequestBody, publicKey, apiPassword)
  }

  onDataChange(form) {
    this.setState({ creditCardFormValid: form.valid })
    this.setState({ creditCardFormData: form.values })
  }

  onAddressChange(key, isBilling, value) {
    if(isBilling)
    {
      this.state.billingAddress[key] = value
    }
    else
    {
      this.state.shippingAddress[key] = value
    }
  }
  _closeThreeDSecureModal() {
    const { amount, currency, publicKey, apiPassword } =
      this.type === 'modal' ? this.props : this.myProps
    const { orderId, threeDSecureId } = this.state
    if (orderId && threeDSecureId) {
      this.setState({
        threeDSecureModalVisible: false,
      })
      this._directPay(
        amount,
        currency,
        orderId,
        threeDSecureId,
        publicKey,
        apiPassword
      )
        .then((res) => {
          let orderResponse = OrderResponse.fromJson(res)
          this.onPaymentSuccess(orderResponse)
        })
        .catch((err) => this.onPaymentFailure(err))
    }
  }

  getTextColor()
  {
    const props = this.type === 'modal' ? this.props : this.myProps
    const textColor = props.textColor ? props.textColor: '#fff'
    if(this.type === 'modal')
    {
      return '#000';
    }
    return textColor
  }
  getBackgroundColor()
  {
    const props = this.type === 'modal' ? this.props : this.myProps
    const backgroundColor = props.backgroundColor ? props.backgroundColor: '#2c2222'
    return backgroundColor
  }
  getLanguage()
  {
    const props = this.type === 'modal' ? this.props : this.myProps
    const lang = props.lang ? props.lang: 'English'
    return lang
  }
  TitleStyle()
  {
    const language = this.getLanguage()
    const textColor = this.getTextColor()
    return {
      fontSize: 16,
      marginBottom: 10,
      marginTop: 40,
      fontWeight: 'bold',
      color: textColor,
      textAlign : language === 'English' ? 'left' : 'right',
    }
  }
  TitleNoMarginStyle()
  {
    const textColor = this.getTextColor()
    return {
      fontSize: 14,
      fontWeight: 'bold',
      marginHorizontal: 10,
      color: textColor,
    }
  }
  PaymentTitleStyle() {
    const textColor = this.getTextColor()
    return  {
      fontWeight: '500',
      fontSize: 16,
      color: textColor,
    }
  }
  TextInputRowStyle() {
    const textColor = this.getTextColor()
    const backgroundColor = this.getBackgroundColor()
    const language = this.getLanguage()
    return  {
      marginVertical: 10,
      backgroundColor: backgroundColor,
      textColor: textColor,
      highlightColor: textColor,
      textAlign : language === 'English' ? 'left' : 'right',
    }
  }
  _renderThreeDSecure() {
    const { threeDSecureModalVisible, htmlBodyContent } = this.state
    console.log(htmlBodyContent)
    return (
      <ThreeDSScreenModal
        visible={threeDSecureModalVisible}
        onRequestClose={() => this._closeThreeDSecureModal()}
        content={htmlBodyContent}
        returnUrl={returnUrl}
      />
    )
  }

  renderPaymentInfo() {
    const props = this.type === 'modal' ? this.props : this.myProps
    return (
      <View style={styles.paymentSummary}>
        <Image
          style={styles.image}
          source={require('../assets/defaultLogo.png')}
        />
        <Text style={this.PaymentTitleStyle()}>Powered by Geidea</Text>
      </View>
    )
  }
  renderButtonType() {
    const props = this.type === 'modal' ? this.props : this.myProps
    const { loading, creditCardFormValid } = this.state
    const label = formatCurrencyAmountLabel(props)
    return (
      <Section>
        <Button
          labelText={label}
          onPress={
            creditCardFormValid && !loading
              ? () => this._handlePaymentRequest()
              : null
          }
          loading={loading}
          buttonStyle={
            creditCardFormValid ? styles.payButton : styles.payButtonDisabled
          }
          buttonTextStyle={styles.payButtonText}
          underlayColor="#ff4d00"
          disabled={loading || !creditCardFormValid}
        />
      </Section>
    )
  }

  renderRememberMe() {
    const lang = this.getLanguage()
    const toggleSwitch = () =>
      this.setState({ rememberMe: !this.state.rememberMe })
    const { rememberMe } = this.state
    return (
      <Section>
        <View style={ lang == 'English' ? styles.checkboxContainer : styles.checkboxContainerAr}>
          <Text style={this.TitleNoMarginStyle()}> {lang == 'English' ? 'Remember my card?' : 'حفظ الكارت؟'}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#f4f3f4' }}
            thumbColor={rememberMe ? '#ff4d00' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={rememberMe}
          />
        </View>
      </Section>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  checkboxText: {
    fontSize: 16,
    color: '#000',
    marginVertical: 40,
  },
  paymentContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  parentSection: {
    flexDirection: 'row',
    padding: 15,
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  paymentForm: {
    backgroundColor: '#FBFBFB',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopColor: '#DDD',
    borderTopWidth: 1,
  },
  paymentSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 15,
  },
  inputContainer: {
    flex: 1,
    height: 36,
  },
  spacing: {
    marginLeft: 12,
  },
  totalAmount: {
    color: '#16A085',
    fontSize: 18,
  },
  paymentDescription: {
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    height: 40,
    borderRadius: 25,
    width: 40,
  },
  tabContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    height: 46,
  },
  tab: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    textAlign: 'center',
  },
  activeTab: {
    borderColor: '#372E4C',
    backgroundColor: '#372E4C',
    color: '#FFF',
  },
  notification: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorNotification: {
    backgroundColor: '#C0392B',
  },
  infoNotification: {
    backgroundColor: '#2980b9',
  },
  notificationText: {
    textAlign: 'center',
    color: '#FFF',
  },
  payButton: {
    backgroundColor: '#ff4d00',
    borderColor: '#ff4d00',
  },
  payButtonDisabled: {
    backgroundColor: '#999',
    borderColor: '#999',
  },
  payButtonText: {
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#C0C0C0',
    borderColor: '#C0C0C0',
  },
  closeButtonText: {
    color: 'black',
    fontWeight: '400',
  },
  closeModalIconContainer: {
    alignItems: 'flex-end',
    right: 8,
    top: 8,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkboxContainerAr: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  useTokenContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  tokenNotification: {
    flex: 1,
    flexDirection: 'row',
  },
  TextInput: {
    margin: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: 'bold',
  },
})

export { CheckoutLogic, styles }
