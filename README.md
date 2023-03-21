# Geidea React-Native Plugin

# Overview 	

The purpose of this Integration guide is to serve as technical documentation for merchants who wish to integrate the Geidea Payment plugin for React-native so that they can use Payment Gateway services in their application.

This guide describes the functionality and APIs provided by the plugin and different approaches to integrating the plugin and customizing it.


# Integration

Please install the prerequisites first, then you can either integrate the plugin using



1. **Simple **integration – The plugin hosts the entire UI flow and performs all transactions. A “turnkey” solution that requires minimal setup. You simply call a method to start the Payment flow and then receive your Order after everything is ready.  This can be done as
    1. **Payment modal**
    2. **Checkout screen**
2. **Custom** integration – the Merchant app hosts the entire UI flow (payment form, authentication) and performs all transactions by calling the Direct APIs through the plugin.


## Prerequisites

1 - Install the plugin in your React-native app with the following command


```
    npm install --save react-native-webview react-native-vector-icons
    react-native link react-native-webview
    react-native link react-native-vector-icons
    npm install GeideaSolutions/react_geideapay#main
```



## I. Simple integration

**<span style="text-decoration:underline;">A. Payment modal</span>**

1 - Import the required libraries


```
import PaymentModal from 'react_geideapay/components/PaymentModal';
```



    2 - Define a state variable to control the visibility of the payment modal


```
     state = {
       checkoutVisible: false,
     };
```



    3 - Define the following functions


```
    closePaymentModal() {
       this.setState({checkoutVisible: false});
    }
    onPaymentSuccess(response) {
    	//handle payment success response here
    }
    onPaymentFailure(response) {
    //handle payment error response here
    }
```



    4 - Implement the **<code>PaymentModal</code></strong> in your render function as follows


```
     render() {
       return 
    <View style={styles.container}>
        {this.renderPaymentModal()}
    </View>;
     }

     renderPaymentModal() {
       const {checkoutVisible} = this.state;
       return (
         <PaymentModal
           amount={200}
           visible={checkoutVisible}
           title="Example title"
           description="This is an example description text"
           currency="EGP"
           callbackUrl="https://callbackUrl.com"
           onRequestClose={this.closePaymentModal}
           publicKey={publicKey}
           apiPassword={apiPassword}
           onPaymentSuccess={this.onPaymentSuccess}
           onPaymentFailure={this.onPaymentFailure}
         />
       );
     }
```



    Then you can display the dialog by setting the `checkoutVisible `state to true as follows


```
this.setState({checkoutVisible: true});
```



    After this, you should get a modal dialog displayed

**<span style="text-decoration:underline;">B. Checkout screen</span>**

1 - Make sure that your app is ready for stack navigation as shown here <span style="text-decoration:underline;">https://reactnavigation.org/docs/native-stack-navigator.</span> An example of an app with a navigation stack is shown below


```
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import CheckoutScreen from 'react_geideapay/components/CheckoutScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
	<NavigationContainer>
  	<Stack.Navigator>
    	<Stack.Screen
      	name="Home"
      	component={HomeScreen}
      	options={{title: 'Geidea App'}}
    	/>
    	<Stack.Screen
      	name="CheckoutScreen"
      	component={CheckoutScreen}
      	options={({route}) => ({title: route.params.screenTitle})}
    	/>
  	</Stack.Navigator>
	</NavigationContainer>
  );
};
export default App;
```


 2 - Implement a function similar to the following to navigate to the checkout screen. 

```
      showScreenCheckout() {
    	this.props.navigation.push('CheckoutScreen', {
      	amount: 200,
      	screenTitle: 'Checkout',
          title="Example title"
          description="This is an example description text"
      	currency: 'EGP',
      	callbackUrl="https://callbackUrl.com",
      	publicKey: publicKey,
      	apiPassword: apiPassword,
      	successResponse: '',
      	failureResponse: '',
      	backgroundColor: '#fff',
      	cardColor: '#583e9e',
      	previousScreen: 'Home', // name as in the navigation stack	});
      }
```



After you call the above function, this, the app will navigate to the checkout screen 
