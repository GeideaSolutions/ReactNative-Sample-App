import BaseRequestBody from './BaseRequestBody.js'

export default class PostPayOperationRequestBody {
  static _orderId$ = '_orderId'
  static callbackUrl$ = '_callbackUrl'
  static reason$ = '_reason'
  static paymentIntentId$ = '_paymentIntentId'

  constructor(_orderId, opts) {
    let reason = opts && 'reason' in opts ? opts.reason : null
    let paymentIntentId =
      opts && 'paymentIntentId' in opts ? opts.paymentIntentId : null
    let callbackUrl = opts && 'callbackUrl' in opts ? opts.callbackUrl : null

    this.orderId = _orderId
    if (reason != null) {
      this.reason = reason
    }
    if (paymentIntentId != null) {
      this.paymentIntentId = paymentIntentId
    }
    if (callbackUrl != null) {
      this.callbackUrl = callbackUrl
    }
  }
  get orderId() {
    return this[PostPayOperationRequestBody._orderId$]
  }
  set orderId(value) {
    this[PostPayOperationRequestBody._orderId$] = value
  }
  get callbackUrl() {
    return this[PostPayOperationRequestBody.callbackUrl$]
  }
  set callbackUrl(value) {
    this[PostPayOperationRequestBody.callbackUrl$] = value
  }
  get reason() {
    return this[PostPayOperationRequestBody.reason$]
  }
  set reason(value) {
    this[PostPayOperationRequestBody.reason$] = value
  }
  get paymentIntentId() {
    return this[PostPayOperationRequestBody.paymentIntentId$]
  }
  set paymentIntentId(value) {
    this[PostPayOperationRequestBody.paymentIntentId$] = value
  }
  paramsMap() {
    let params = {}
    params[BaseRequestBody.fieldOrderId] = this.orderId
    if (this.callbackUrl != null) {
      params[BaseRequestBody.fieldCallbackUrl] = this.callbackUrl
    }
    if (this.reason != null) {
      params[BaseRequestBody.fieldReason] = this.reason
    }
    if (this.paymentIntentId != null) {
      params[BaseRequestBody.fieldPaymentIntentId] = this.paymentIntentId
    }
    return params
  }
}
