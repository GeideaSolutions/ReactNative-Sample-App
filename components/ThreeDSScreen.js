import React from 'react'
import { View } from 'react-native'
import ThreeDS from './ThreeDS'
class ThreeDSScreen extends ThreeDS {
  constructor(props) {
    super(props)
    this.handle3DS = this.handle3DS.bind(this)
  }

  handle3DS(nativeEvent, returnUrl) {
    console.log('onLoadProgress')
    //your code goes here
    console.log(nativeEvent.url)
    if (nativeEvent.url.startsWith(returnUrl)) {
      this.props.navigation.pop(1)
    }
  }

  render() {
    const { params } = this.props.route
    const content = params ? params.content : null
    const returnUrl = params ? params.returnUrl : null
    return this.Web3DS(content, returnUrl, this.handle3DS)
  }
}

export default ThreeDSScreen
