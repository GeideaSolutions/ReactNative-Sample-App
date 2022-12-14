import PostPayOperationRequestBody from './base/PostPayOperationRequestBody.js'

export default class CancelRequestBody extends PostPayOperationRequestBody {
  constructor(_orderId, _reason, opts) {
    if (opts == null) {
      super(_orderId, { reason: _reason })
    } else {
      opts.reason = _reason
      super(_orderId, opts)
    }
  }
}
