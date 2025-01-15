//
//  FridaCheckModule.swift
//  exampleReactGeideaPayApp
//
//  Created by NAGARAJU TADISETTI on 1/1/2025.
//

import Foundation


@objc(FridaCheckModule)
class FridaCheckModule: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
        return true
  }

  @objc
  static func moduleName() -> String {
    return "FridaCheckModule"
  }
  
  @objc
  func getName() -> String {
    return "FridaCheckModule"
  }
  
  @objc
      func testFunction(_ resolve: @escaping RCTPromiseResolveBlock,rejecter reject: @escaping RCTPromiseRejectBlock) {
        print("testing frida");
          // Your logic here
          let result = "FridaCheckModule"
          // Resolve the promise with the result
          resolve(result)
          
          // If there's an error, use reject (optional)
          // reject("error_code", "Error message", nil)
      }
  
  @objc
      func isFridaRunning() -> Bool {
          // Check for Frida Gadget
          let handle = dlopen("FridaGadget.dylib", RTLD_LAZY)
          if handle != nil {
              dlclose(handle)
              return true
          }

          // Check for common Frida server ports
          var buffer = stat()
          if stat("/tmp/frida-server", &buffer) == 0 {
              return true
          }

          return false
      }

      @objc
      func isFridaDetected(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
          let isDetected = isFridaRunning()
          if isDetected {
              resolve(true)
          } else {
              resolve(false)
          }
      }
  
}
