import PostPayOperationRequestBody from './base/PostPayOperationRequestBody.js'

export default class CaptureRequestBody extends PostPayOperationRequestBody {
  constructor(_orderId, opts) {
    super(_orderId, opts)
  }
}
