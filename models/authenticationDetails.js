export default class AuthenticationDetails {
  static acsEci$ = 'AuthenticationDetails.acsEci'
  static authenticationToken$ = 'AuthenticationDetails.authenticationToken'
  static paResStatus$ = 'AuthenticationDetails.paResStatus'
  static veResEnrolled$ = 'AuthenticationDetails.veResEnrolled'
  static xid$ = 'AuthenticationDetails.xid'
  static accountAuthenticationValue$ =
    'AuthenticationDetails.accountAuthenticationValue'
  static proofXml$ = 'AuthenticationDetails.proofXml'

  constructor(opts) {
    let acsEci = opts && 'acsEci' in opts ? opts.acsEci : null
    let authenticationToken =
      opts && 'authenticationToken' in opts ? opts.authenticationToken : null
    let paResStatus = opts && 'paResStatus' in opts ? opts.paResStatus : null
    let veResEnrolled =
      opts && 'veResEnrolled' in opts ? opts.veResEnrolled : null
    let xid = opts && 'xid' in opts ? opts.xid : null
    let accountAuthenticationValue =
      opts && 'accountAuthenticationValue' in opts
        ? opts.accountAuthenticationValue
        : null
    let proofXml = opts && 'proofXml' in opts ? opts.proofXml : null

    this.acsEci = acsEci
    this.authenticationToken = authenticationToken
    this.paResStatus = paResStatus
    this.veResEnrolled = veResEnrolled
    this.xid = xid
    this.accountAuthenticationValue = accountAuthenticationValue
    this.proofXml = proofXml
  }
  get acsEci() {
    return this[AuthenticationDetails.acsEci$]
  }
  set acsEci(value) {
    this[AuthenticationDetails.acsEci$] = value
  }
  get authenticationToken() {
    return this[AuthenticationDetails.authenticationToken$]
  }
  set authenticationToken(value) {
    this[AuthenticationDetails.authenticationToken$] = value
  }
  get paResStatus() {
    return this[AuthenticationDetails.paResStatus$]
  }
  set paResStatus(value) {
    this[AuthenticationDetails.paResStatus$] = value
  }
  get veResEnrolled() {
    return this[AuthenticationDetails.veResEnrolled$]
  }
  set veResEnrolled(value) {
    this[AuthenticationDetails.veResEnrolled$] = value
  }
  get xid() {
    return this[AuthenticationDetails.xid$]
  }
  set xid(value) {
    this[AuthenticationDetails.xid$] = value
  }
  get accountAuthenticationValue() {
    return this[AuthenticationDetails.accountAuthenticationValue$]
  }
  set accountAuthenticationValue(value) {
    this[AuthenticationDetails.accountAuthenticationValue$] = value
  }
  get proofXml() {
    return this[AuthenticationDetails.proofXml$]
  }
  set proofXml(value) {
    this[AuthenticationDetails.proofXml$] = value
  }
  static fromJson(map) {
    if (map == null) {
      return null
    }
    let acsEci = map && 'acsEci' in map ? map.acsEci : null
    let authenticationToken =
      map && 'authenticationToken' in map ? map.authenticationToken : null
    let paResStatus = map && 'paResStatus' in map ? map.paResStatus : null
    let veResEnrolled = map && 'veResEnrolled' in map ? map.veResEnrolled : null
    let xid = map && 'xid' in map ? map.xid : null
    let accountAuthenticationValue =
      map && 'accountAuthenticationValue' in map
        ? map.accountAuthenticationValue
        : null
    let proofXml = map && 'proofXml' in map ? map.proofXml : null
    return new AuthenticationDetails({
      acsEci: acsEci,
      authenticationToken: authenticationToken,
      paResStatus: paResStatus,
      veResEnrolled: veResEnrolled,
      xid: xid,
      accountAuthenticationValue: accountAuthenticationValue,
      proofXml: proofXml,
    })
  }
}
