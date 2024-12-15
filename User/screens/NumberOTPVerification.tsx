import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import OTPTextInput from "react-native-otp-textinput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

const NumberOTPVerification = () => {
  const route = useRouter();
  const [OTP, setOTP] = useState("");
  const [loader, setLoader] = useState(false);
  const { phoneNumber } = useLocalSearchParams();
  const toast = useToast();

  const handleSubmit = async () => {
    if (OTP === "") {
      toast.show("Please fill the fields!", {
        placement: "bottom",
      });
    } else {
      setLoader(true);
      const otpNumbers = `${OTP}`;
      await axios
        .post(`${process.env.EXPO_PUBLIC_SERVER_URI}/verify-otp`, {
          phone_number: phoneNumber,
          otp: otpNumbers,
        })
        .then(async (res) => {
          setLoader(false);
          if (res.data.user.email === null) {
            route.push({
              pathname: "/userInfo",
              params: { user: JSON.stringify(res.data.user) },
            });
            toast.show("Account verified!");
          } else {
            await AsyncStorage.setItem("accessToken", res.data.accessToken);
            route.push("/(tabs)/travel");
          }
        })
        .catch((error) => {
          setLoader(false);
          toast.show("Something went wrong! please re check your otp!", {
            type: "danger",
            placement: "bottom",
          });
        });
    }
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
        source={require("D:/OTT/User/assets/images/Group2.png")}
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
        on your phone number
      </Text>
      <OTPTextInput
        inputCount={6}
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

export default NumberOTPVerification;
