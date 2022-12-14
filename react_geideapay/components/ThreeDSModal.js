import React from 'react'
import { Modal } from 'react-native'
import ThreeDS from './ThreeDS'
class ThreeDSModal extends ThreeDS {
  constructor(props) {
    super(props)
    this._handleCloseModal = this._handleCloseModal.bind(this)
    this.handle3DS = this.handle3DS.bind(this)
    this.state = {
      count: 0,
    };
  }

  _handleCloseModal() {
    this.props.onRequestClose()
  }

  handle3DS(nativeEvent, returnUrl) {
    const { onRequestClose } = this.props
    console.log('onLoadProgress')
    //your code goes here
    console.log(nativeEvent)
    if(nativeEvent.url.includes ('callback') && nativeEvent.progress === 1) {
      this.state.count++
      console.log(this.state.count)
    }
    if (nativeEvent.url.startsWith(returnUrl)) {
      console.log('Close 3DS Modal')
      this.state.count = 0
      return onRequestClose()
    }
    if (nativeEvent.url.includes ('callback') && nativeEvent.progress === 1 && this.state.count > 2) {
      console.log('Close 3DS Modal')
      this.state.count = 0
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
