import React from 'react'
import { View } from 'react-native'
import ThreeDS from './ThreeDS'
class ThreeDSScreen extends ThreeDS {
  constructor(props) {
    super(props)
    this.handle3DS = this.handle3DS.bind(this)
    this.state = {
      count: 0,
    };
  }

  handle3DS(nativeEvent, returnUrl) {
    console.log('onLoadProgress')
    //your code goes here
    console.log(nativeEvent)
    if(nativeEvent.url.includes ('callback') && nativeEvent.progress === 1) {
      this.state.count++
      console.log(this.state.count)
    }
    if (nativeEvent.url.startsWith(returnUrl)) {
      this.props.navigation.pop(1)
    }
    if (nativeEvent.url.includes ('callback') && nativeEvent.progress === 1 && this.state.count > 2) {
      console.log('Close 3DS Modal')
      this.state.count = 0
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
