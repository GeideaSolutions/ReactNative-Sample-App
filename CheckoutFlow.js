import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  StatusBar,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import RadioGroup from 'react-native-radio-buttons-group';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Address from 'react_geideapay/models/adress';
import AsyncStorage from '@react-native-async-storage/async-storage';

const paymentOperations = [
  'Default (merchant configuration)',
  'Pay',
  'PreAuthorize',
  'AuthorizeCapture',
];
const initiatedByOptions = ['Internet', 'Merchant'];
const agreementTypes = ['None', 'Recurring', 'Installment', 'Unscheduled'];

const langOptions = [
  {
    id: '1',
    label: 'English',
    value: 'English',
    selected: true,
  },
  {
    id: '2',
    label: 'Arabic',
    value: 'Arabic',
  },
];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: '',
      apiPassword: '',
      isProdSelected: true,
      isTestSelected: false,
      isLoading: false,
      currency: '',
      code: '+',
      merchantReferenceID: '',
      customerEmail: '',
      phoneNumber: '',
      headerColor: '#FFFFFF',
      callbackUrl: '',
      returnUrl: '',
      checkoutVisible: false,
      cardHolderName: null,
      cardOnFile: false,
      orderId: null,
      threeDSecureId: null,
      creditCardFormValid: false,
      creditCardFormData: {},
      sameAddress: true,
      //payment details
      paymentOperation: paymentOperations[0],
      initiatedBy: initiatedByOptions[0],
      agreementType: agreementTypes[0],
      paymentIntentID: '',
      hideLogo: false,
      //show Email
      showEmail: false,
      //show Receipt
      showReceipt: false,
      //show phone
      showPhone: false,
      //show addresses
      showBilling: false,
      //language
      lang: 'English',
      billingAddress: new Address(),
      shippingAddress: new Address(),
    };

    this.closePaymentModal = this.closePaymentModal.bind(this);
    this.onPaymentSuccess = this.onPaymentSuccess.bind(this);
    this.onPaymentFailure = this.onPaymentFailure.bind(this);
    this.handlePaymentDetails = this.handlePaymentDetails.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onProdPress = this.onProdPress.bind(this);
    this.onTestPress = this.onTestPress.bind(this);
    this.onSavePress = this.onSavePress.bind(this);
    this.onClearPress = this.onClearPress.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.route.params != null &&
      this.props.route.params?.successResponse != null &&
      this.props.route.params?.successResponse !== '' &&
      (prevProps.route.params?.successResponse == null ||
        prevProps.route.params?.successResponse !==
          this.props.route.params?.successResponse)
    ) {
      const result = this.props.route.params?.successResponse;
      this.onPaymentSuccess(result);
      this.props.route.params.successResponse = '';
    } else if (
      this.props.route.params != null &&
      this.props.route.params?.failureResponse != null &&
      this.props.route.params?.failureResponse !== '' &&
      (prevProps.route.params?.failureResponse == null ||
        prevProps.route.params?.failureResponse !==
          this.props.route.params?.failureResponse)
    ) {
      const result = this.props.route.params?.failureResponse;
      this.onPaymentFailure(result);
      this.props.route.params.failureResponse = '';
    }
  }

  componentDidMount = async () => {
    this.setState({orderId: null});
    try {
      // Retrieve values from AsyncStorage
      const publicKey = await AsyncStorage.getItem('publicKey');
      const apiPassword = await AsyncStorage.getItem('apiPassword');
      const currency = await AsyncStorage.getItem('currency');
      const showEmailString = await AsyncStorage.getItem('showEmail');
      const billingAddressString = await AsyncStorage.getItem('billingAddress');
      const shippingAddressString = await AsyncStorage.getItem(
        'shippingAddress',
      );
      const showBillingString = await AsyncStorage.getItem('showBilling');
      const hideLogoString = await AsyncStorage.getItem('hideLogo');
      const showReceiptString = await AsyncStorage.getItem('showReceipt');
      const customerEmail = await AsyncStorage.getItem('customerEmail');
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      const headerColor = await AsyncStorage.getItem('headerColor');
      const showPhoneString = await AsyncStorage.getItem('showPhone');
      const sameAddressString = await AsyncStorage.getItem('sameAddress');
      const merchantReferenceID = await AsyncStorage.getItem(
        'merchantReferenceID',
      );
      const lang = await AsyncStorage.getItem('lang');
      const callbackUrl = await AsyncStorage.getItem('callbackUrl');
      const returnUrl = await AsyncStorage.getItem('returnUrl');
      const code = await AsyncStorage.getItem('code');

      // Convert string values to their appropriate types
      const showEmail = showEmailString === 'true';
      const showBilling = showBillingString === 'true';
      const hideLogo = hideLogoString === 'true';
      const showReceipt = showReceiptString === 'true';
      const showPhone = showPhoneString === 'true';
      const sameAddress =
        sameAddressString === null || sameAddressString === 'true';

      // Update component state
      this.setState({
        publicKey: publicKey || '',
        apiPassword: apiPassword || '',
        currency: currency || '',
        showEmail: showEmail || false,
        billingAddress: JSON.parse(billingAddressString) || new Address(),
        shippingAddress: JSON.parse(shippingAddressString) || new Address(),
        showBilling: showBilling || false,
        hideLogo: hideLogo || false,
        showReceipt: showReceipt || false,
        customerEmail: customerEmail || '',
        phoneNumber: phoneNumber || '',
        headerColor: headerColor || '#FFFFFF',
        showPhone: showPhone || false,
        merchantReferenceID: merchantReferenceID || '',
        lang: lang || 'English',
        sameAddress: sameAddress,
        callbackUrl: callbackUrl || '',
        returnUrl: returnUrl || '',
        code: code || '+',
      });
    } catch (error) {
      console.log('Error retrieving values:', error);
    }
  };

  onProdPress() {
    this.setState({
      isProdSelected: true,
      isTestSelected: false,
    });
  }

  onTestPress() {
    this.setState({
      isProdSelected: false,
      isTestSelected: true,
    });
  }

  onSavePress = async () => {
    this.setState({
      publicKey: this.state.publicKey,
      apiPassword: this.state.apiPassword,
    });
    try {
      await AsyncStorage.setItem('publicKey', this.state.publicKey);
      await AsyncStorage.setItem('apiPassword', this.state.apiPassword);
      Alert.alert('Values saved successfully');
    } catch (error) {
      console.log('Error saving values:', error);
      Alert.alert('An error occurred while saving values');
    }
  };

  onClearPress() {
    this.setState({
      publicKey: '',
      apiPassword: '',
    });
  }

  onAddressChange(key, isBilling, value) {
    if (isBilling) {
      const billingAddress = {...this.state.billingAddress, [key]: value};
      const shippingAddress = {...this.state.billingAddress, [key]: value};
      this.setState({billingAddress});
      this.setState({shippingAddress});
    } else {
      const shippingAddress = {...this.state.shippingAddress, [key]: value};
      this.setState({shippingAddress});
    }
  }

  handlePaymentDetails(key, value) {
    this.setState({[key]: value});
  }

  closePaymentModal() {
    this.setState({checkoutVisible: false});
  }

  showToast(message, type = 'success') {
    Toast.show({
      type: type,
      text1: type,
      text2: message,
      position: 'bottom',
    });
  }

  onPaymentSuccess(response) {
    this.setState({isLoading: false});
    this.showToast(response.detailedResponseMessage);
  }
  onPaymentFailure(response) {
    this.setState({isLoading: false});
    this.showToast(response, 'error');
  }

  validateInput(inputName) {
    const input = this.state[inputName];
    if (inputName === 'phoneNumber') {
      const phoneRegex = /^\d{10}$/; // 10 digit phone number
      if (!phoneRegex.test(input)) {
        Alert.alert(
          'Invalid phone number',
          'Please enter a valid phone number.',
        );
      }
    } else if (inputName === 'customerEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        Alert.alert('Invalid email', 'Please enter a valid email address.');
      }
    } else if (inputName === 'headerColor') {
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!hexRegex.test(input)) {
        Alert.alert(
          'Invalid hex color',
          'Valid formats include: #123456, #FFF, #A0A0A0, etc.',
        );
      }
    }
  }

  renderTextInputRow(label, varName, defaultValue) {
    return (
      <TextInput
        label={label}
        style={
          varName === 'code'
            ? styles.codeContainer
            : styles.phoneNumberContainer
        }
        mode="outlined"
        dense={true}
        key={varName}
        onChangeText={text => {
          this.handlePaymentDetails(varName, text);
        }}
        onBlur={this.validateInput.bind(this, varName)}
        value={defaultValue}
      />
    );
  }

  renderAddressTextInputRow(label, varName, defaultValue, isBilling) {
    return (
      <TextInput
        label={label}
        style={styles.TextInputRow}
        mode="outlined"
        dense={true}
        onChangeText={text => {
          this.onAddressChange(varName, isBilling, text);
        }}
        value={defaultValue}
      />
    );
  }

  renderEndpoints() {
    return (
      <View>
        {this.renderTextInputRow(
          'Callback URL',
          'callbackUrl',
          this.state.callbackUrl,
        )}
        {this.renderTextInputRow(
          'Return URL',
          'returnUrl',
          this.state.returnUrl,
        )}
      </View>
    );
  }
  rendercustomerDetails() {
    return (
      <View>
        {this.renderTextInputRow(
          'Customer Email',
          'customerEmail',
          this.state.customerEmail,
        )}
        <View style={styles.rowContainer}>
          {this.renderTextInputRow('Code', 'code', this.state.code)}
          {this.renderTextInputRow(
            'Phone Number',
            'phoneNumber',
            this.state.phoneNumber,
          )}
        </View>
      </View>
    );
  }

  renderOrderDetails() {
    return (
      <View>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
            },
          ]}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 15,
              marginRight: 20,
              color: 'black',
            }}>
            Currency
          </Text>
          <TextInput
            label=""
            style={{flex: 4, marginRight: 10, backgroundColor: '#fff'}}
            mode="outlined"
            dense={true}
            onChangeText={this.handlePaymentDetails.bind(this, 'currency')}
            placeholder="Add ISO Alpha-3 Code"
            value={this.state.currency}
          />
        </View>
      </View>
    );
  }

  renderBillingAddressDetails(isBilling) {
    return (
      <View>
        {this.renderAddressTextInputRow(
          'Street Name & Number',
          '_street',
          isBilling
            ? this.state.billingAddress._street
            : this.state.shippingAddress._street,
          isBilling,
        )}
        {this.renderAddressTextInputRow(
          'Country Code',
          '_countryCode',
          isBilling
            ? this.state.billingAddress._countryCode
            : this.state.shippingAddress._countryCode,
          isBilling,
        )}
        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
              marginVertical: 10,
            },
          ]}>
          <TextInput
            label="City"
            style={{flex: 3, marginRight: 10, backgroundColor: '#fff'}}
            mode="outlined"
            dense={true}
            onChangeText={text => {
              this.onAddressChange('_city', isBilling, text);
            }}
            value={
              isBilling
                ? this.state.billingAddress._city
                : this.state.shippingAddress._city
            }
          />
          <TextInput
            label="Post Code"
            style={{flex: 3, backgroundColor: '#fff'}}
            mode="outlined"
            dense={true}
            onChangeText={text => {
              this.onAddressChange('_postCode', isBilling, text);
            }}
            value={
              isBilling
                ? this.state.billingAddress._postCode
                : this.state.shippingAddress._postCode
            }
          />
        </View>
      </View>
    );
  }

  renderSdkLanguage() {
    return (
      <View style={styles.row}>
        <RadioGroup
          radioButtons={langOptions}
          layout="column"
          onPress={options =>
            options.forEach(option => {
              if (option.selected) {
                this.setState({lang: option.value});
              }
            })
          }
        />
      </View>
    );
  }

  onSave = async () => {
    try {
      // Convert boolean values to strings
      const publicKey = await AsyncStorage.getItem('publicKey');
      const apiPassword = await AsyncStorage.getItem('apiPassword');
      const showEmailString = this.state.showEmail.toString();
      const showBillingString = this.state.showBilling.toString();
      const hideLogoString = this.state.hideLogo.toString();
      const showReceiptString = this.state.showReceipt.toString();
      const showPhoneString = this.state.showPhone.toString();
      const sameAddressString = this.state.sameAddress.toString();

      await AsyncStorage.setItem('currency', this.state.currency);
      await AsyncStorage.setItem('showEmail', showEmailString);
      await AsyncStorage.setItem(
        'billingAddress',
        JSON.stringify(this.state.billingAddress),
      );
      await AsyncStorage.setItem(
        'shippingAddress',
        JSON.stringify(this.state.shippingAddress),
      );
      await AsyncStorage.setItem('showBilling', showBillingString);
      await AsyncStorage.setItem('hideLogo', hideLogoString);
      await AsyncStorage.setItem('showReceipt', showReceiptString);
      await AsyncStorage.setItem('customerEmail', this.state.customerEmail);
      await AsyncStorage.setItem('phoneNumber', this.state.phoneNumber);
      await AsyncStorage.setItem('headerColor', this.state.headerColor);
      await AsyncStorage.setItem('showPhone', showPhoneString);
      await AsyncStorage.setItem(
        'merchantReferenceID',
        this.state.merchantReferenceID,
      );
      await AsyncStorage.setItem('lang', this.state.lang);
      await AsyncStorage.setItem('sameAddress', sameAddressString);
      await AsyncStorage.setItem('callbackUrl', this.state.callbackUrl);
      await AsyncStorage.setItem('returnUrl', this.state.returnUrl);
      await AsyncStorage.setItem('code', this.state.code);

      Alert.alert('Values saved successfully');
      

      await AsyncStorage.setItem(
        'triggerPaymentButton',
        publicKey && apiPassword ? 'true' : 'false',
      );

      this.props.navigation.navigate('Home', {
        shouldTriggerPaymentButton: publicKey && apiPassword,
      });

    } catch (error) {
      console.log('Error saving values:', error);
      Alert.alert('An error occurred while saving values');
    }
  };

  renderCheckoutOptions() {
    const {showBilling, showEmail, hideLogo, showPhone, showReceipt} =
      this.state;
    return (
      <View>
        <View style={styles.row}>
          <View style={styles.CheckBox}>
            <CheckBox
              value={showReceipt}
              onValueChange={val => {
                this.setState({showReceipt: val});
              }}
            />
            <Text>Show Receipt</Text>
          </View>
          <View style={styles.CheckBox}>
            <CheckBox
              value={showEmail}
              onValueChange={val => {
                this.setState({showEmail: val});
              }}
            />
            <Text>Show Email</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.CheckBox}>
            <CheckBox
              value={showBilling}
              onValueChange={val => {
                this.setState({showBilling: val});
              }}
            />
            <Text>Show Address</Text>
          </View>
          <View style={styles.CheckBox}>
            <CheckBox
              value={showPhone}
              onValueChange={val => {
                this.setState({showPhone: val});
              }}
            />
            <Text>Show Phone</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.CheckBox}>
            <CheckBox
              value={hideLogo}
              onValueChange={val => {
                this.setState({hideLogo: val});
              }}
            />
            <Text>Hide Geidea logo</Text>
          </View>
        </View>
        {this.renderTextInputRow(
          'Merchant Reference ID',
          'merchantReferenceID',
          this.state.merchantReferenceID,
        )}
        {this.renderDropDown('initiatedBy', initiatedByOptions)}
      </View>
    );
  }

  renderDropDown(varName, options) {
    let placeholderText = '';
    if (varName === 'initiatedBy') {
      placeholderText = 'Initiated By';
    } else {
      placeholderText = options[0];
    }
    return (
      <View style={{marginVertical: 10}}>
        <SelectDropdown
          data={options}
          onSelect={(selectedItem, index) => {
            if (varName === 'paymentOperation') {
              this.setState({paymentOperation: selectedItem});
            }
            if (varName === 'initiatedBy') {
              this.setState({initiatedBy: selectedItem});
            }
            if (varName === 'agreementType') {
              this.setState({agreementType: selectedItem});
            }
          }}
          defaultButtonText={placeholderText}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>
    );
  }

  renderPaymentOptions() {
    return (
      <View>
        {this.renderDropDown('paymentOperation', paymentOperations)}
        {this.renderDropDown('initiatedBy', initiatedByOptions)}
        {this.renderDropDown('agreementType', agreementTypes)}
        {this.renderTextInputRow(
          'Payment Intent ID',
          'paymentIntentID',
          this.state.paymentIntentID,
        )}
        {this.renderTextInputRow(
          'Merchant Reference ID',
          'merchantReferenceID',
          this.state.merchantReferenceID,
        )}
      </View>
    );
  }

  renderAddress() {
    const {sameAddress} = this.state;
    return (
      <View>
        <Text style={styles.title}>Billing Address</Text>
        {this.renderBillingAddressDetails(true)}

        <View style={styles.CheckBox}>
          <CheckBox
            value={sameAddress}
            onValueChange={val => {
              this.setState({sameAddress: val});
              if (val) {
                this.setState({
                  shippingAddress: {...this.state.billingAddress},
                });
              }
            }}
          />
          <Text>Shipping address same as billing address</Text>
        </View>

        {sameAddress ? null : (
          <Text style={styles.title}>Shipping address</Text>
        )}
        {sameAddress ? null : this.renderBillingAddressDetails(false)}
      </View>
    );
  }

  render() {
    const {publicKey, apiPassword, isProdSelected, isTestSelected} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="red" barStyle="light-content" />
        <ScrollView style={{margin: 20}}>
          <Text style={styles.title}>Environment</Text>
          <View style={styles.row1}>
            <View
              style={[
                styles.buttonWrapper1,
                isProdSelected
                  ? styles.selectedButtonWrapper1
                  : styles.unselectedButtonWrapper1,
              ]}>
              <Button
                title="Prod"
                onPress={this.onProdPress}
                color={isProdSelected ? '#ff4500' : '#808080'}
              />
            </View>
            <View
              style={[
                styles.buttonWrapper1,
                isTestSelected
                  ? styles.selectedButtonWrapper1
                  : styles.unselectedButtonWrapper1,
              ]}>
              <Button
                title="Test"
                onPress={this.onTestPress}
                color={isTestSelected ? '#ff4500' : '#808080'}
              />
            </View>
          </View>

          {isProdSelected || isTestSelected ? (
            <View
              style={[
                styles.cont,
                isProdSelected && styles.selectedContainer,
                isTestSelected && styles.selectedContainer,
              ]}>
              <TextInput
                mode="outlined"
                label="Merchant Key"
                style={styles.TextInput1}
                value={publicKey}
                onChangeText={text => {
                  this.setState({publicKey: text});
                }}
              />
              <TextInput
                style={styles.TextInput1}
                mode="outlined"
                label="Api Password"
                value={apiPassword}
                onChangeText={text => {
                  this.setState({apiPassword: text});
                }}
              />

              <View style={styles.row1}>
                <View style={styles.buttonWrapper1}>
                  <TouchableOpacity
                    style={[
                      styles.button1,
                      !isProdSelected &&
                        !isTestSelected &&
                        styles.unselectedButton1,
                    ]}
                    onPress={this.onSavePress}>
                    <Text style={styles.buttonText1}>Save</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonWrapper1}>
                  <TouchableOpacity
                    style={[
                      styles.button1,
                      !isProdSelected &&
                        !isTestSelected &&
                        styles.unselectedButton1,
                    ]}
                    onPress={this.onClearPress}>
                    <Text style={styles.buttonText1}>Clear</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null}

          <Text style={styles.title}>Language</Text>
          {this.renderSdkLanguage()}

          <Text style={styles.title}>Payment details</Text>
          {this.renderOrderDetails()}

          <Text style={styles.title}>Endpoints</Text>
          {this.renderEndpoints()}

          <Text style={styles.title}>Payment options</Text>
          {this.renderCheckoutOptions()}

          <Text style={styles.title}>Customer Details (Checkout Screen)</Text>
          {this.rendercustomerDetails()}

          {this.renderAddress()}

          <View style={styles.row1}>
            <View style={styles.buttonWrapper1}>
              <TouchableOpacity style={[styles.button1]} onPress={this.onSave}>
                <Text style={styles.buttonText1}>Save</Text>
              </TouchableOpacity>
            </View>
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
  cont: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginTop: 0,
  },
  selectedContainer: {
    borderTopColor: '#ff4500',
    borderTopWidth: 10,
    borderWidth: 1,
    padding: 10,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonWrapper1: {
    flex: 1,
    marginRight: 5,
  },
  selectedButtonWrapper1: {
    backgroundColor: '#ff4500',
    borderRadius: 5,
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button1: {
    backgroundColor: '#ff4500',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  unselectedButtonWrapper1: {
    backgroundColor: '#ff4500',
  },
  buttonText1: {
    color: '#000',
  },
  unselectedButtonText1: {
    color: '#000',
  },
  unselectedButton1: {
    backgroundColor: '#ff4500',
  },
  TextInput1: {
    marginVertical: 10,
  },
  selectionButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff4500',
  },
  selectionButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  flexContainer: {
    backgroundColor: '#ff4500',
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ff4500',
    borderRadius: 5,
    padding: 20,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    marginHorizontal: 5,
    marginTop: 5,
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
  title: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  TextInputRow: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeContainer: {
    flex: 1,
    marginRight: 10,
  },
  phoneNumberContainer: {
    flex: 3,
    marginVertical: 10,
  },
  CheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginVertical: 10,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999',
  },
  dropdown1BtnTxtStyle: {color: '#888', textAlign: 'left', fontSize: 16},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});

export default HomeScreen;
