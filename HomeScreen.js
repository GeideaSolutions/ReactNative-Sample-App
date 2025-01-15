import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  BackHandler,
  Alert,
  NativeModules,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Address from "react_geideapay/models/adress";
import EncryptedStorage from "react-native-encrypted-storage";
import JailMonkey from "jail-monkey";

const { FridaCheckModule } = NativeModules;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "",
      code: "+",
      callbackUrl: "",
      publicKey: "",
      apiPassword: "",
      showEmail: false,
      billingAddress: new Address(),
      shippingAddress: new Address(),
      showBilling: false,
      hideLogo: false,
      showReceipt: false,
      customerEmail: "",
      phoneNumber: "",
      headerColor: "#FFFFFF",
      showPhone: false,
      merchantReferenceID: "",
      lang: "English",
      sameAddress: true,
    };
    this.onScreenPaymentButtonPress =
      this.onScreenPaymentButtonPress.bind(this);
  }

  componentDidMount() {
    // this.setDefaultState();
    // this.clearAsyncStorageValues();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonPress
    );
  }

  clearAsyncStorageValues = async () => {
    try {
      await EncryptedStorage.removeItem("showEmail");
      await EncryptedStorage.removeItem("showBilling");
      await EncryptedStorage.removeItem("hideLogo");
      await EncryptedStorage.removeItem("showReceipt");
      await EncryptedStorage.removeItem("showPhone");
      await EncryptedStorage.removeItem("sameAddress");
      await EncryptedStorage.removeItem("publicKey");
      await EncryptedStorage.removeItem("apiPassword");
      await EncryptedStorage.removeItem("currency");
      await EncryptedStorage.removeItem("code");
      await EncryptedStorage.removeItem("callbackUrl");
      await EncryptedStorage.removeItem("customerEmail");
      await EncryptedStorage.removeItem("phoneNumber");
      await EncryptedStorage.removeItem("headerColor");
      await EncryptedStorage.removeItem("merchantReferenceID");
      await EncryptedStorage.removeItem("lang");
      await EncryptedStorage.removeItem("billingAddress");
      await EncryptedStorage.removeItem("shippingAddress");
    } catch (error) {
      console.log("Error clearing EncryptedStorage values:", error);
    }
  };

  setDefaultState = () => {
    this.setState({
      currency: "",
      code: "+",
      callbackUrl: "",
      publicKey: "",
      apiPassword: "",
      showEmail: false,
      billingAddress: new Address(),
      shippingAddress: new Address(),
      showBilling: false,
      hideLogo: false,
      showReceipt: false,
      customerEmail: "",
      phoneNumber: "",
      headerColor: "#FFFFFF",
      showPhone: false,
      merchantReferenceID: "",
      lang: "English",
      returnUrl: "",
      sameAddress: true,
    });
  };

  componentDidUpdate(prevProps) {
    const { shouldTriggerPaymentButton } = this.props.route.params || {};

    if (
      shouldTriggerPaymentButton &&
      shouldTriggerPaymentButton !==
        prevProps.route.params?.shouldTriggerPaymentButton
    ) {
      this.props.navigation.setParams({ shouldTriggerPaymentButton: false });
      this.onScreenPaymentButtonPress();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonPress
    );
  }

  componentDidMount() {
    this.checkForFrida();
  }

  checkForFrida = async () => {
    try {
      const isFridaDetected = await FridaCheckModule.isFridaDetected();
      if (isFridaDetected) {
        Alert.alert(
          "Security Alert",
          "Frida detected! The app will now close."
        );
        // Close the app
        BackHandler.exitApp();
      }
      return isFridaDetected;
    } catch (error) {
      console.error("Error checking for Frida:", error);
      return false; // Optionally return false in case of an error
    }
  };

  handleCloseButtonPress = () => {
    BackHandler.exitApp(); // Exit the app
  };

  checkRootStatus = async () => {
    const isDebuggedMode = await JailMonkey.isDebuggedMode(); // Await the promise
    const isJailBroken =
      JailMonkey.isOnExternalStorage() ||
      JailMonkey.isJailBroken() ||
      JailMonkey.trustFall() ||
      isDebuggedMode ||
      JailMonkey.canMockLocation();
    return isJailBroken;
  };
  onScreenCheckoutButtonPress = async () => {
    const isFridaDetected = await this.checkForFrida();
    if (isFridaDetected) {
      Alert.alert("FRIDA is Detected");
      console.log("FRIDA is Detected");
      return;
    }
    const isDeviceRootedOrJailBreak = await this.checkRootStatus();

    if (isDeviceRootedOrJailBreak) {
      Alert.alert("Device is Rooted/JailBroken");
      console.log("Device is Rooted/JailBroken");
      return;
    }
    this.props.navigation.push("CheckoutFlow", {
      navigateToPaymentModal: false,
    });
  };
  onScreenPaymentButtonPress = async () => {
    const isFridaDetected = await this.checkForFrida();
    if (isFridaDetected) {
      Alert.alert("FRIDA is Detected");
      console.log("FRIDA is Detected");
      return;
    }
    const isDeviceRootedOrJailBreak = await this.checkRootStatus();

    if (isDeviceRootedOrJailBreak) {
      Alert.alert("Device is Rooted/JailBroken");
      console.log("Device is Rooted/JailBroken");
      return;
    }
    const { navigation } = this.props;

    const showEmailString = await EncryptedStorage.getItem("showEmail");
    const showEmail = showEmailString === "true";

    const showBillingString = await EncryptedStorage.getItem("showBilling");
    const showBilling = showBillingString === "true";

    const hideLogoString = await EncryptedStorage.getItem("hideLogo");
    const hideLogo = hideLogoString === "true";

    const showReceiptString = await EncryptedStorage.getItem("showReceipt");
    const showReceipt = showReceiptString === "true";

    const showPhoneString = await EncryptedStorage.getItem("showPhone");
    const showPhone = showPhoneString === "true";

    const sameAddressString = await EncryptedStorage.getItem("sameAddress");
    const sameAddress = sameAddressString === "true";

    let lang = await EncryptedStorage.getItem("lang");
    lang = lang === null ? "English" : lang;

    navigation.push("PaymentComponent", {
      navigateToPaymentModal: true,
      token: await EncryptedStorage.getItem("token"),
      publicKey: await EncryptedStorage.getItem("publicKey"),
      apiPassword: await EncryptedStorage.getItem("apiPassword"),
      currency: await EncryptedStorage.getItem("currency"),
      code: await EncryptedStorage.getItem("code"),
      callbackUrl: await EncryptedStorage.getItem("callbackUrl"),
      returnUrl: await EncryptedStorage.getItem("returnUrl"),
      showEmail: showEmail,
      billingAddress: JSON.parse(
        await EncryptedStorage.getItem("billingAddress")
      ),
      shippingAddress: JSON.parse(
        await EncryptedStorage.getItem("shippingAddress")
      ),
      initiatedBy: await EncryptedStorage.getItem("initiatedBy"),
      showBilling: showBilling,
      hideLogo: hideLogo,
      showReceipt: showReceipt,
      customerEmail: await EncryptedStorage.getItem("customerEmail"),
      phoneNumber:
        (await EncryptedStorage.getItem("phoneNumber")) === null
          ? ""
          : await EncryptedStorage.getItem("phoneNumber"),
      headerColor: await EncryptedStorage.getItem("headerColor"),
      showPhone: showPhone,
      merchantReferenceID: await EncryptedStorage.getItem(
        "merchantReferenceID"
      ),
      lang: lang,
      sameAddress: sameAddress,
      selectedEnvironment: await EncryptedStorage.getItem(
        "selectedEnvironment"
      ),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.handleCloseButtonPress}
        >
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
                onPress={this.onScreenCheckoutButtonPress}
              >
                <Text style={styles.buttonText}>Configuration</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.onScreenPaymentButtonPress}
              >
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
    justifyContent: "center",
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
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#ff4500",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },

  closeButton: {
    position: "absolute",
    top: -180,
    right: 16,
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    zIndex: 1,
  },
  closeButtonText: {
    color: "black",
    marginBottom: 4,
  },
  closeButtonIcon: {
    marginTop: 4,
    color: "black",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  textField: {
    flex: 1,
    marginTop: 24,
  },
  TextInput: {
    margin: 16,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
