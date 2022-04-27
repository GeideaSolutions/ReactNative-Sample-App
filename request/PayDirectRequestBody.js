import BaseRequestBody from './base/BaseRequestBody.js'

export default class PayDirectRequestBody {
  static _threeDSecureId$ = '_threeDSecureId'
  static _orderId$ = '_orderId'
  static _amount$ = '_amount'
  static _currency$ = '_currency'
  static _paymentMethod$ = '_paymentMethod'
  static paymentOperation$ = '_paymentOperation'
  static callbackUrl$ = '_callbackUrl'
  static paymentIntentId$ = '_paymentIntentId'

  constructor(
    _threeDSecureId,
    _orderId,
    _amount,
    _currency,
    _paymentMethod,
    opts
  ) {
    let paymentOperation =
      opts && 'paymentOperation' in opts ? opts.paymentOperation : null
    let callbackUrl = opts && 'callbackUrl' in opts ? opts.callbackUrl : null
    let paymentIntentId =
      opts && 'paymentIntentId' in opts ? opts.paymentIntentId : null

    this.threeDSecureId = _threeDSecureId
    this.orderId = _orderId
    this.amount = _amount
    this.currency = _currency
    this.PaymentCard = _paymentMethod

    this.paymentOperation = paymentOperation
    this.callbackUrl = callbackUrl
    this.paymentIntentId = paymentIntentId
  }
  get amount() {
    return this[PayDirectRequestBody._amount$]
  }
  set amount(value) {
    this[PayDirectRequestBody._amount$] = value
  }
  get currency() {
    return this[PayDirectRequestBody._currency$]
  }
  set currency(value) {
    this[PayDirectRequestBody._currency$] = value
  }
  get PaymentCard() {
    return this[PayDirectRequestBody._paymentMethod$]
  }
  set PaymentCard(value) {
    this[PayDirectRequestBody._paymentMethod$] = value
  }
  get orderId() {
    return this[PayDirectRequestBody._orderId$]
  }
  set orderId(value) {
    this[PayDirectRequestBody._orderId$] = value
  }
  get paymentOperation() {
    return this[PayDirectRequestBody.paymentOperation$]
  }
  set paymentOperation(value) {
    this[PayDirectRequestBody.paymentOperation$] = value
  }
  get callbackUrl() {
    return this[PayDirectRequestBody.callbackUrl$]
  }
  set callbackUrl(value) {
    this[PayDirectRequestBody.callbackUrl$] = value
  }
  get paymentIntentId() {
    return this[PayDirectRequestBody.paymentIntentId$]
  }
  set paymentIntentId(value) {
    this[PayDirectRequestBody.paymentIntentId$] = value
  }

  paramsMap() {
    let params = {}

    params[BaseRequestBody.fieldThreeDSecureId] = this.threeDSecureId
    params[BaseRequestBody.fieldAmount] = this.amount
    params[BaseRequestBody.fieldCurrency] = this.currency
    params[BaseRequestBody.fieldOrderId] = this.orderId
    params[BaseRequestBody.fieldPaymentMethod] = this.PaymentCard.toMap()
    if (this.callbackUrl != null) {
      params[BaseRequestBody.fieldCallbackUrl] = this.callbackUrl
    }
    if (this.paymentOperation != null) {
      params[BaseRequestBody.fieldPaymentOperation] = this.paymentOperation
    }
    if (this.paymentIntentId != null) {
      params[BaseRequestBody.fieldPaymentIntentId] = this.paymentIntentId
    }
    params[BaseRequestBody.fieldBrowser] = 'ReactNativeSDK'

    return params
  }
}
