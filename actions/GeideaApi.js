import base64 from 'react-native-base64'
import AuthenticationApiResponse from '../response/AuthenticationApiResponse'
import OrderApiResponse from '../response/OrderApiResponse'
const ROOT_URL = 'https://api.merchant.geidea.net/pgw/api'

const InitiateAuthentication_URL = `${ROOT_URL}/v3/direct/authenticate/initiate`
const AuthenticatePayer_URL = `${ROOT_URL}/v3/direct/authenticate/payer`
const DirectPay_URL = `${ROOT_URL}/v1/direct/pay`
const PayWithToken_URL = `${ROOT_URL}/v1/direct/pay/token`
const Cancel_URL = `${ROOT_URL}/v1/direct/cancel`
const Capture_URL = `${ROOT_URL}/v1/direct/capture`
const Refund_URL = `${ROOT_URL}/v1/direct/refund`
const VoidOperation_URL = `${ROOT_URL}/v1/direct/refund`

const processRequest = (path, method, data, publicKey, apiPassword) => {
  const url = path
  var utf8 = require('utf8')
  const utf8Bytes = utf8.encode(publicKey + ':' + apiPassword)
  const credentials = base64.encode(utf8Bytes)

  return fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: 'Basic ' + credentials,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((err) => {
      console.log('Error in fetch' + err)
      throw err
    })
}

class GeideaApi {
  static _processPayment(url, publicKey, apiPassword, payload) {
    return new Promise((resolve, reject) => {
      processRequest(url, 'POST', payload, publicKey, apiPassword)
        .then((res) => {
          console.log(res)
          if (
            res.detailedResponseCode != null &&
            res.detailedResponseCode === '000'
          ) {
            resolve(res)
          } else if (
            res.detailedResponseCode != null &&
            res.detailedResponseCode !== '000'
          ) {
            resolve(res)
          } else {
            reject(res.title)
          }
        })
        .catch((err) => {
          console.log('err:' + err)
          reject(err)
        })
    })
  }

  static initiateAuthentication(
    initiateAuthenticationRequestBody,
    PublicKey,
    ApiPassword
  ) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        InitiateAuthentication_URL,
        PublicKey,
        ApiPassword,
        initiateAuthenticationRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = AuthenticationApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static payerAuthentication(
    payerAuthenticationRequestBody,
    PublicKey,
    ApiPassword,
    navigationProp
  ) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        AuthenticatePayer_URL,
        PublicKey,
        ApiPassword,
        payerAuthenticationRequestBody.paramsMap()
      )
      let status =
        apiResponse.responseMessage != null
          ? apiResponse.responseMessage.toLowerCase()
          : null
      let code =
        apiResponse.responseCode != null
          ? apiResponse.responseCode.toLowerCase()
          : null
      if (status === 'success' && code === '000') {
        console.log(apiResponse.htmlBodyContent)
        let htmlBodyContent = apiResponse.htmlBodyContent.replace(
          'target="redirectTo3ds1Frame"',
          'target="_top"'
        )
        if (navigationProp) {
          navigationProp.push('Browser', {
            title: '3DS',
            content: htmlBodyContent,
            returnUrl: payerAuthenticationRequestBody.returnUrl,
          })
        }
      }
      console.log('apiResponse ' + apiResponse)
      return apiResponse
    }
    if (navigationProp == null) {
      return processPayment()
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse.catch((err) => {
        console.log('err:' + err)
        myReject(err)
      })
      navigationProp.addListener('focus', () => {
        apiResponse
          .then((res) => {
            let response = AuthenticationApiResponse.fromJson(res)
            if (response.responseCode === '000') {
              myResolve(response)
            } else {
              myReject(response.detailedResponseMessage)
            }
          })
          .catch((err) => {
            console.log('apiResponse error ' + err)
            myReject(err)
          })
      })
    })
    return myPromise
  }

  static payDirect(payDirectRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        DirectPay_URL,
        PublicKey,
        ApiPassword,
        payDirectRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static payWithToken(payTokenRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        PayWithToken_URL,
        PublicKey,
        ApiPassword,
        payTokenRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static refund(refundRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        Refund_URL,
        PublicKey,
        ApiPassword,
        refundRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static cancel(cancelRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        Cancel_URL,
        PublicKey,
        ApiPassword,
        cancelRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static voidOperation(refundRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        VoidOperation_URL,
        PublicKey,
        ApiPassword,
        refundRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static capture(captureRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        Capture_URL,
        PublicKey,
        ApiPassword,
        captureRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }
}

export default GeideaApi
