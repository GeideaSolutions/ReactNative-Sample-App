import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
class ThreeDS extends Component {
  constructor(props) {
    super(props)
  }

  LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    )
  }

  Web3DS(content, returnUrl, checkLoadProgress) {
    return (
      <WebView
        source={{ html: content }}
        renderLoading={this.LoadingIndicatorView}
        ref={(WEBVIEW_REF) => (this.WebViewRef = WEBVIEW_REF)}
        startInLoadingState={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadProgress={({ nativeEvent }) =>
          checkLoadProgress(nativeEvent, returnUrl)
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default ThreeDS
