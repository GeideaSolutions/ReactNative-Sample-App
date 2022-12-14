import React, {Component, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
  StatusBar,
  Text,
} from 'react-native';
import GeideaApi from 'react_geideapay//actions/GeideaApi';
import InitiateAuthenticationRequestBody from 'react_geideapay//request/InitiateAuthenticationRequestBody';
import PayerAuthenticationRequestBody from 'react_geideapay//request/PayerAuthenticationRequestBody';
import PayDirectRequestBody from 'react_geideapay//request/PayDirectRequestBody';
import RefundRequestBody from 'react_geideapay//request/RefundRequestBody';
import PaymentCard from 'react_geideapay//models/PaymentCard';
import expiryDate from 'react_geideapay//models/expiryDate';
import {CreditCard} from 'react_geideapay//components/common/CreditCard';
import PaymentModal from 'react_geideapay//components/PaymentModal';
import {Header, Input} from 'react_geideapay//components/common';
import Toast from 'react-native-toast-message';
import {TextInput} from 'react-native-paper';

let publicKey = 'f7bdf1db-f67e-409b-8fe7-f7ecf9634f70';
let apiPassword = '0c9b36c1-3410-4b96-878a-dbd54ace4e9a';
let callbackUrl = 'https://returnurl.com';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      amount: '',
      currency: 'EGP',
      cardHolderName: null,
      cardOnFile: false,
      orderId: null,
      threeDSecureId: null,
      creditCardFormValid: false,
      creditCardFormData: {},
    };

    this.onInitiateAuthenticationButtonPress =
      this.onInitiateAuthenticationButtonPress.bind(this);
    this.onPayerAuthenticationButtonPress =
      this.onPayerAuthenticationButtonPress.bind(this);
    this.onPayDirectButtonPress = this.onPayDirectButtonPress.bind(this);
    this.onRefundButtonPress = this.onRefundButtonPress.bind(this);

    this.onDataChange = this.onDataChange.bind(this);
    this.onPaymentSuccess = this.onPaymentSuccess.bind(this);
    this.onPaymentFailure = this.onPaymentFailure.bind(this);

  }
  componentDidMount() {
    this.setState({orderId: null});
  }
  handlePaymentDetails(key, value) {
    this.setState({[key]: value});
  }

  
  onInitiateAuthenticationButtonPress() {
    this.setState({isLoading: true});
    let initiateAuthenticationRequestBody =
      new InitiateAuthenticationRequestBody(
        this.state.amount,
        this.state.currency,
        this.state.creditCardFormData.number.replace(/\s+/g, ''),
        {
          callbackUrl: callbackUrl,
          cardOnFile: this.state.cardOnFile,
        },
      );
    console.log(initiateAuthenticationRequestBody.paramsMap());

    GeideaApi.initiateAuthentication(
      initiateAuthenticationRequestBody,
      publicKey,
      apiPassword,
    )
      .then(res => {
        console.log(res);
        this.state.orderId = res.orderId;
        this.showToast(res.detailedResponseMessage);
        this.setState({isLoading: false});
      })
      .catch(err => {
        this.showToast(err, 'error');
        this.setState({isLoading: false});
      });
  }
  onPayerAuthenticationButtonPress() {
    let expireDate = this.state.creditCardFormData.expiry.replace(/\s+/g, '');
    var monthYear = expireDate.split('/');
    let exDate = new expiryDate(monthYear[0], monthYear[1]);
    let card = new PaymentCard(
      this.state.creditCardFormData.name.replace(/\s+/g, ''),
      this.state.creditCardFormData.number.replace(/\s+/g, ''),
      this.state.creditCardFormData.cvc.replace(/\s+/g, ''),
      exDate,
    );
    this.setState({isLoading: true});
    let payerAuthenticationRequestBody = new PayerAuthenticationRequestBody(
      this.state.amount,
      this.state.currency,
      card,
      this.state.orderId,
      {
        callbackUrl: callbackUrl,
        cardOnFile: this.state.cardOnFile,
      },
    );
    console.log(payerAuthenticationRequestBody.paramsMap());

    GeideaApi.payerAuthentication(
      payerAuthenticationRequestBody,
      publicKey,
      apiPassword,
      this.props.navigation,
    )
      .then(res => {
        console.log(res);
        this.state.threeDSecureId = res.threeDSecureId;
        this.showToast(res.detailedResponseMessage);
        this.setState({isLoading: false});
      })
      .catch(err => {
        this.setState({isLoading: false});
        this.showToast(err, 'error');
        console.log(err);
      });
  }

  onPayDirectButtonPress() {
    this.setState({isLoading: true});
    let expireDate = this.state.creditCardFormData.expiry.replace(/\s+/g, '');
    var monthYear = expireDate.split('/');
    let exDate = new expiryDate(monthYear[0], monthYear[1]);
    let card = new PaymentCard(
      this.state.creditCardFormData.name.replace(/\s+/g, ''),
      this.state.creditCardFormData.number.replace(/\s+/g, ''),
      this.state.creditCardFormData.cvc.replace(/\s+/g, ''),
      exDate,
    );
    let payDirectRequestBody = new PayDirectRequestBody(
      this.state.threeDSecureId,
      this.state.orderId,
      this.state.amount,
      this.state.currency,
      card,
      // {
      //   paymentOperation: 'Sale',
      // },
    );
    console.log(payDirectRequestBody.paramsMap());

    GeideaApi.payDirect(payDirectRequestBody, publicKey, apiPassword)
      .then(res => {
        console.log(res);
        this.showToast(res.detailedResponseMessage);
        this.setState({isLoading: false});
      })
      .catch(err => {
        this.setState({isLoading: false});
        this.showToast(err, 'error');
      });
  }


  componentDidUpdate(prevProps) {
    if (
      this.props.route.params != null &&
      prevProps.route.params?.successResponse !==
        this.props.route.params?.successResponse
    ) {
      const result = this.props.route.params?.successResponse;
      this.onPaymentSuccess(result);
    } else if (
      this.props.route.params != null &&
      prevProps.route.params?.failureResponse !==
        this.props.route.params?.failureResponse
    ) {
      const result = this.props.route.params?.failureResponse;
      this.onPaymentFailure(result);
    }
  }

  onRefundButtonPress() {
    this.setState({isLoading: true});
    let refundRequestBody = new RefundRequestBody(this.state.orderId);
    console.log(refundRequestBody.paramsMap());

    GeideaApi.refund(refundRequestBody, publicKey, apiPassword)
      .then(res => {
        console.log(res);
        this.showToast(res.detailedResponseMessage);
        this.setState({isLoading: false});
      })
      .catch(err => {
        this.setState({isLoading: false});
        this.showToast(err, 'error');
      });
  }

  renderApiButton(label, onPress) {
    const {isLoading} = this.state;
    return <Button disabled={isLoading} onPress={onPress} title={label} />;
  }

  showToast(message, type = 'success') {
    Toast.show({
      type: type,
      text1: type,
      text2: message,
      position: 'bottom',
    });
  }

  LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  onDataChange(form) {
    this.setState({creditCardFormValid: form.valid});
    this.setState({creditCardFormData: form.values});
  }

  onPaymentSuccess(response) {
    this.setState({isLoading: false});
    console.log(response);
    this.showToast(response.detailedResponseMessage);
  }
  onPaymentFailure(response) {
    this.setState({isLoading: false});
    this.showToast(response, 'error');
  }
  renderCreditCardForm() {
    return (
      <View>
        <CreditCard onChange={this.onDataChange} />
        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
              marginVertical: 10,
              marginHorizontal: 20
            },
          ]}>
          <TextInput
            label="Amount*"
            style={{flex: 4, marginRight: 10, backgroundColor: '#fff'}}
            dense={true}
            onChangeText={this.handlePaymentDetails.bind(this, 'amount')}
            defaultValue={this.state.amount}
          />
          <TextInput
            label="Currency"
            style={{flex: 2, backgroundColor: '#fff'}}
            dense={true}
            onChangeText={this.handlePaymentDetails.bind(this, 'currency')}
            defaultValue={this.state.currency}
          />
        </View>
      </View>
    );
  }

  render() {
    const {orderId, threeDSecureId, isLoading, creditCardFormValid, amount} =
      this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="red" barStyle="light-content" />
        <ScrollView>
          {this.renderCreditCardForm()}
          {isLoading != null && isLoading ? this.LoadingIndicatorView() : null}
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              disabled={isLoading || !creditCardFormValid || amount === ''}
              onPress={this.onInitiateAuthenticationButtonPress}
              title={'Initiate Authentication'}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              disabled={isLoading || orderId == null}
              onPress={this.onPayerAuthenticationButtonPress}
              title={'Payer Authentication'}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              disabled={isLoading || orderId == null || threeDSecureId == null}
              onPress={this.onPayDirectButtonPress}
              title={'Pay Direct'}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              disabled={isLoading || orderId == null || threeDSecureId == null}
              onPress={this.onRefundButtonPress}
              title={'Refund'}
            />
          </View>
        </ScrollView>
        <Toast />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 50,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#356bca',
    borderRadius: 5,
    padding: 20,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  textField: {
    flex: 1,
    marginTop: 24,
  },
});

export default HomeScreen;
