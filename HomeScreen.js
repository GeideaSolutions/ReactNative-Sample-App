import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Address from 'react_geideapay/models/adress';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: '',
      code: '+',
      callbackUrl: '',
      publicKey: '',
      apiPassword: '',
      showEmail: false,
      billingAddress: new Address(),
      shippingAddress: new Address(),
      showBilling: false,
      hideLogo: false,
      showReceipt: false,
      customerEmail: '',
      phoneNumber: '',
      headerColor: '#FFFFFF',
      showPhone: false,
      merchantReferenceID: '',
      lang: 'English',
      sameAddress: true,
    };
    this.onScreenPaymentButtonPress =
      this.onScreenPaymentButtonPress.bind(this);
  }

  componentDidMount() {
    this.setDefaultState();
    this.clearAsyncStorageValues();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPress,
    );
  }

  clearAsyncStorageValues = async () => {
    try {
      await AsyncStorage.removeItem('showEmail');
      await AsyncStorage.removeItem('showBilling');
      await AsyncStorage.removeItem('hideLogo');
      await AsyncStorage.removeItem('showReceipt');
      await AsyncStorage.removeItem('showPhone');
      await AsyncStorage.removeItem('sameAddress');
      await AsyncStorage.removeItem('publicKey');
      await AsyncStorage.removeItem('apiPassword');
      await AsyncStorage.removeItem('currency');
      await AsyncStorage.removeItem('code');
      await AsyncStorage.removeItem('callbackUrl');
      await AsyncStorage.removeItem('customerEmail');
      await AsyncStorage.removeItem('phoneNumber');
      await AsyncStorage.removeItem('headerColor');
      await AsyncStorage.removeItem('merchantReferenceID');
      await AsyncStorage.removeItem('lang');
      await AsyncStorage.removeItem('billingAddress');
      await AsyncStorage.removeItem('shippingAddress');
    } catch (error) {
      console.log('Error clearing AsyncStorage values:', error);
    }
  };

  setDefaultState = () => {
    this.setState({
      currency: '',
      code: '+',
      callbackUrl: '',
      publicKey: '',
      apiPassword: '',
      showEmail: false,
      billingAddress: new Address(),
      shippingAddress: new Address(),
      showBilling: false,
      hideLogo: false,
      showReceipt: false,
      customerEmail: '',
      phoneNumber: '',
      headerColor: '#FFFFFF',
      showPhone: false,
      merchantReferenceID: '',
      lang: 'English',
      returnUrl:'',
      sameAddress: true,
    });
  };

  componentDidUpdate(prevProps) {
    const { shouldTriggerPaymentButton } = this.props.route.params || {};
  
    if (shouldTriggerPaymentButton && shouldTriggerPaymentButton !== prevProps.route.params?.shouldTriggerPaymentButton) {
      this.props.navigation.setParams({ shouldTriggerPaymentButton: false });
      this.onScreenPaymentButtonPress();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonPress,
    );
  }

  handleCloseButtonPress = () => {
    BackHandler.exitApp(); // Exit the app
  };

  onScreenCheckoutButtonPress = () => {
    this.props.navigation.push('CheckoutFlow', {
      navigateToPaymentModal: false,
    });
  };
  onScreenPaymentButtonPress = async () => {
    const {navigation} = this.props;

    const showEmailString = await AsyncStorage.getItem('showEmail');
    const showEmail = showEmailString === 'true';

    const showBillingString = await AsyncStorage.getItem('showBilling');
    const showBilling = showBillingString === 'true';

    const hideLogoString = await AsyncStorage.getItem('hideLogo');
    const hideLogo = hideLogoString === 'true';

    const showReceiptString = await AsyncStorage.getItem('showReceipt');
    const showReceipt = showReceiptString === 'true';

    const showPhoneString = await AsyncStorage.getItem('showPhone');
    const showPhone = showPhoneString === 'true';

    const sameAddressString = await AsyncStorage.getItem('sameAddress');
    const sameAddress = sameAddressString === 'true';

    let lang = await AsyncStorage.getItem('lang');
    lang = lang === null?'English':lang;

    navigation.push('PaymentComponent', {
      navigateToPaymentModal: true,
      token: await AsyncStorage.getItem('token'),
      publicKey: await AsyncStorage.getItem('publicKey'),
      apiPassword: await AsyncStorage.getItem('apiPassword'),
      currency: await AsyncStorage.getItem('currency'),
      code: await AsyncStorage.getItem('code'),
      callbackUrl: await AsyncStorage.getItem('callbackUrl'),
      returnUrl: await AsyncStorage.getItem('returnUrl'),
      showEmail: showEmail,
      billingAddress: JSON.parse(await AsyncStorage.getItem('billingAddress')),
      shippingAddress: JSON.parse(
        await AsyncStorage.getItem('shippingAddress'),
      ),
      initiatedBy: await AsyncStorage.getItem('initiatedBy'),
      showBilling: showBilling,
      hideLogo: hideLogo,
      showReceipt: showReceipt,
      customerEmail: await AsyncStorage.getItem('customerEmail'),
      phoneNumber: await AsyncStorage.getItem('phoneNumber')===null?'': await AsyncStorage.getItem('phoneNumber'),
      headerColor: await AsyncStorage.getItem('headerColor'),
      showPhone: showPhone,
      merchantReferenceID: await AsyncStorage.getItem('merchantReferenceID'),
      lang: lang,
      sameAddress: sameAddress,
      selectedEnvironment: await AsyncStorage.getItem('selectedEnvironment'),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.handleCloseButtonPress}>
          <Text style={styles.closeButtonText}>App Close</Text>
          <Icon
            name="times"
            size={40}
            color="red"
            style={styles.closeButtonIcon}
          />
        </TouchableOpacity>

        <StatusBar backgroundColor="red" barStyle="light-content" />
        <ScrollView>
          <View style={styles.row}>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.onScreenCheckoutButtonPress}>
                <Text style={styles.buttonText}>Configuration</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.onScreenPaymentButtonPress}>
                <Text style={styles.buttonText}>
                  Card Payment (Geidea SDK, Merchant PCI-DSS)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    flex: 1,
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#ff4500',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },

  closeButton: {
    position: 'absolute',
    top: -180,
    right: 16,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'black',
    marginBottom: 4,
  },
  closeButtonIcon: {
    marginTop: 4,
    color: 'black',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  textField: {
    flex: 1,
    marginTop: 24,
  },
  TextInput: {
    margin: 16,
    backgroundColor: '#fff',
  },
});

export default HomeScreen