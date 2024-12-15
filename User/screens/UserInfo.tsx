import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome6, Fontisto } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";

const UserInfo = () => {
  const router = useRouter();
  const { user } = useLocalSearchParams() as any;
  const parsedUser = JSON.parse(user);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(`${process.env.EXPO_PUBLIC_SERVER_URI}/email-otp-request`, {
        email: formData.email,
        name: formData.name,
        userId: parsedUser.id,
      })
      .then((res) => {
        setLoading(false);
        const userData: any = {
          id: parsedUser.id,
          name: formData.name,
          email: formData.email,
          phone_number: parsedUser.phone_number,
          token: res.data.token,
        };
        router.push({
          pathname: "/emailVerification",
          params: { user: JSON.stringify(userData) },
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
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
        source={require("D:/OTT/User/assets/images/Group3.png")}
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
        User Information
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#666",
          textAlign: "center",
        }}
      >
        Fill in some details about yourself to
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#666",
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        create your new account.
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
            fontWeight: "bold",
          }}
        >
          User Name
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
          <FontAwesome6 name="user" size={24} color="black" />
          <TextInput
            placeholder="User Name"
            style={{
              flex: 1,
              fontSize: 18,
              marginLeft: 10,
            }}
            onChangeText={(text) => handleChange("name", text)}
          />
        </View>
      </View>

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
            fontWeight: "bold",
          }}
        >
          Email
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
          <Fontisto name="email" size={24} color="black" />
          <TextInput
            placeholder="Email"
            onChangeText={(text) => handleChange("email", text)}
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
          width: "100%",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#333",
            marginBottom: 5,
            fontWeight: "bold",
          }}
        >
          Phone Number
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
            placeholder="Phone Number"
            value={parsedUser?.phone_number}
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

export default UserInfo;
