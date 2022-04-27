export default class Codes {
  static acquirerCode$ = 'Codes.acquirerCode'
  static acquirerMessage$ = 'Codes.acquirerMessage'
  static responseCode$ = 'Codes.responseCode'
  static responseMessage$ = 'Codes.responseMessage'
  static detailedResponseCode$ = 'Codes.detailedResponseCode'
  static detailedResponseMessage$ = 'Codes.detailedResponseMessage'

  constructor(opts) {
    let acquirerCode = opts && 'acquirerCode' in opts ? opts.acquirerCode : null
    let acquirerMessage =
      opts && 'acquirerMessage' in opts ? opts.acquirerMessage : null
    let responseCode = opts && 'responseCode' in opts ? opts.responseCode : null
    let responseMessage =
      opts && 'responseMessage' in opts ? opts.responseMessage : null
    let detailedResponseCode =
      opts && 'detailedResponseCode' in opts ? opts.detailedResponseCode : null
    let detailedResponseMessage =
      opts && 'detailedResponseMessage' in opts
        ? opts.detailedResponseMessage
        : null
    this.acquirerCode = acquirerCode
    this.acquirerMessage = acquirerMessage
    this.responseCode = responseCode
    this.responseMessage = responseMessage
    this.detailedResponseCode = detailedResponseCode
    this.detailedResponseMessage = detailedResponseMessage
  }
  get acquirerCode() {
    return this[Codes.acquirerCode$]
  }
  set acquirerCode(value) {
    this[Codes.acquirerCode$] = value
  }
  get acquirerMessage() {
    return this[Codes.acquirerMessage$]
  }
  set acquirerMessage(value) {
    this[Codes.acquirerMessage$] = value
  }
  get responseCode() {
    return this[Codes.responseCode$]
  }
  set responseCode(value) {
    this[Codes.responseCode$] = value
  }
  get responseMessage() {
    return this[Codes.responseMessage$]
  }
  set responseMessage(value) {
    this[Codes.responseMessage$] = value
  }
  get detailedResponseCode() {
    return this[Codes.detailedResponseCode$]
  }
  set detailedResponseCode(value) {
    this[Codes.detailedResponseCode$] = value
  }
  get detailedResponseMessage() {
    return this[Codes.detailedResponseMessage$]
  }
  set detailedResponseMessage(value) {
    this[Codes.detailedResponseMessage$] = value
  }
  static fromJson(map) {
    if (map == null) {
      return null
    }
    let acquirerCode = map && 'acquirerCode' in map ? map.acquirerCode : null
    let acquirerMessage =
      map && 'acquirerMessage' in map ? map.acquirerMessage : null
    let responseCode = map && 'responseCode' in map ? map.responseCode : null
    let responseMessage =
      map && 'responseMessage' in map ? map.responseMessage : null
    let detailedResponseCode =
      map && 'detailedResponseCode' in map ? map.detailedResponseCode : null
    let detailedResponseMessage =
      map && 'detailedResponseMessage' in map
        ? map.detailedResponseMessage
        : null
    return new Codes({
      acquirerCode: acquirerCode,
      acquirerMessage: acquirerMessage,
      responseCode: responseCode,
      responseMessage: responseMessage,
      detailedResponseCode: detailedResponseCode,
      detailedResponseMessage: detailedResponseMessage,
    })
  }
}
