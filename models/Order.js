import Address from './adress'
import PaymentIntent from './paymentIntent'
import PaymentMethod from './PaymentMethod'
import Transaction from './transaction'
export default class Order {
  static amount$ = 'Order.amount'
  static tipAmount$ = 'Order.tipAmount'
  static convenienceFeeAmount$ = 'Order.convenienceFeeAmount'
  static totalAmount$ = 'Order.totalAmount'
  static totalAuthorizedAmount$ = 'Order.totalAuthorizedAmount'
  static totalCapturedAmount$ = 'Order.totalCapturedAmount'
  static totalRefundedAmount$ = 'Order.totalRefundedAmount'
  static orderId$ = 'Order.orderId'
  static currency$ = 'Order.currency'
  static language$ = 'Order.language'
  static detailedStatus$ = 'Order.detailedStatus'
  static status$ = 'Order.status'
  static threeDSecureId$ = 'Order.threeDSecureId'
  static merchantId$ = 'Order.merchantId'
  static merchantPublicKey$ = 'Order.merchantPublicKey'
  static parentOrderId$ = 'Order.parentOrderId'
  static merchantReferenceId$ = 'Order.merchantReferenceId'
  static callbackUrl$ = 'Order.callbackUrl'
  static customerEmail$ = 'Order.customerEmail'
  static returnUrl$ = 'Order.returnUrl'
  static tokenId$ = 'Order.tokenId'
  static initiatedBy$ = 'Order.initiatedBy'
  static agreementId$ = 'Order.agreementId'
  static agreementType$ = 'Order.agreementType'
  static paymentOperation$ = 'Order.paymentOperation'
  static custom$ = 'Order.custom'
  static paymentMethods$ = 'Order.paymentMethods'
  static platform$ = 'Order.platform'
  static description$ = 'Order.description'
  static customerReferenceId$ = 'Order.customerReferenceId'
  static customerId$ = 'Order.customerId'
  static recurrence$ = 'Order.recurrence'
  static createdDate$ = 'Order.createdDate'
  static createdBy$ = 'Order.createdBy'
  static updatedDate$ = 'Order.updatedDate'
  static updatedBy$ = 'Order.updatedBy'
  static billingAddress$ = 'Order.billingAddress'
  static shippingAddress$ = 'Order.shippingAddress'
  static cardOnFile$ = 'Order.cardOnFile'
  static setDefaultPaymentMethod$ = 'Order.setDefaultPaymentMethod'
  static restrictPaymentMethods$ = 'Order.restrictPaymentMethods'
  static createCustomer$ = 'Order.createCustomer'
  static isTokenPayment$ = 'Order.isTokenPayment'
  static paymentIntent$ = 'Order.paymentIntent'
  static paymentMethod$ = 'Order.paymentMethod'
  static statementDescriptor$ = 'Order.statementDescriptor'
  static transactions$ = 'Order.transactions'

  constructor(opts) {
    let amount = opts && 'amount' in opts ? opts.amount : null
    let tipAmount = opts && 'tipAmount' in opts ? opts.tipAmount : null
    let convenienceFeeAmount =
      opts && 'convenienceFeeAmount' in opts ? opts.convenienceFeeAmount : null
    let totalAmount = opts && 'totalAmount' in opts ? opts.totalAmount : null
    let totalAuthorizedAmount =
      opts && 'totalAuthorizedAmount' in opts
        ? opts.totalAuthorizedAmount
        : null
    let totalCapturedAmount =
      opts && 'totalCapturedAmount' in opts ? opts.totalCapturedAmount : null
    let totalRefundedAmount =
      opts && 'totalRefundedAmount' in opts ? opts.totalRefundedAmount : null
    let orderId = opts && 'orderId' in opts ? opts.orderId : null
    let currency = opts && 'currency' in opts ? opts.currency : null
    let language = opts && 'language' in opts ? opts.language : null
    let detailedStatus =
      opts && 'detailedStatus' in opts ? opts.detailedStatus : null
    let status = opts && 'status' in opts ? opts.status : null
    let threeDSecureId =
      opts && 'threeDSecureId' in opts ? opts.threeDSecureId : null
    let merchantId = opts && 'merchantId' in opts ? opts.merchantId : null
    let merchantPublicKey =
      opts && 'merchantPublicKey' in opts ? opts.merchantPublicKey : null
    let parentOrderId =
      opts && 'parentOrderId' in opts ? opts.parentOrderId : null
    let merchantReferenceId =
      opts && 'merchantReferenceId' in opts ? opts.merchantReferenceId : null
    let callbackUrl = opts && 'callbackUrl' in opts ? opts.callbackUrl : null
    let customerEmail =
      opts && 'customerEmail' in opts ? opts.customerEmail : null
    let returnUrl = 'https://returnurl.com'
    let tokenId = opts && 'tokenId' in opts ? opts.tokenId : null
    let initiatedBy = opts && 'initiatedBy' in opts ? opts.initiatedBy : null
    let agreementId = opts && 'agreementId' in opts ? opts.agreementId : null
    let agreementType =
      opts && 'agreementType' in opts ? opts.agreementType : null
    let paymentOperation =
      opts && 'paymentOperation' in opts ? opts.paymentOperation : null
    let custom = opts && 'custom' in opts ? opts.custom : null
    let paymentMethods =
      opts && 'paymentMethods' in opts ? opts.paymentMethods : null
    let platform = opts && 'platform' in opts ? opts.platform : null
    let description = opts && 'description' in opts ? opts.description : null
    let customerReferenceId =
      opts && 'customerReferenceId' in opts ? opts.customerReferenceId : null
    let customerId = opts && 'customerId' in opts ? opts.customerId : null
    let recurrence = opts && 'recurrence' in opts ? opts.recurrence : null
    let createdDate = opts && 'createdDate' in opts ? opts.createdDate : null
    let createdBy = opts && 'createdBy' in opts ? opts.createdBy : null
    let updatedDate = opts && 'updatedDate' in opts ? opts.updatedDate : null
    let updatedBy = opts && 'updatedBy' in opts ? opts.updatedBy : null
    let billingAddress =
      opts && 'billingAddress' in opts ? opts.billingAddress : null
    let shippingAddress =
      opts && 'shippingAddress' in opts ? opts.shippingAddress : null
    let cardOnFile = opts && 'cardOnFile' in opts ? opts.cardOnFile : null
    let setDefaultPaymentMethod =
      opts && 'setDefaultPaymentMethod' in opts
        ? opts.setDefaultPaymentMethod
        : null
    let restrictPaymentMethods =
      opts && 'restrictPaymentMethods' in opts
        ? opts.restrictPaymentMethods
        : null
    let createCustomer =
      opts && 'createCustomer' in opts ? opts.createCustomer : null
    let isTokenPayment =
      opts && 'isTokenPayment' in opts ? opts.isTokenPayment : null
    let paymentIntent =
      opts && 'paymentIntent' in opts ? opts.paymentIntent : null
    let paymentMethod =
      opts && 'paymentMethod' in opts ? opts.paymentMethod : null
    let statementDescriptor =
      opts && 'statementDescriptor' in opts ? opts.statementDescriptor : null
    let transactions = opts && 'transactions' in opts ? opts.transactions : null

    this.amount = amount
    this.tipAmount = tipAmount
    this.convenienceFeeAmount = convenienceFeeAmount
    this.totalAmount = totalAmount
    this.totalAuthorizedAmount = totalAuthorizedAmount
    this.totalCapturedAmount = totalCapturedAmount
    this.totalRefundedAmount = totalRefundedAmount
    this.orderId = orderId
    this.currency = currency
    this.language = language
    this.detailedStatus = detailedStatus
    this.status = status
    this.threeDSecureId = threeDSecureId
    this.merchantId = merchantId
    this.merchantPublicKey = merchantPublicKey
    this.parentOrderId = parentOrderId
    this.merchantReferenceId = merchantReferenceId
    this.callbackUrl = callbackUrl
    this.customerEmail = customerEmail
    this.returnUrl = returnUrl
    this.tokenId = tokenId
    this.initiatedBy = initiatedBy
    this.agreementId = agreementId
    this.agreementType = agreementType
    this.paymentOperation = paymentOperation
    this.custom = custom
    this.paymentMethods = paymentMethods
    this.platform = platform
    this.description = description
    this.customerReferenceId = customerReferenceId
    this.customerId = customerId
    this.recurrence = recurrence
    this.createdDate = createdDate
    this.createdBy = createdBy
    this.updatedDate = updatedDate
    this.updatedBy = updatedBy
    this.billingAddress = billingAddress
    this.shippingAddress = shippingAddress
    this.cardOnFile = cardOnFile
    this.setDefaultPaymentMethod = setDefaultPaymentMethod
    this.restrictPaymentMethods = restrictPaymentMethods
    this.createCustomer = createCustomer
    this.isTokenPayment = isTokenPayment
    this.paymentIntent = paymentIntent
    this.paymentMethod = paymentMethod
    this.statementDescriptor = statementDescriptor
    this.transactions = transactions
  }
  get amount() {
    return this[Order.amount$]
  }
  set amount(value) {
    this[Order.amount$] = value
  }
  get tipAmount() {
    return this[Order.tipAmount$]
  }
  set tipAmount(value) {
    this[Order.tipAmount$] = value
  }
  get convenienceFeeAmount() {
    return this[Order.convenienceFeeAmount$]
  }
  set convenienceFeeAmount(value) {
    this[Order.convenienceFeeAmount$] = value
  }
  get totalAmount() {
    return this[Order.totalAmount$]
  }
  set totalAmount(value) {
    this[Order.totalAmount$] = value
  }
  get totalAuthorizedAmount() {
    return this[Order.totalAuthorizedAmount$]
  }
  set totalAuthorizedAmount(value) {
    this[Order.totalAuthorizedAmount$] = value
  }
  get totalCapturedAmount() {
    return this[Order.totalCapturedAmount$]
  }
  set totalCapturedAmount(value) {
    this[Order.totalCapturedAmount$] = value
  }
  get totalRefundedAmount() {
    return this[Order.totalRefundedAmount$]
  }
  set totalRefundedAmount(value) {
    this[Order.totalRefundedAmount$] = value
  }
  get orderId() {
    return this[Order.orderId$]
  }
  set orderId(value) {
    this[Order.orderId$] = value
  }
  get currency() {
    return this[Order.currency$]
  }
  set currency(value) {
    this[Order.currency$] = value
  }
  get language() {
    return this[Order.language$]
  }
  set language(value) {
    this[Order.language$] = value
  }
  get detailedStatus() {
    return this[Order.detailedStatus$]
  }
  set detailedStatus(value) {
    this[Order.detailedStatus$] = value
  }
  get status() {
    return this[Order.status$]
  }
  set status(value) {
    this[Order.status$] = value
  }
  get threeDSecureId() {
    return this[Order.threeDSecureId$]
  }
  set threeDSecureId(value) {
    this[Order.threeDSecureId$] = value
  }
  get merchantId() {
    return this[Order.merchantId$]
  }
  set merchantId(value) {
    this[Order.merchantId$] = value
  }
  get merchantPublicKey() {
    return this[Order.merchantPublicKey$]
  }
  set merchantPublicKey(value) {
    this[Order.merchantPublicKey$] = value
  }
  get parentOrderId() {
    return this[Order.parentOrderId$]
  }
  set parentOrderId(value) {
    this[Order.parentOrderId$] = value
  }
  get merchantReferenceId() {
    return this[Order.merchantReferenceId$]
  }
  set merchantReferenceId(value) {
    this[Order.merchantReferenceId$] = value
  }
  get callbackUrl() {
    return this[Order.callbackUrl$]
  }
  set callbackUrl(value) {
    this[Order.callbackUrl$] = value
  }
  get customerEmail() {
    return this[Order.customerEmail$]
  }
  set customerEmail(value) {
    this[Order.customerEmail$] = value
  }
  get returnUrl() {
    return this[Order.returnUrl$]
  }
  set returnUrl(value) {
    this[Order.returnUrl$] = value
  }
  get tokenId() {
    return this[Order.tokenId$]
  }
  set tokenId(value) {
    this[Order.tokenId$] = value
  }
  get initiatedBy() {
    return this[Order.initiatedBy$]
  }
  set initiatedBy(value) {
    this[Order.initiatedBy$] = value
  }
  get agreementId() {
    return this[Order.agreementId$]
  }
  set agreementId(value) {
    this[Order.agreementId$] = value
  }
  get agreementType() {
    return this[Order.agreementType$]
  }
  set agreementType(value) {
    this[Order.agreementType$] = value
  }
  get paymentOperation() {
    return this[Order.paymentOperation$]
  }
  set paymentOperation(value) {
    this[Order.paymentOperation$] = value
  }
  get custom() {
    return this[Order.custom$]
  }
  set custom(value) {
    this[Order.custom$] = value
  }
  get paymentMethods() {
    return this[Order.paymentMethods$]
  }
  set paymentMethods(value) {
    this[Order.paymentMethods$] = value
  }
  get platform() {
    return this[Order.platform$]
  }
  set platform(value) {
    this[Order.platform$] = value
  }
  get description() {
    return this[Order.description$]
  }
  set description(value) {
    this[Order.description$] = value
  }
  get customerReferenceId() {
    return this[Order.customerReferenceId$]
  }
  set customerReferenceId(value) {
    this[Order.customerReferenceId$] = value
  }
  get customerId() {
    return this[Order.customerId$]
  }
  set customerId(value) {
    this[Order.customerId$] = value
  }
  get recurrence() {
    return this[Order.recurrence$]
  }
  set recurrence(value) {
    this[Order.recurrence$] = value
  }
  get createdDate() {
    return this[Order.createdDate$]
  }
  set createdDate(value) {
    this[Order.createdDate$] = value
  }
  get createdBy() {
    return this[Order.createdBy$]
  }
  set createdBy(value) {
    this[Order.createdBy$] = value
  }
  get updatedDate() {
    return this[Order.updatedDate$]
  }
  set updatedDate(value) {
    this[Order.updatedDate$] = value
  }
  get updatedBy() {
    return this[Order.updatedBy$]
  }
  set updatedBy(value) {
    this[Order.updatedBy$] = value
  }
  get billingAddress() {
    return this[Order.billingAddress$]
  }
  set billingAddress(value) {
    this[Order.billingAddress$] = value
  }
  get shippingAddress() {
    return this[Order.shippingAddress$]
  }
  set shippingAddress(value) {
    this[Order.shippingAddress$] = value
  }
  get cardOnFile() {
    return this[Order.cardOnFile$]
  }
  set cardOnFile(value) {
    this[Order.cardOnFile$] = value
  }
  get setDefaultPaymentMethod() {
    return this[Order.setDefaultPaymentMethod$]
  }
  set setDefaultPaymentMethod(value) {
    this[Order.setDefaultPaymentMethod$] = value
  }
  get restrictPaymentMethods() {
    return this[Order.restrictPaymentMethods$]
  }
  set restrictPaymentMethods(value) {
    this[Order.restrictPaymentMethods$] = value
  }
  get createCustomer() {
    return this[Order.createCustomer$]
  }
  set createCustomer(value) {
    this[Order.createCustomer$] = value
  }
  get isTokenPayment() {
    return this[Order.isTokenPayment$]
  }
  set isTokenPayment(value) {
    this[Order.isTokenPayment$] = value
  }
  get paymentIntent() {
    return this[Order.paymentIntent$]
  }
  set paymentIntent(value) {
    this[Order.paymentIntent$] = value
  }
  get paymentMethod() {
    return this[Order.paymentMethod$]
  }
  set paymentMethod(value) {
    this[Order.paymentMethod$] = value
  }
  get statementDescriptor() {
    return this[Order.statementDescriptor$]
  }
  set statementDescriptor(value) {
    this[Order.statementDescriptor$] = value
  }
  get transactions() {
    return this[Order.transactions$]
  }
  set transactions(value) {
    this[Order.transactions$] = value
  }

  static fromJson(map) {
    if (map == null) {
      return null
    }
    let amount = map && 'amount' in map ? map.amount : null
    let tipAmount = map && 'tipAmount' in map ? map.tipAmount : null
    let convenienceFeeAmount =
      map && 'convenienceFeeAmount' in map ? map.convenienceFeeAmount : null
    let totalAmount = map && 'totalAmount' in map ? map.totalAmount : null
    let totalAuthorizedAmount =
      map && 'totalAuthorizedAmount' in map ? map.totalAuthorizedAmount : null
    let totalCapturedAmount =
      map && 'totalCapturedAmount' in map ? map.totalCapturedAmount : null
    let totalRefundedAmount =
      map && 'totalRefundedAmount' in map ? map.totalRefundedAmount : null
    let orderId = map && 'orderId' in map ? map.orderId : null
    let currency = map && 'currency' in map ? map.currency : null
    let language = map && 'language' in map ? map.language : null
    let detailedStatus =
      map && 'detailedStatus' in map ? map.detailedStatus : null
    let status = map && 'status' in map ? map.status : null
    let threeDSecureId =
      map && 'threeDSecureId' in map ? map.threeDSecureId : null
    let merchantId = map && 'merchantId' in map ? map.merchantId : null
    let merchantPublicKey =
      map && 'merchantPublicKey' in map ? map.merchantPublicKey : null
    let parentOrderId = map && 'parentOrderId' in map ? map.parentOrderId : null
    let merchantReferenceId =
      map && 'merchantReferenceId' in map ? map.merchantReferenceId : null
    let callbackUrl = map && 'callbackUrl' in map ? map.callbackUrl : null
    let customerEmail = map && 'customerEmail' in map ? map.customerEmail : null
    let returnUrl = map && 'returnUrl' in map ? map.returnUrl : null
    let tokenId = map && 'tokenId' in map ? map.tokenId : null
    let initiatedBy = map && 'initiatedBy' in map ? map.initiatedBy : null
    let agreementId = map && 'agreementId' in map ? map.agreementId : null
    let agreementType = map && 'agreementType' in map ? map.agreementType : null
    let paymentOperation =
      map && 'paymentOperation' in map ? map.paymentOperation : null
    let custom = map && 'custom' in map ? map.custom : null
    let paymentMethods =
      map && 'paymentMethods' in map ? map.paymentMethods : null
    let platform = map && 'platform' in map ? map.platform : null
    let description = map && 'description' in map ? map.description : null
    let customerReferenceId =
      map && 'customerReferenceId' in map ? map.customerReferenceId : null
    let customerId = map && 'customerId' in map ? map.customerId : null
    let recurrence = map && 'recurrence' in map ? map.recurrence : null
    let createdDate = map && 'createdDate' in map ? map.createdDate : null
    let createdBy = map && 'createdBy' in map ? map.createdBy : null
    let updatedDate = map && 'updatedDate' in map ? map.updatedDate : null
    let updatedBy = map && 'updatedBy' in map ? map.updatedBy : null
    let billingAddress =
      map && 'billingAddress' in map ? map.billingAddress : null
    let shippingAddress =
      map && 'shippingAddress' in map ? map.shippingAddress : null
    let cardOnFile = map && 'cardOnFile' in map ? map.cardOnFile : null
    let setDefaultPaymentMethod =
      map && 'setDefaultPaymentMethod' in map
        ? map.setDefaultPaymentMethod
        : null
    let restrictPaymentMethods =
      map && 'restrictPaymentMethods' in map ? map.restrictPaymentMethods : null
    let createCustomer =
      map && 'createCustomer' in map ? map.createCustomer : null
    let isTokenPayment =
      map && 'isTokenPayment' in map ? map.isTokenPayment : null
    let paymentIntent = map && 'paymentIntent' in map ? map.paymentIntent : null
    let paymentMethod = map && 'paymentMethod' in map ? map.paymentMethod : null
    let statementDescriptor =
      map && 'statementDescriptor' in map ? map.statementDescriptor : null
    let transactions = map && 'transactions' in map ? map.transactions : null
    transactions = transactions != null ? transactions : []
    transactions.forEach((element, index) => {
      transactions[index] = Transaction.fromJson(element)
    })
    return new Order({
      amount: amount,
      tipAmount: tipAmount,
      convenienceFeeAmount: convenienceFeeAmount,
      totalAmount: totalAmount,
      totalAuthorizedAmount: totalAuthorizedAmount,
      totalCapturedAmount: totalCapturedAmount,
      totalRefundedAmount: totalRefundedAmount,
      orderId: orderId,
      currency: currency,
      language: language,
      detailedStatus: detailedStatus,
      status: status,
      threeDSecureId: threeDSecureId,
      merchantId: merchantId,
      merchantPublicKey: merchantPublicKey,
      parentOrderId: parentOrderId,
      merchantReferenceId: merchantReferenceId,
      callbackUrl: callbackUrl,
      customerEmail: customerEmail,
      returnUrl: returnUrl,
      tokenId: tokenId,
      initiatedBy: initiatedBy,
      agreementId: agreementId,
      agreementType: agreementType,
      paymentOperation: paymentOperation,
      custom: custom,
      paymentMethods: paymentMethods,
      platform: platform,
      description: description,
      customerReferenceId: customerReferenceId,
      customerId: customerId,
      recurrence: recurrence,
      createdDate: createdDate,
      createdBy: createdBy,
      updatedDate: updatedDate,
      updatedBy: updatedBy,
      cardOnFile: cardOnFile,
      setDefaultPaymentMethod: setDefaultPaymentMethod,
      restrictPaymentMethods: restrictPaymentMethods,
      createCustomer: createCustomer,
      isTokenPayment: isTokenPayment,
      statementDescriptor: statementDescriptor,
      transactions: transactions,
      billingAddress: Address.fromJson(billingAddress),
      shippingAddress: Address.fromJson(shippingAddress),
      paymentIntent: PaymentIntent.fromJson(paymentIntent),
      paymentMethod: PaymentMethod.fromJson(paymentMethod),
    })
  }
}
