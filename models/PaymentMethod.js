import ExpiryDate from './expiryDate'
export default class PaymentMethod {
  static type$ = 'PaymentMethod.type'
  static brand$ = 'PaymentMethod.brand'
  static cardholderName$ = 'PaymentMethod.cardholderName'
  static maskedCardNumber$ = 'PaymentMethod.maskedCardNumber'
  static wallet$ = 'PaymentMethod.wallet'
  static expiryDate$ = 'PaymentMethod.expiryDate'

  constructor(opts) {
    let type = opts && 'type' in opts ? opts.type : null
    let brand = opts && 'brand' in opts ? opts.brand : null
    let cardholderName =
      opts && 'cardholderName' in opts ? opts.cardholderName : null
    let maskedCardNumber =
      opts && 'maskedCardNumber' in opts ? opts.maskedCardNumber : null
    let expiryDate = opts && 'expiryDate' in opts ? opts.expiryDate : null
    let wallet = opts && 'wallet' in opts ? opts.wallet : null

    this.type = type
    this.brand = brand
    this.cardholderName = cardholderName
    this.maskedCardNumber = maskedCardNumber
    this.expiryDate = expiryDate
    this.wallet = wallet
  }
  get type() {
    return this[PaymentMethod.type$]
  }
  set type(value) {
    this[PaymentMethod.type$] = value
  }
  get brand() {
    return this[PaymentMethod.brand$]
  }
  set brand(value) {
    this[PaymentMethod.brand$] = value
  }
  get cardholderName() {
    return this[PaymentMethod.cardholderName$]
  }
  set cardholderName(value) {
    this[PaymentMethod.cardholderName$] = value
  }
  get maskedCardNumber() {
    return this[PaymentMethod.maskedCardNumber$]
  }
  set maskedCardNumber(value) {
    this[PaymentMethod.maskedCardNumber$] = value
  }
  get wallet() {
    return this[PaymentMethod.wallet$]
  }
  set wallet(value) {
    this[PaymentMethod.wallet$] = value
  }
  get expiryDate() {
    return this[PaymentMethod.expiryDate$]
  }
  set expiryDate(value) {
    this[PaymentMethod.expiryDate$] = value
  }
  static fromJson(map) {
    if (map == null) {
      return null
    }
    let type = map && 'type' in map ? map.type : null
    let brand = map && 'brand' in map ? map.brand : null
    let cardholderName =
      map && 'cardholderName' in map ? map.cardholderName : null
    let maskedCardNumber =
      map && 'maskedCardNumber' in map ? map.maskedCardNumber : null
    let expiryDate = map && 'expiryDate' in map ? map.expiryDate : null
    let wallet = map && 'wallet' in map ? map.wallet : null
    return new PaymentMethod({
      type: type,
      brand: brand,
      cardholderName: cardholderName,
      maskedCardNumber: maskedCardNumber,
      expiryDate: ExpiryDate.fromJson(expiryDate),
      wallet: wallet,
    })
  }
}
