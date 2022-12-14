export default class paymentIntent {
  static id$ = 'PaymentIntent.id'
  static type$ = 'PaymentIntent.type'

  constructor(opts) {
    let id = opts && 'id' in opts ? opts.id : null
    let type = opts && 'type' in opts ? opts.type : null
    this.id = id
    this.type = type
  }
  get id() {
    return this[paymentIntent.id$]
  }
  set id(value) {
    this[paymentIntent.id$] = value
  }
  get type() {
    return this[paymentIntent.type$]
  }
  set type(value) {
    this[paymentIntent.type$] = value
  }
  static fromJson(map) {
    if (map == null) {
      return null
    }
    let id = map && 'id' in map ? map.id : null
    let type = map && 'type' in map ? map.type : null
    return new paymentIntent({
      id: id,
      type: type,
    })
  }
}
