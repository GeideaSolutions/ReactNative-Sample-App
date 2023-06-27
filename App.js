/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import CheckoutFlow from './CheckoutFlow';
import {TouchableOpacity} from 'react-native';
import PaymentDetails from 'react_geideapay/components/PaymentDetails';
import ThreeDSScreen from 'react_geideapay/components/ThreeDSScreen.js';
import CheckoutScreen from 'react_geideapay/components/CheckoutScreen';
import PaymentComponent from 'react_geideapay/components/PaymentComponent';
import PaymentRefund from 'react_geideapay/components/PaymentRefund';
import PaymentFailure from 'react_geideapay/components/PaymentFailure';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Geidea',
            headerStyle: {
              backgroundColor: '#ff4500',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="PaymentComponent"
          component={PaymentComponent}
          options={{
            title: 'Card Payment',
            headerStyle: {
              backgroundColor: '#ff4500',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="CheckoutFlow"
          component={CheckoutFlow}
          options={{
            title: 'Configuration',
            headerStyle: {
              backgroundColor: '#ff4500',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="PaymentDetails"
          component={PaymentDetails}
          options={{
            title: 'Card Payment',
            headerStyle: {
              backgroundColor: '#ff4500',
            },
            headerTintColor: '#fff',
          }}
        />
          <Stack.Screen
          name="PaymentRefund"
          component={PaymentRefund}
          options={{
            title: 'Refund Order',
            headerStyle: {
              backgroundColor: '#ff4500',
            },
            headerTintColor: '#fff',
          }}
        />
         <Stack.Screen
          name="PaymentFailure"
          component={PaymentFailure}
          options={{
            title: 'Card Payment',
            headerStyle: {
              backgroundColor: '#ff4500',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Browser"
          component={ThreeDSScreen}
          options={({route}) => ({title: route.params.title})}
        />
        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          options={({route, navigation}) => {
            return {
              title: route.params.screenTitle,
              headerStyle: {
                backgroundColor: '#ff4500',
              },
              headerTintColor: '#fff',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PaymentComponent', {
                      publicKey: route.params?.publicKey,
                      apiPassword: route.params?.apiPassword,
                      currency: route.params?.currency,
                      code: route.params?.code,
                      callbackUrl: route.params?.callbackUrl,
                      showEmail: route.params?.showEmail,
                      billingAddress: route.params?.billingAddress,
                      shippingAddress: route.params?.shippingAddress,
                      showBilling: route.params?.showBilling,
                      showSaveCard: route.params?.showSaveCard,
                      hideLogo: route.params?.hideLogo,
                      showReceipt: route.params?.showReceipt,
                      customerEmail: route.params?.customerEmail,
                      phoneNumber: route.params?.phoneNumber,
                      headerColor: route.params?.headerColor,
                      showPhone: route.params?.showPhone,
                      merchantReferenceID: route.params?.merchantReferenceID,
                      lang: route.params?.lang,
                      sameAddress: route.params?.sameAddress,
                    });
                  }}>
                  <Icon
                    name="arrow-back"
                    size={27}
                    color="#fff"
                    style={styles.backArrow}
                  />
                </TouchableOpacity>
              ),
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  backArrow: {
    marginRight: 25,
  },
});
export default App;
