import BaseRequestBody from './base/BaseRequestBody.js'

export default class PayTokenRequestBody {
  static _amount$ = '_amount'
  static _currency$ = '_currency'
  static _tokenId$ = '_tokenId'
  static _initiatedBy$ = '_initiatedBy'
  static _agreementId$ = '_agreementId'
  static callbackUrl$ = '_callbackUrl'

  constructor(_amount, _currency, _tokenId, _initiatedBy, _agreementId, opts) {
    let callbackUrl = opts && 'callbackUrl' in opts ? opts.callbackUrl : null
    this.amount = _amount
    this.currency = _currency
    this.tokenId = _tokenId
    this.initiatedBy = _initiatedBy
    this.agreementId = _agreementId
    this.callbackUrl = callbackUrl
  }
  get amount() {
    return this[PayTokenRequestBody._amount$]
  }
  set amount(value) {
    this[PayTokenRequestBody._amount$] = value
  }
  get currency() {
    return this[PayTokenRequestBody._currency$]
  }
  set currency(value) {
    this[PayTokenRequestBody._currency$] = value
  }
  get callbackUrl() {
    return this[PayTokenRequestBody.callbackUrl$]
  }
  set callbackUrl(value) {
    this[PayTokenRequestBody.callbackUrl$] = value
  }
  get tokenId(){
    return this[PayTokenRequestBody._tokenId$]
  }
  set tokenId(value){
    this[PayTokenRequestBody._tokenId$] = value
  }
  get initiatedBy(){
    return this[PayTokenRequestBody._initiatedBy$]
  }
  set initiatedBy(value){
    this[PayTokenRequestBody._initiatedBy$] = value
  }
  get agreementId(){
    return this[PayTokenRequestBody._agreementId$]
  }
  set agreementId(value){
    this[PayTokenRequestBody._agreementId$] = value
  }

  paramsMap() {
    let params = {}
    params[BaseRequestBody.fieldAmount] = this.amount
    params[BaseRequestBody.fieldCurrency] = this.currency
    params[BaseRequestBody.fieldTokenId] = this.tokenId
    params[BaseRequestBody.fieldInitiatedBy] = this.initiatedBy
    params[BaseRequestBody.fieldAgreementId] = this.agreementId
    if (this.callbackUrl != null) {
      params[BaseRequestBody.fieldCallbackUrl] = this.callbackUrl
    }
    return params
  }
}
