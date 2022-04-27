import React from 'react'
import { View } from 'react-native'
import { CreditCardInput } from './CustomCreditCardForm/index'

const CreditCard = (props) => {
  const { onChange } = props
  return <CreditCardInput requiresName={true} onChange={onChange} />
}

export { CreditCard }
