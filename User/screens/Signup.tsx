import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";

const Signup = () => {
  const [phone_number, setPhone_number] = useState("");
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setloading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (phone_number === "" || countryCode === "") {
      toast.show("Please fill the fields!", {
        placement: "bottom",
      });
    } else {
      setloading(true);
      const phoneNumber = `${countryCode}${phone_number}`;
      await axios
        .post("http://172.31.119.98:8000/api/v1/registration", {
          phone_number: phoneNumber,
        })
        .then((res) => {
          setloading(false);
          router.push({
            pathname: "/numberVerification",
            params: { phoneNumber },
          });
        })
        .catch((error) => {
          console.log(error);
          setloading(false);
          toast.show(
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
          source={require("D:/OTT/User/assets/images/Group1.png")}
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
          create your new account
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
              onChangeText={setPhone_number}
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

export default Signup;
