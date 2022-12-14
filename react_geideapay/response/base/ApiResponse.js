export default class ApiResponse {
  static responseCode$ = 'ApiResponse.responseCode'
  static detailedResponseCode$ = 'ApiResponse.detailedResponseCode'
  static responseMessage$ = 'ApiResponse.responseMessage'
  static detailedResponseMessage$ = 'ApiResponse.detailedResponseMessage'
  static language$ = 'ApiResponse.language'

  constructor(opts) {
    let responseCode = opts && 'responseCode' in opts ? opts.responseCode : null
    let detailedResponseCode =
      opts && 'detailedResponseCode' in opts ? opts.detailedResponseCode : null
    let responseMessage =
      opts && 'responseMessage' in opts ? opts.responseMessage : null
    let detailedResponseMessage =
      opts && 'detailedResponseMessage' in opts
        ? opts.detailedResponseMessage
        : null
    let language = opts && 'language' in opts ? opts.language : null
    this.responseCode = responseCode
    this.detailedResponseCode = detailedResponseCode
    this.responseMessage = responseMessage
    this.detailedResponseMessage = detailedResponseMessage
    this.language = language
  }
  get responseCode() {
    return this[ApiResponse.responseCode$]
  }
  set responseCode(value) {
    this[ApiResponse.responseCode$] = value
  }
  get detailedResponseCode() {
    return this[ApiResponse.detailedResponseCode$]
  }
  set detailedResponseCode(value) {
    this[ApiResponse.detailedResponseCode$] = value
  }
  get responseMessage() {
    return this[ApiResponse.responseMessage$]
  }
  set responseMessage(value) {
    this[ApiResponse.responseMessage$] = value
  }
  get detailedResponseMessage() {
    return this[ApiResponse.detailedResponseMessage$]
  }
  set detailedResponseMessage(value) {
    this[ApiResponse.detailedResponseMessage$] = value
  }
  get language() {
    return this[ApiResponse.language$]
  }
  set language(value) {
    this[ApiResponse.language$] = value
  }
  static fromJson(map) {
    if (map == null) {
      return null
    }
    let responseCode = map && 'responseCode' in map ? map.responseCode : null
    let detailedResponseCode =
      map && 'detailedResponseCode' in map ? map.detailedResponseCode : null
    let responseMessage =
      map && 'responseMessage' in map ? map.responseMessage : null
    let detailedResponseMessage =
      map && 'detailedResponseMessage' in map
        ? map.detailedResponseMessage
        : null
    return new ApiResponse({
      responseCode: responseCode,
      detailedResponseCode: detailedResponseCode,
      responseMessage: responseMessage,
      detailedResponseMessage: detailedResponseMessage,
    })
  }
}
