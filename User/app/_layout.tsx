import React from "react";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function _layout() {
  return (
    <GestureHandlerRootView>
    <ToastProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="welcome/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="loggedInWelcome/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ridePlan/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="numberVerification/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="emailVerification/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[missing]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="userInfo/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="privacypolicy/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="appinfo/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tourPackage/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ToastProvider>
    </GestureHandlerRootView>
  );
}
