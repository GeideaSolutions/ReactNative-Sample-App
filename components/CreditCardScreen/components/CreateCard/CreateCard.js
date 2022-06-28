import React, { Fragment, useState } from 'react'
import { View, Image } from 'react-native'
import valid from 'card-validator'
import CreditCard from '../common/CustomCreditCard'
import Input from '../common/CustomInput'
import {TextInput} from 'react-native-paper';
import Icons from './Icons'

import {
  validateCreditCard,
  validateCreditCardDate,
  validateCreditCardCcv,
  typeCreditCard,
} from '../../utils/formUtils'
import styles from './styles'

const CreateCard = (props) => {

  const textColor = props.textColor
  const backgroundColor= props.backgroundColor
  const language = props.language
  
  const [rotate, setRotate] = useState(false)
  const [creditCard, setCreditCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  })

  const [cardType, setCardType] = useState({
    type: require('./icons/stp_card_unknown.png'),
  })


  const [placeholder, setPlaceholder] = useState({
    name: language === 'English'? 'Name on card' : 'الاسم على البطاقة',
    number: 'XXXX XXXX XXXX XXXX',
    expiry: 'MM/YY',
    cvc: '123',
  })

  const [cardLabel, setCardLabel] = useState({
    name: language === 'English'? 'Card Holder Name' : 'اسم صاحب البطاقة',
    number: language === 'English'? 'Card Number' : 'رقم البطاقة',
    expiry: language === 'English'? 'Expiry Date' : 'تاريخ الإنتهاء',
    cvc: language === 'English'? 'CCV' : 'الرقم الأمني',
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
      valid.cvv(creditCard.cvc).isValid &&
      creditCard.name != ''
    props.onChange({ values: creditCard, valid: allValid })
    console.log(creditCard)
  }


  const changeCardType = (newValue) => {
    setCardType((oldValue) => ({ ...oldValue, ...newValue }))
  }


  const IcontType = (type) => {
    var iconType;
    if(type === 'american-express') {
      iconType = require('./icons/stp_card_amex.png')
    } 
    else if(type === 'diners-club') {
      iconType = require('./icons/stp_card_diners.png')
    }
    else if(type === 'discover') {
      iconType = require('./icons/stp_card_discover.png')
    }
    else if(type === 'jcb') {
      iconType = require('./icons/stp_card_jcb.png')
    }
    else if(type === 'master-card') {
      iconType = require('./icons/stp_card_mastercard.png')
    }
    else if(type === 'visa') {
      iconType = require('./icons/stp_card_visa.png')
    }
    else {
      iconType = require('./icons/stp_card_unknown.png')
    }
    return iconType
  }

  return (
    <View>
      <View
          style={
            {
              flexDirection: language == 'English' ? 'row' : 'row-reverse',
              flex: 1,
              marginVertical: 10,
            }
          }>
            <View style={{flex: 3}}>
            <Input
            style={[styles.textInput]}
          value={creditCard.number}
          placeholder={placeholder.number}
          label={cardLabel.number}
          language={language}
          valid={valid.number(creditCard.number).isValid}
          onChangeText={(value) =>
            {
              validateCreditCard(value) !== false &&
              changeCreditCard({ number: validateCreditCard(value) })
              if(value.length < 5 && value.length > 0)
              {
                changeCardType({ type: IcontType(typeCreditCard(value)) })
              }
              if(value.length === 0)
              {
                changeCardType({ type: IcontType('') })
              }
            }
          }
          textColor={textColor}
          backgroundColor={backgroundColor}
          keyboardType={'numeric'}
          secureTextEntry={false}
        />
            </View>
            <View style={{flex:1,  marginEnd: language == 'English' ? 0 : 10, marginLeft: language == 'English' ? 10 : 0}}>
            <Image source={cardType.type}/>
            </View>
        </View>
        <View
          style={
            {
              flexDirection: 'row',
              marginVertical: 10,
            }
          }>
            <View style={{flex: 3, marginRight: 10}}>
                <Input
                style={[styles.textInput]}
                language={language}
                value={creditCard.expiry}
                valid={valid.expirationDate(creditCard.expiry).isValid}
                placeholder={placeholder.expiry}
                label={cardLabel.expiry}
                onChangeText={(value) =>
                  validateCreditCardDate(value) !== false &&
                  changeCreditCard({ expiry: validateCreditCardDate(value) })
                }
                textColor={textColor}
                backgroundColor={backgroundColor}
                secureTextEntry={false}
                keyboardType={'numeric'}
              />
            </View>
            <View style={{flex: 3}}>
              <Input
                style={[styles.textInput]}
                language={language}
                value={creditCard.cvc}
                valid={valid.cvv(creditCard.cvc).isValid}
                placeholder={placeholder.cvc}
                label={cardLabel.cvc}
                onChangeText={(value) =>
                  validateCreditCardCcv(value) && changeCreditCard({ cvc: value })
                }
                textColor={textColor}
                backgroundColor={backgroundColor}
                secureTextEntry={false}
                keyboardType={'numeric'}
              />
              </View>
        </View>
        <View
          style={
            {
              marginVertical: 10,
            }
          }>
      <Input
          style={[styles.textInput]}
          value={creditCard.name}
          valid={true}
          language={language}
          placeholder={placeholder.name}
          label={cardLabel.name}
          onChangeText={(value) => changeCreditCard({ name: value })}
          textColor={textColor}
          backgroundColor={backgroundColor}
          secureTextEntry={false}
        />
        </View>
    </View>
  )
}

export default CreateCard
