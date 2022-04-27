import React, { Fragment, useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import valid from 'card-validator'
import CreditCard from '../common/CustomCreditCard'
import Input from '../common/CustomInput'
import {
  validateCreditCard,
  validateCreditCardDate,
  validateCreditCardCcv,
} from '../../utils/formUtils'
import styles from './styles'

const CreateCard = (props) => {
  const [rotate, setRotate] = useState(false)
  const [creditCard, setCreditCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
  })

  const [placeholder, setPlaceholder] = useState({
    name: 'Card Name',
    number: 'Card Number',
    expiry: 'MM/YY',
    cvc: 'CCV',
  })

  const changeCreditCard = (newValue) => {
    setCreditCard((oldValue) => ({ ...oldValue, ...newValue }))
    if (newValue.name != null) {
      creditCard.name = newValue.name
    }
    if (newValue.number != null) {
      creditCard.number = newValue.number
    }
    if (newValue.expiry != null) {
      creditCard.expiry = newValue.expiry
    }
    if (newValue.cvc != null) {
      creditCard.cvc = newValue.cvc
    }
    let allValid =
      valid.number(creditCard.number).isValid &&
      valid.expirationDate(creditCard.expiry).isValid &&
      valid.cvv(creditCard.cvc).isValid
    props.onChange({ values: creditCard, valid: allValid })
    console.log(creditCard)
  }

  const changePlaceholder = (newValue) => {
    setPlaceholder((oldValue) => ({ ...oldValue, ...newValue }))
  }

  return (
    <View>
      <View style={styles.creditCard}>
        <CreditCard
          name={creditCard.name}
          number={creditCard.number}
          expiry={creditCard.expiry}
          cvc={creditCard.cvc}
          rotate={rotate}
          cardColor={props.cardColor}
        />
      </View>
      <View style={styles.form}>
        <Input
          style={[styles.textInput]}
          value={creditCard.name}
          valid={true}
          placeholder={placeholder.name}
          onChangeText={(value) => changeCreditCard({ name: value })}
          onFocus={() => changePlaceholder({ name: '' })}
          onBlur={() => changePlaceholder({ name: 'Card Name' })}
          secureTextEntry={false}
        />
        <Input
          style={[styles.textInput]}
          value={creditCard.number}
          placeholder={placeholder.number}
          valid={valid.number(creditCard.number).isValid}
          onChangeText={(value) =>
            validateCreditCard(value) !== false &&
            changeCreditCard({ number: validateCreditCard(value) })
          }
          onFocus={() => changePlaceholder({ number: '' })}
          onBlur={() => changePlaceholder({ number: 'Card Number' })}
          keyboardType={'numeric'}
          secureTextEntry={false}
        />
        <Input
          style={[styles.textInput]}
          value={creditCard.expiry}
          valid={valid.expirationDate(creditCard.expiry).isValid}
          placeholder={placeholder.expiry}
          onChangeText={(value) =>
            validateCreditCardDate(value) !== false &&
            changeCreditCard({ expiry: validateCreditCardDate(value) })
          }
          onFocus={() => changePlaceholder({ expiry: '' })}
          onBlur={() => changePlaceholder({ expiry: 'MM/YY' })}
          secureTextEntry={false}
          keyboardType={'numeric'}
        />
        <Input
          style={[styles.textInput]}
          value={creditCard.cvc}
          valid={valid.cvv(creditCard.cvc).isValid}
          placeholder={placeholder.cvc}
          onChangeText={(value) =>
            validateCreditCardCcv(value) && changeCreditCard({ cvc: value })
          }
          onFocus={() => (changePlaceholder({ cvc: '' }), setRotate(true))}
          onBlur={() => (changePlaceholder({ cvc: 'CCV' }), setRotate(false))}
          secureTextEntry={false}
          keyboardType={'numeric'}
        />
      </View>
    </View>
  )
}

export default CreateCard
