import React from "react";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

export default function _layout() {
  return (
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
          name="login/index"
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
          name="documentVerification/index"
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
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ToastProvider>
  );
}
