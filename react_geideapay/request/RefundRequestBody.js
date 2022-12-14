import PostPayOperationRequestBody from './base/PostPayOperationRequestBody.js'

export default class RefundRequestBody extends PostPayOperationRequestBody {
  constructor(_orderId, opts) {
    super(_orderId, opts)
  }
}
