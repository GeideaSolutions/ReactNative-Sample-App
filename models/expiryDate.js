import BaseRequestBody from '../request/base/BaseRequestBody'
export default class expiryDate {
  static month$ = '_month'
  static year$ = '_year'
  constructor(_month, _year) {
    this.month = _month
    this.year = _year
  }

  get month() {
    return this[expiryDate.month$]
  }
  set month(value) {
    this[expiryDate.month$] = value
  }
  get year() {
    return this[expiryDate.year$]
  }
  set year(value) {
    this[expiryDate.year$] = value
  }

  toMap() {
    let params = {}
    if (this.month != null) {
      params[BaseRequestBody.fieldMonth] = this.month
    }
    if (this.year != null) {
      params[BaseRequestBody.fieldYear] = this.year
    }
    return params
  }

  static fromJson(map) {
    if (map == null) {
      return null
    }
    let month = map && 'month' in map ? map.month : null
    let year = map && 'year' in map ? map.year : null
    return new expiryDate({
      month: month,
      year: year,
    })
  }
}
