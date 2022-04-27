import BaseRequestBody from './base/BaseRequestBody.js'

export default class InitiateAuthenticationRequestBody {
  static callbackUrl$ = '_callbackUrl'
  static returnUrl$ = '_returnUrl'
  static merchantReferenceID$ = '_merchantReferenceID'
  static cardOnFile$ = '_cardOnFile'
  static paymentOperation$ = '_paymentOperation'
  static billing$ = '_billing'
  static shipping$ = '_shipping'
  static customerEmail$ = '_customerEmail'
  static paymentIntentId$ = '_paymentIntentId'
  static amount$ = '_amount'
  static currency$ = '_currency'
  static cardNumber$ = '_cardNumber'

  constructor(_amount, _currency, _cardNumber, opts) {
    let _callbackUrl = opts && 'callbackUrl' in opts ? opts.callbackUrl : null
    let _returnUrl = 'https://returnurl.com'
    let _cardOnFile = opts && 'cardOnFile' in opts ? opts.cardOnFile : null
    let _merchantReferenceID =
      opts && 'merchantReferenceID' in opts ? opts.merchantReferenceID : null
    let _paymentOperation =
      opts && 'paymentOperation' in opts ? opts.paymentOperation : null
    let _billing = opts && 'billing' in opts ? opts.billing : null
    let _shipping = opts && 'shipping' in opts ? opts.shipping : null
    let _customerEmail =
      opts && 'customerEmail' in opts ? opts.customerEmail : null
    let _paymentIntentId =
      opts && 'paymentIntentId' in opts ? opts.paymentIntentId : null
    this.amount = _amount
    this.currency = _currency
    this.cardNumber = _cardNumber
    this.callbackUrl = _callbackUrl
    this.returnUrl = _returnUrl
    this.cardOnFile = _cardOnFile
    this.merchantReferenceID = _merchantReferenceID
    this.paymentOperation = _paymentOperation
    this.billing = _billing
    this.shipping = _shipping
    this.customerEmail = _customerEmail
    this.paymentIntentId = _paymentIntentId
  }
  get amount() {
    return this[InitiateAuthenticationRequestBody.amount$]
  }
  set amount(value) {
    this[InitiateAuthenticationRequestBody.amount$] = value
  }
  get currency() {
    return this[InitiateAuthenticationRequestBody.currency$]
  }
  set currency(value) {
    this[InitiateAuthenticationRequestBody.currency$] = value
  }
  get callbackUrl() {
    return this[InitiateAuthenticationRequestBody.callbackUrl$]
  }
  set callbackUrl(value) {
    this[InitiateAuthenticationRequestBody.callbackUrl$] = value
  }
  get returnUrl() {
    return this[InitiateAuthenticationRequestBody.returnUrl$]
  }
  set returnUrl(value) {
    this[InitiateAuthenticationRequestBody.returnUrl$] = value
  }
  get merchantReferenceID() {
    return this[InitiateAuthenticationRequestBody.merchantReferenceID$]
  }
  set merchantReferenceID(value) {
    this[InitiateAuthenticationRequestBody.merchantReferenceID$] = value
  }
  get cardOnFile() {
    return this[InitiateAuthenticationRequestBody.cardOnFile$]
  }
  set cardOnFile(value) {
    this[InitiateAuthenticationRequestBody.cardOnFile$] = value
  }
  get paymentOperation() {
    return this[InitiateAuthenticationRequestBody.paymentOperation$]
  }
  set paymentOperation(value) {
    this[InitiateAuthenticationRequestBody.paymentOperation$] = value
  }
  get billing() {
    return this[InitiateAuthenticationRequestBody.billing$]
  }
  set billing(value) {
    this[InitiateAuthenticationRequestBody.billing$] = value
  }
  get shipping() {
    return this[InitiateAuthenticationRequestBody.shipping$]
  }
  set shipping(value) {
    this[InitiateAuthenticationRequestBody.shipping$] = value
  }
  get customerEmail() {
    return this[InitiateAuthenticationRequestBody.customerEmail$]
  }
  set customerEmail(value) {
    this[InitiateAuthenticationRequestBody.customerEmail$] = value
  }
  get paymentIntentId() {
    return this[InitiateAuthenticationRequestBody.paymentIntentId$]
  }
  set paymentIntentId(value) {
    this[InitiateAuthenticationRequestBody.paymentIntentId$] = value
  }

  paramsMap() {
    let params = {}
    params[BaseRequestBody.fieldAmount] = this.amount
    params[BaseRequestBody.fieldCurrency] = this.currency
    params[BaseRequestBody.fieldCardNumber] = this.cardNumber
    if (this.callbackUrl != null) {
      params[BaseRequestBody.fieldCallbackUrl] = this.callbackUrl
    }
    if (this.returnUrl != null) {
      params[BaseRequestBody.fieldReturnUrl] = this.returnUrl
    }
    if (this.cardOnFile != null) {
      params[BaseRequestBody.fieldCardOnFile] = this.cardOnFile
    }
    if (this.merchantReferenceID != null) {
      params[BaseRequestBody.fieldMerchantReferenceID] =
        this.merchantReferenceID
    }
    if (this.paymentOperation != null) {
      params[BaseRequestBody.fieldPaymentOperation] = this.paymentOperation
    }
    if (this.billing != null) {
      params[BaseRequestBody.fieldBilling] = this.billing.toMap()
    }
    if (this.shipping != null) {
      params[BaseRequestBody.fieldShipping] = this.shipping.toMap()
    }
    if (this.customerEmail != null) {
      params[BaseRequestBody.fieldCustomerEmail] = this.customerEmail
    }
    if (this.paymentIntentId != null) {
      params[BaseRequestBody.fieldPaymentIntentId] = this.paymentIntentId
    }
    return params
  }
}
