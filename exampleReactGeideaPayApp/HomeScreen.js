import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Button, StatusBar} from 'react-native';
import {TextInput} from 'react-native-paper';
let publicKey = 'f7bdf1db-f67e-409b-8fe7-f7ecf9634f70';
let apiPassword = '0c9b36c1-3410-4b96-878a-dbd54ace4e9a';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publicKey: publicKey,
      apiPassword: apiPassword,
    };

    this.onScreenCheckoutButtonPress =
      this.onScreenCheckoutButtonPress.bind(this);

    this.onScreenApiButtonPress = this.onScreenApiButtonPress.bind(this);
  }

  onScreenCheckoutButtonPress() {
    const {publicKey, apiPassword} = this.state;
    this.props.navigation.push('CheckoutFlow', {
      publicKey: publicKey,
      apiPassword: apiPassword,
    });
  }

  onScreenApiButtonPress() {
    const {publicKey, apiPassword} = this.state;
    this.props.navigation.push('ApiFlow', {
      publicKey: publicKey,
      apiPassword: apiPassword,
    });
  }

  render() {
    const {publicKey, apiPassword} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="red" barStyle="light-content" />
        <ScrollView>
          <TextInput
            mode="outlined"
            label="Public Key"
            style={styles.TextInput}
            defaultValue={publicKey}
            onChangeText={text => {
              this.setState({publicKey: text});
            }}
          />
          <TextInput
            style={styles.TextInput}
            mode="outlined"
            label="Api Password"
            defaultValue={apiPassword}
            onChangeText={text => {
              this.setState({apiPassword: text});
            }}
          />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={this.onScreenCheckoutButtonPress}
              title={'Checkout Flow'}
              disabled={apiPassword === '' || publicKey === ''}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={this.onScreenApiButtonPress}
              title={'API Flow'}
              disabled={apiPassword === '' || publicKey === ''}
            />
          </View>
        </ScrollView>
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
    marginHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#03a9f4',
    borderRadius: 5,
    padding: 5,
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
  TextInput: {
    margin: 16,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
