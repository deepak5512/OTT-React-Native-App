import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { Toast, useToast } from "react-native-toast-notifications";
import OTPTextInput from "react-native-otp-textinput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NumberVerification = () => {
  const driver = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async () => {
    if (otp === "") {
      Toast.show("Please fill the fields!", {
        placement: "bottom",
      });
    } else {
      if (driver.name) {
        setLoader(true);
        const otpNumbers = `${otp}`;
        await axios
          .post(`${process.env.EXPO_PUBLIC_SERVER_URI}/driver/verify-otp`, {
            phone_number: driver.phone_number,
            otp: otpNumbers,
            ...driver,
          })
          .then((res) => {
            const driverData = {
              ...driver,
              token: res.data.token,
            };
            setLoader(false);
            router.push({
              pathname: "/emailVerification",
              params: driverData,
            });
          })
          .catch((error) => {
            Toast.show("Your otp is incorrect or expired!", {
              placement: "bottom",
              type: "danger",
            });
          });
      } else {
        setLoader(true);
        const otpNumbers = `${otp}`;
        await axios
          .post(`${process.env.EXPO_PUBLIC_SERVER_URI}/driver/login`, {
            phone_number: driver.phone_number,
            otp: otpNumbers,
          })
          .then(async (res) => {
            setLoader(false);
            await AsyncStorage.setItem("accessToken", res.data.accessToken);
            router.push("/(tabs)/home");
          })
          .catch((error) => {
            Toast.show("Your otp is incorrect or expired!", {
              placement: "bottom",
              type: "danger",
            });
          });
      }
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
        source={require("D:/OTT/Driver/assets/images/logo.png")}
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
        handleTextChange={(code) => setOtp(code)}
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

export default NumberVerification;
