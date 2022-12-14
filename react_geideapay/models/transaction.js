import PaymentMethod from './PaymentMethod'
import Codes from './codes'
export default class Transaction {
  static amount$ = 'Transaction.amount'
  static sameBank$ = 'Transaction.sameBank'
  static transactionId$ = 'Transaction.transactionId'
  static type$ = 'Transaction.type'
  static status$ = 'Transaction.status'
  static currency$ = 'Transaction.currency'
  static source$ = 'Transaction.source'
  static authorizationCode$ = 'Transaction.authorizationCode'
  static rrn$ = 'Transaction.rrn'
  static postilionDetails$ = 'Transaction.postilionDetails'
  static terminalDetails$ = 'Transaction.terminalDetails'
  static meezaDetails$ = 'Transaction.meezaDetails'
  static bnplDetails$ = 'Transaction.bnplDetails'
  static correlationId$ = 'Transaction.correlationId'
  static createdDate$ = 'Transaction.createdDate'
  static createdBy$ = 'Transaction.createdBy'
  static updatedDate$ = 'Transaction.updatedDate'
  static updatedBy$ = 'Transaction.updatedBy'
  static paymentMethod$ = 'Transaction.paymentMethod'
  static codes$ = 'Transaction.codes'
  static authenticationDetails$ = 'Transaction.authenticationDetails'

  constructor(opts) {
    let transactionId =
      opts && 'transactionId' in opts ? opts.transactionId : null
    let type = opts && 'type' in opts ? opts.type : null
    let status = opts && 'status' in opts ? opts.status : null
    let amount = opts && 'amount' in opts ? opts.amount : null
    let currency = opts && 'currency' in opts ? opts.currency : null
    let source = opts && 'source' in opts ? opts.source : null
    let authorizationCode =
      opts && 'authorizationCode' in opts ? opts.authorizationCode : null
    let rrn = opts && 'rrn' in opts ? opts.rrn : null
    let sameBank = opts && 'sameBank' in opts ? opts.sameBank : null
    let postilionDetails =
      opts && 'postilionDetails' in opts ? opts.postilionDetails : null
    let terminalDetails =
      opts && 'terminalDetails' in opts ? opts.terminalDetails : null
    let meezaDetails = opts && 'meezaDetails' in opts ? opts.meezaDetails : null
    let bnplDetails = opts && 'bnplDetails' in opts ? opts.bnplDetails : null
    let correlationId =
      opts && 'correlationId' in opts ? opts.correlationId : null
    let createdDate = opts && 'createdDate' in opts ? opts.createdDate : null
    let createdBy = opts && 'createdBy' in opts ? opts.createdBy : null
    let updatedDate = opts && 'updatedDate' in opts ? opts.updatedDate : null
    let updatedBy = opts && 'updatedBy' in opts ? opts.updatedBy : null
    let paymentMethod =
      opts && 'paymentMethod' in opts ? opts.paymentMethod : null
    let codes = opts && 'codes' in opts ? opts.codes : null
    let authenticationDetails =
      opts && 'authenticationDetails' in opts
        ? opts.authenticationDetails
        : null
    this.amount = amount
    this.sameBank = sameBank
    this.transactionId = transactionId
    this.type = type
    this.status = status
    this.currency = currency
    this.source = source
    this.authorizationCode = authorizationCode
    this.rrn = rrn
    this.postilionDetails = postilionDetails
    this.terminalDetails = terminalDetails
    this.meezaDetails = meezaDetails
    this.bnplDetails = bnplDetails
    this.correlationId = correlationId
    this.createdDate = createdDate
    this.createdBy = createdBy
    this.updatedDate = updatedDate
    this.updatedBy = updatedBy
    this.paymentMethod = paymentMethod
    this.codes = codes
    this.authenticationDetails = authenticationDetails
  }
  get amount() {
    return this[Transaction.amount$]
  }
  set amount(value) {
    this[Transaction.amount$] = value
  }
  get sameBank() {
    return this[Transaction.sameBank$]
  }
  set sameBank(value) {
    this[Transaction.sameBank$] = value
  }
  get transactionId() {
    return this[Transaction.transactionId$]
  }
  set transactionId(value) {
    this[Transaction.transactionId$] = value
  }
  get type() {
    return this[Transaction.type$]
  }
  set type(value) {
    this[Transaction.type$] = value
  }
  get status() {
    return this[Transaction.status$]
  }
  set status(value) {
    this[Transaction.status$] = value
  }
  get currency() {
    return this[Transaction.currency$]
  }
  set currency(value) {
    this[Transaction.currency$] = value
  }
  get source() {
    return this[Transaction.source$]
  }
  set source(value) {
    this[Transaction.source$] = value
  }
  get authorizationCode() {
    return this[Transaction.authorizationCode$]
  }
  set authorizationCode(value) {
    this[Transaction.authorizationCode$] = value
  }
  get rrn() {
    return this[Transaction.rrn$]
  }
  set rrn(value) {
    this[Transaction.rrn$] = value
  }
  get postilionDetails() {
    return this[Transaction.postilionDetails$]
  }
  set postilionDetails(value) {
    this[Transaction.postilionDetails$] = value
  }
  get terminalDetails() {
    return this[Transaction.terminalDetails$]
  }
  set terminalDetails(value) {
    this[Transaction.terminalDetails$] = value
  }
  get meezaDetails() {
    return this[Transaction.meezaDetails$]
  }
  set meezaDetails(value) {
    this[Transaction.meezaDetails$] = value
  }
  get bnplDetails() {
    return this[Transaction.bnplDetails$]
  }
  set bnplDetails(value) {
    this[Transaction.bnplDetails$] = value
  }
  get correlationId() {
    return this[Transaction.correlationId$]
  }
  set correlationId(value) {
    this[Transaction.correlationId$] = value
  }
  get createdDate() {
    return this[Transaction.createdDate$]
  }
  set createdDate(value) {
    this[Transaction.createdDate$] = value
  }
  get createdBy() {
    return this[Transaction.createdBy$]
  }
  set createdBy(value) {
    this[Transaction.createdBy$] = value
  }
  get updatedDate() {
    return this[Transaction.updatedDate$]
  }
  set updatedDate(value) {
    this[Transaction.updatedDate$] = value
  }
  get updatedBy() {
    return this[Transaction.updatedBy$]
  }
  set updatedBy(value) {
    this[Transaction.updatedBy$] = value
  }
  get paymentMethod() {
    return this[Transaction.paymentMethod$]
  }
  set paymentMethod(value) {
    this[Transaction.paymentMethod$] = value
  }
  get codes() {
    return this[Transaction.codes$]
  }
  set codes(value) {
    this[Transaction.codes$] = value
  }
  get authenticationDetails() {
    return this[Transaction.authenticationDetails$]
  }
  set authenticationDetails(value) {
    this[Transaction.authenticationDetails$] = value
  }
  static fromJson(map) {
    if (map == null) {
      return null
    }
    let transactionId = map && 'transactionId' in map ? map.transactionId : null
    let type = map && 'type' in map ? map.type : null
    let status = map && 'status' in map ? map.status : null
    let amount = map && 'amount' in map ? map.amount : null
    let currency = map && 'currency' in map ? map.currency : null
    let source = map && 'source' in map ? map.source : null
    let authorizationCode =
      map && 'authorizationCode' in map ? map.authorizationCode : null
    let rrn = map && 'rrn' in map ? map.rrn : null
    let sameBank = map && 'sameBank' in map ? map.sameBank : null
    let postilionDetails =
      map && 'postilionDetails' in map ? map.postilionDetails : null
    let terminalDetails =
      map && 'terminalDetails' in map ? map.terminalDetails : null
    let meezaDetails = map && 'meezaDetails' in map ? map.meezaDetails : null
    let bnplDetails = map && 'bnplDetails' in map ? map.bnplDetails : null
    let correlationId = map && 'correlationId' in map ? map.correlationId : null
    let createdDate = map && 'createdDate' in map ? map.createdDate : null
    let createdBy = map && 'createdBy' in map ? map.createdBy : null
    let updatedDate = map && 'updatedDate' in map ? map.updatedDate : null
    let updatedBy = map && 'updatedBy' in map ? map.updatedBy : null
    let paymentMethod = map && 'paymentMethod' in map ? map.paymentMethod : null
    let codes = map && 'codes' in map ? map.codes : null
    let authenticationDetails =
      map && 'authenticationDetails' in map ? map.authenticationDetails : null
    return new Transaction({
      transactionId: transactionId,
      type: type,
      status: status,
      amount: amount,
      currency: currency,
      source: source,
      authorizationCode: authorizationCode,
      rrn: rrn,
      sameBank: sameBank,
      postilionDetails: postilionDetails,
      terminalDetails: terminalDetails,
      meezaDetails: meezaDetails,
      bnplDetails: bnplDetails,
      correlationId: correlationId,
      createdDate: createdDate,
      createdBy: createdBy,
      updatedDate: updatedDate,
      updatedBy: updatedBy,
      authenticationDetails: authenticationDetails,
      paymentMethod: PaymentMethod.fromJson(paymentMethod),
      codes: Codes.fromJson(codes),
    })
  }
}
