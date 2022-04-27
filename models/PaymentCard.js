import BaseRequestBody from '../request/base/BaseRequestBody'
import ExpiryDate from './expiryDate'

export default class PaymentCard {
  static name$ = '_name'
  static number$ = '_number'
  static cvc$ = '_cvc'
  static expiryDate$ = '_expiryDate'

  constructor(_name, _number, _cvc, _expiryDate) {
    this.name = _name
    this.cardNumber = _number
    this.cvc = _cvc
    this.expiryDate = _expiryDate
  }

  get name() {
    return this[PaymentCard.name$]
  }
  set name(value) {
    this[PaymentCard.name$] = value
  }
  get cardNumber() {
    return this[PaymentCard.number$]
  }
  set cardNumber(value) {
    this[PaymentCard.number$] = value
  }
  get cvc() {
    return this[PaymentCard.cvc$]
  }
  set cvc(value) {
    this[PaymentCard.cvc$] = value
  }
  get expiryDate() {
    return this[PaymentCard.expiryDate$]
  }
  set expiryDate(value) {
    this[PaymentCard.expiryDate$] = value
  }

  toMap() {
    let params = {}
    if (this.name != null) {
      params[BaseRequestBody.fieldCardholderName] = this.name
    }
    if (this.cardNumber != null) {
      params[BaseRequestBody.fieldCardNumber] = this.cardNumber
    }
    if (this.cvc != null) {
      params[BaseRequestBody.fieldCvv] = this.cvc
    }
    if (this.expiryDate != null) {
      params[BaseRequestBody.fieldExpiryDate] = this.expiryDate.toMap()
    }
    return params
  }

  static fromJson(map) {
    if (map == null) {
      return null
    }
    let name = map && 'name' in map ? map.name : null
    let number = map && 'number' in map ? map.number : null
    let cvc = map && 'cvc' in map ? map.cvc : null
    let expiryDate = map && 'expiryDate' in map ? map.expiryDate : null

    return new PaymentCard({
      name: name,
      cardNumber: number,
      cvc: cvc,
      expiryDate: ExpiryDate.fromJson(expiryDate),
    })
  }
}
