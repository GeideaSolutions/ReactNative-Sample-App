import ApiResponse from './base/ApiResponse'

export default class AuthenticationApiResponse extends ApiResponse {
  static orderId$ = 'ApiResponse.orderId'
  static threeDSecureId$ = 'ApiResponse.threeDSecureId'
  static html$ = 'ApiResponse.html'

  constructor(opts) {
    super(opts)
    let orderId = opts && 'orderId' in opts ? opts.orderId : null
    let threeDSecureId =
      opts && 'threeDSecureId' in opts ? opts.threeDSecureId : null
    let html = opts && 'html' in opts ? opts.html : null
    this.orderId = orderId
    this.threeDSecureId = threeDSecureId
    this.html = html
  }
  get orderId() {
    return this[AuthenticationApiResponse.orderId$]
  }
  set orderId(value) {
    this[AuthenticationApiResponse.orderId$] = value
  }
  get threeDSecureId() {
    return this[AuthenticationApiResponse.threeDSecureId$]
  }
  set threeDSecureId(value) {
    this[AuthenticationApiResponse.threeDSecureId$] = value
  }
  static fromJson(map) {
    let response = super.fromJson(map)
    let orderId = map && 'orderId' in map ? map.orderId : null
    let threeDSecureId =
      map && 'threeDSecureId' in map ? map.threeDSecureId : null
    let redirectHtml = map && 'redirectHtml' in map ? map.redirectHtml : null
    let htmlBodyContent =
      map && 'htmlBodyContent' in map ? map.htmlBodyContent : null

    if (response != null) {
      response.orderId = orderId
      response.threeDSecureId = threeDSecureId
      if (redirectHtml != null) {
        response.html = redirectHtml
      }
      if (htmlBodyContent != null) {
        response.html = htmlBodyContent
      }
    }
    return response
  }
}
