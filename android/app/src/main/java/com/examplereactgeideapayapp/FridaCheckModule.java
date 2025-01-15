package com.examplereactgeideapayapp;


import android.app.ActivityManager;
import android.content.Context;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.io.File;

public class FridaCheckModule extends ReactContextBaseJavaModule {
    private final Context mContext;
    FridaCheckModule(@NonNull ReactApplicationContext reactContext){
        super(reactContext);
        mContext = reactContext;
    }
    @ReactMethod
    public void isFridaDetected(Promise promise) {
        boolean detected = isFridaRunning();
        promise.resolve(detected);
    }

    public boolean isFridaRunning() {
        String[] suspiciousProcesses = {"frida-server", "gadget"};
        ActivityManager activityManager = (ActivityManager) mContext.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningAppProcessInfo processInfo : activityManager.getRunningAppProcesses()) {
            for (String suspicious : suspiciousProcesses) {
                if (processInfo.processName.contains(suspicious)) {
                    return true;
                }
            }
        }

        // Check for Frida-related files
        File fridaFile = new File("/data/local/tmp/frida-server");
        return fridaFile.exists();
    }



    @NonNull
    @Override
    public String getName() {
        return "FridaCheckModule";
    }
}
