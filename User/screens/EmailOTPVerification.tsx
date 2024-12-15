import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React, { useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";

const EmailOTPVerification = () => {
  const [loader, setLoader] = useState(false);
  const [OTP, setOTP] = useState("");
  const { user } = useLocalSearchParams() as any;
  const parsedUser = JSON.parse(user);

  const handleSubmit = async () => {
    setLoader(true);
    const otpNumbers = `${OTP}`;
    await axios
      .put(`${process.env.EXPO_PUBLIC_SERVER_URI}/email-otp-verify`, {
        token: parsedUser.token,
        otp: otpNumbers,
      })
      .then(async (res: any) => {
        setLoader(false);
        await AsyncStorage.setItem("accessToken", res.data.accessToken);
        router.push("/(tabs)/travel");
      })
      .catch((error) => {
        setLoader(false);
        Toast.show(error.message, {
          placement: "bottom",
          type: "danger",
        });
      });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="dark-content" />
      <Image
        source={require("D:/OTT/User/assets/images/Group4.png")}
        style={{
          width: 150,
          height: 60,
          marginBottom: 10,
          marginTop: 40,
        }}
        resizeMode="contain"
      />

      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        Enter the Code
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#666",
          textAlign: "center",
        }}
      >
        We have sent you a confirmation code
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#666",
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        on your Email
      </Text>
      <OTPTextInput
        inputCount={4}
        handleTextChange={(code) => setOTP(code)}
        textInputStyle={{
          borderWidth: 0.5,
          borderRadius: 6,
          borderBottomWidth: 0.5,
        }}
        autoFocus={false}
      />
      <Text
        style={{
          textAlign: "center",
          color: "#777",
          marginTop: 20,
        }}
      >
        Haven't received your code?
      </Text>
      <TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: 20,
          }}
        >
          Send the code again
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: "#ddd",
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            width: "100%",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 20,
            marginLeft: 10,
          }}
          disabled={loader}
          onPress={() => handleSubmit()}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailOTPVerification;
