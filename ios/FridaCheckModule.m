//
//  FridaCheckModule.m
//  exampleReactGeideaPayApp
//
//  Created by NAGARAJU TADISETTI on 1/1/2025.
//

#import <Foundation/Foundation.h>
//#import "React/RCTBridgeModule.h"
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(FridaCheckModule, NSObject)

RCT_EXTERN_METHOD(testFunction:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isFridaDetected:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
