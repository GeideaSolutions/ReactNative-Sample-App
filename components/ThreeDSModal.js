import React from 'react'
import { Modal } from 'react-native'
import ThreeDS from './ThreeDS'
class ThreeDSModal extends ThreeDS {
  constructor(props) {
    super(props)
    this._handleCloseModal = this._handleCloseModal.bind(this)
    this.handle3DS = this.handle3DS.bind(this)
  }

  _handleCloseModal() {
    this.props.onRequestClose()
  }

  handle3DS(nativeEvent, returnUrl) {
    const { onRequestClose } = this.props
    console.log('onLoadProgress')
    //your code goes here
    console.log(nativeEvent.url)
    if (nativeEvent.url.startsWith(returnUrl)) {
      console.log('Close 3DS Modal')
      return onRequestClose()
    }
  }

  render() {
    const { visible, content, returnUrl } = this.props
    return (
      <Modal animationType="slide" transparent={false} visible={visible}>
        {this.Web3DS(content, returnUrl, this.handle3DS)}
      </Modal>
    )
  }
}

export default ThreeDSModal;
