import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { router, useRouter } from "expo-router";
import { Toast, useToast } from "react-native-toast-notifications";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const Login = () => {
  const [phone_number, setphone_number] = useState("");
  const [loading, setloading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const handleSubmit = async () => {
    if (phone_number === "" || countryCode === "") {
      Toast.show("Please fill the fields!", {
        placement: "bottom",
      });
    } else {
      setloading(true);
      const phoneNumber = `${countryCode}${phone_number}`;
      await axios
        .post(`${process.env.EXPO_PUBLIC_SERVER_URI}/driver/send-otp`, {
          phone_number: phoneNumber,
        })
        .then((res) => {
          setloading(false);
          const driver = {
            phone_number: phoneNumber,
          };
          router.push({
            pathname: "/numberVerification",
            params: driver,
          });
        })
        .catch((error) => {
          console.log(error);
          setloading(false);
          Toast.show(
            "Something went wrong! please re check your phone number!",
            {
              type: "danger",
              placement: "bottom",
            }
          );
        });
    }
  };

  return (
    <>
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
            width: 60,
            height: 60,
            borderRadius: 16,
            resizeMode: "cover",
            marginBottom: 20,
            marginTop: 50,
          }}
          resizeMode="contain"
        />

        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          Enter Your Phone Number
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            textAlign: "center",
          }}
        >
          Fill in your phone number to verify it and
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Login to your account
        </Text>
        <View
          style={{
            width: "100%",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#333",
              marginBottom: 5,
              marginTop: 30,
              fontWeight: "bold",
            }}
          >
            Mobile Number
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F5F5F5",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <AntDesign name="mobile1" size={24} color="black" />
            <TextInput
              placeholder="+91"
              style={{ fontSize: 18, marginLeft: 5 }}
            />
            <TextInput
              onChangeText={setphone_number}
              keyboardType="numeric"
              placeholder="Mobile Number"
              style={{
                flex: 1,
                fontSize: 18,
                marginLeft: 10,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: "#ddd",
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            width: "100%",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 20,
          }}
          disabled={loading}
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
    </>
  );
};

export default Login;
