import ApiResponse from './base/ApiResponse'
import Order from '../models/Order'
export default class OrderApiResponse extends ApiResponse {
  static order$ = 'OrderApiResponse.order'

  constructor(opts) {
    super(opts)
    let order = opts && 'order' in opts ? opts.order : null
    this.order = order
  }
  get order() {
    return this[OrderApiResponse.order$]
  }
  set order(value) {
    this[OrderApiResponse.order$] = value
  }
  static fromJson(map) {
    let response = super.fromJson(map)
    let order = map && 'order' in map ? map.order : null
    if (response != null) {
      response.order = Order.fromJson(order)
    }
    return response
  }
}
