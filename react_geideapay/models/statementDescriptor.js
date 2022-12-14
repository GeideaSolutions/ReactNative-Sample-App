export default class StatementDescriptor {
  static name$ = 'StatementDescriptor.name'
  static phone$ = 'StatementDescriptor.phone'

  constructor(opts) {
    let name = opts && 'name' in opts ? opts.name : null
    let phone = opts && 'phone' in opts ? opts.phone : null
    this.name = name
    this.phone = phone
  }
  get name() {
    return this[StatementDescriptor.name$];
  }
  set name(value) {
    this[StatementDescriptor.name$] = value;
  }
  get phone() {
    return this[StatementDescriptor.phone$];
  }
  set phone(value) {
    this[StatementDescriptor.phone$] = value;
  }
  static fromJson(map) {
    if (map == null) {
      return null
    }
    let name = map && 'name' in map ? map.name : null;
    let phone = map && 'phone' in map ? map.phone : null;
    return new StatementDescriptor({
      name: name,
      phone: phone,
    })
  }
}
