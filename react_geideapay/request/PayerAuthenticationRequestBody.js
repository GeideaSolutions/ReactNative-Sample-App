import BaseRequestBody from './base/BaseRequestBody.js'

export default class PayerAuthenticationRequestBody {
  static _amount$ = '_amount'
  static _currency$ = '_currency'
  static _paymentMethod$ = '_paymentMethod'
  static _orderId$ = '_orderId'
  static cardOnFile$ = '_cardOnFile'
  static merchantReferenceID$ = '_merchantReferenceID'
  static paymentOperation$ = '_paymentOperation'
  static callbackUrl$ = '_callbackUrl'
  static billing$ = '_billing'
  static shipping$ = '_shipping'
  static customerEmail$ = '_customerEmail'
  static returnUrl$ = '_returnUrl'
  static paymentIntentId$ = '_paymentIntentId'

  constructor(_amount, _currency, _paymentMethod, _orderId, opts) {
    let cardOnFile = opts && 'cardOnFile' in opts ? opts.cardOnFile : null
    let merchantReferenceID =
      opts && 'merchantReferenceID' in opts ? opts.merchantReferenceID : null
    let paymentOperation =
      opts && 'paymentOperation' in opts ? opts.paymentOperation : null
    let callbackUrl = opts && 'callbackUrl' in opts ? opts.callbackUrl : null
    let billing = opts && 'billing' in opts ? opts.billing : null
    let shipping = opts && 'shipping' in opts ? opts.shipping : null
    let customerEmail =
      opts && 'customerEmail' in opts ? opts.customerEmail : null
    let returnUrl = 'https://returnurl.com'
    let paymentIntentId =
      opts && 'paymentIntentId' in opts ? opts.paymentIntentId : null

    this.amount = _amount
    this.currency = _currency
    this.paymentMethod = _paymentMethod
    this.orderId = _orderId
    this.cardOnFile = cardOnFile
    this.merchantReferenceID = merchantReferenceID
    this.paymentOperation = paymentOperation
    this.callbackUrl = callbackUrl
    this.billing = billing
    this.shipping = shipping
    this.customerEmail = customerEmail
    this.returnUrl = returnUrl
    this.paymentIntentId = paymentIntentId
  }
  get amount() {
    return this[PayerAuthenticationRequestBody._amount$]
  }
  set amount(value) {
    this[PayerAuthenticationRequestBody._amount$] = value
  }
  get currency() {
    return this[PayerAuthenticationRequestBody._currency$]
  }
  set currency(value) {
    this[PayerAuthenticationRequestBody._currency$] = value
  }
  get paymentMethod() {
    return this[PayerAuthenticationRequestBody._paymentMethod$]
  }
  set paymentMethod(value) {
    this[PayerAuthenticationRequestBody._paymentMethod$] = value
  }
  get orderId() {
    return this[PayerAuthenticationRequestBody._orderId$]
  }
  set orderId(value) {
    this[PayerAuthenticationRequestBody._orderId$] = value
  }
  get cardOnFile() {
    return this[PayerAuthenticationRequestBody.cardOnFile$]
  }
  set cardOnFile(value) {
    this[PayerAuthenticationRequestBody.cardOnFile$] = value
  }
  get merchantReferenceID() {
    return this[PayerAuthenticationRequestBody.merchantReferenceID$]
  }
  set merchantReferenceID(value) {
    this[PayerAuthenticationRequestBody.merchantReferenceID$] = value
  }
  get paymentOperation() {
    return this[PayerAuthenticationRequestBody.paymentOperation$]
  }
  set paymentOperation(value) {
    this[PayerAuthenticationRequestBody.paymentOperation$] = value
  }
  get callbackUrl() {
    return this[PayerAuthenticationRequestBody.callbackUrl$]
  }
  set callbackUrl(value) {
    this[PayerAuthenticationRequestBody.callbackUrl$] = value
  }
  get billing() {
    return this[PayerAuthenticationRequestBody.billing$]
  }
  set billing(value) {
    this[PayerAuthenticationRequestBody.billing$] = value
  }
  get shipping() {
    return this[PayerAuthenticationRequestBody.shipping$]
  }
  set shipping(value) {
    this[PayerAuthenticationRequestBody.shipping$] = value
  }
  get customerEmail() {
    return this[PayerAuthenticationRequestBody.customerEmail$]
  }
  set customerEmail(value) {
    this[PayerAuthenticationRequestBody.customerEmail$] = value
  }
  get returnUrl() {
    return this[PayerAuthenticationRequestBody.returnUrl$]
  }
  set returnUrl(value) {
    this[PayerAuthenticationRequestBody.returnUrl$] = value
  }
  get paymentIntentId() {
    return this[PayerAuthenticationRequestBody.paymentIntentId$]
  }
  set paymentIntentId(value) {
    this[PayerAuthenticationRequestBody.paymentIntentId$] = value
  }

  paramsMap() {
    let params = {}
    params[BaseRequestBody.fieldAmount] = this.amount
    params[BaseRequestBody.fieldCurrency] = this.currency
    params[BaseRequestBody.fieldOrderId] = this.orderId
    params[BaseRequestBody.fieldPaymentMethod] = this.paymentMethod.toMap()
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
    params[BaseRequestBody.fieldBrowser] = 'ReactNativeSDK'

    return params
  }
}
