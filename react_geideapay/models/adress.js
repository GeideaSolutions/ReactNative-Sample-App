import BaseRequestBody from '../request/base/BaseRequestBody'
export default class Address {
  static countryCode$ = '_countryCode'
  static street$ = '_street'
  static city$ = '_city'
  static postCode$ = '_postCode'

  constructor(opts) {
    let countryCode = opts && 'countryCode' in opts ? opts.countryCode : null
    let street = opts && 'street' in opts ? opts.street : null
    let city = opts && 'city' in opts ? opts.city : null
    let postCode = opts && 'postCode' in opts ? opts.postCode : null
    this.countryCode = countryCode
    this.street = street
    this.city = city
    this.postCode = postCode
  }

  get countryCode() {
    return this[Address.countryCode$]
  }
  set countryCode(value) {
    this[Address.countryCode$] = value
  }
  get street() {
    return this[Address.street$]
  }
  set street(value) {
    this[Address.street$] = value
  }
  get city() {
    return this[Address.city$]
  }
  set city(value) {
    this[Address.city$] = value
  }
  get postCode() {
    return this[Address.postCode$]
  }
  set postCode(value) {
    this[Address.postCode$] = value
  }

  toMap() {
    let params = {}
    if (this.countryCode != null) {
      params[BaseRequestBody.fieldCountryCode] = this.countryCode
    }
    if (this.street != null) {
      params[BaseRequestBody.fieldStreet] = this.street
    }
    if (this.city != null) {
      params[BaseRequestBody.fieldCity] = this.city
    }
    if (this.postCode != null) {
      params[BaseRequestBody.fieldPostCode] = this.postCode
    }
    return params
  }

  static fromJson(map) {
    if (map == null) {
      return null
    }
    let countryCode = map && 'countryCode' in map ? map.countryCode : null
    let street = map && 'street' in map ? map.street : null
    let city = map && 'city' in map ? map.city : null
    let postCode = map && 'postCode' in map ? map.postCode : null
    return new Address({
      countryCode: countryCode,
      street: street,
      city: city,
      postCode: postCode,
    })
  }
}
