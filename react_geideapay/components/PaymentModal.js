import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableHighlight, View, Modal, Text } from 'react-native'

import { CreditCard } from './common/CreditCard'
import { CheckoutLogic, styles } from './CheckoutLogic'

class PaymentModal extends CheckoutLogic {
  constructor(props) {
    super(props)
    this._handleCloseModal = this._handleCloseModal.bind(this)
  }

  onPaymentSuccess(res) {
    this._handleCloseModal()
    this.props.onPaymentSuccess(res)?.()
  }
  onPaymentFailure(res) {
    this._handleCloseModal()
    this.props.onPaymentFailure(res)?.()
  }
  _handleCloseModal() {
    this.setState({ ...this._calculateState() }, this.props.onRequestClose())
  }
  renderCreditCardForm() {
    return <CreditCard onChange={this.onDataChange} />
  }
  renderContent() {
    return (
      <View>
        {this.renderCreditCardForm()}
        {this.renderRememberMe()}
        {this.renderButtonType()}
      </View>
    )
  }

  renderPaymentForm() {
    return (
      <View style={[styles.parentSection, styles.paymentForm]}>
        <View style={styles.sectionContainer}>{this.renderContent()}</View>
      </View>
    )
  }

  renderCloseModalIcon() {
    return (
      <View style={styles.closeModalIconContainer}>
        <TouchableHighlight
          onPress={this._handleCloseModal}
          underlayColor="transparent"
        >
          <View>
            <Text>
              <Icon name="times-circle" size={16} color="#000" />
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    const { visible, transparent, onRequestClose } = this.props
    return (
      <View>
        <Modal
          visible={visible}
          transparent={transparent}
          animationType="slide"
          onRequestClose={onRequestClose}
        >
          <View style={styles.container}>
            <View style={styles.paymentContainer}>
              {this.renderCloseModalIcon()}
              {this.renderPaymentInfo()}
              {this.renderPaymentForm()}
            </View>
          </View>
        </Modal>
        {this._renderThreeDSecure()}
      </View>
    )
  }
}

PaymentModal.propTypes = {
  visible: PropTypes.bool,
  amount: PropTypes.number,
  currency: PropTypes.string,
  description: PropTypes.string,
  transparent: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onPaymentSuccess: PropTypes.func,
  onPaymentFailure: PropTypes.func,
}

PaymentModal.defaultProps = {
  transparent: true,
  country: 'Egypt',
  currency: 'EGP',
}

export default PaymentModal
