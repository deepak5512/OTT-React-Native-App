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
import { useRouter } from "expo-router";

const Signup = () => {
  const router = useRouter();
  const [emailFormatWarning, setEmailFormatWarning] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    country: "India",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const isEmailEmpty = formData.email.trim() === "";
    const isEmailInvalid = !isEmailEmpty && emailFormatWarning !== "";

    if (isEmailEmpty) {
      setShowWarning(true);
    } else if (isEmailInvalid) {
      setShowWarning(true);
    } else {
      setShowWarning(false);

      const phone_number = `+91${formData.phoneNumber}`;

      const driverData = {
        name: formData.name,
        country: formData.country,
        phone_number: phone_number,
        email: formData.email,
      };
      router.push({
        pathname: "/documentVerification",
        params: driverData,
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
        source={require("D:/OTT/Driver/assets/images/Group1.png")}
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
        Driver Information
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
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
            style={{
              flex: 1,
              fontSize: 18,
              marginLeft: 10,
            }}
          />
          {showWarning && (
            <p style={{ color: "red" }}>User Name is required!</p>
          )}
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
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            style={{
              flex: 1,
              fontSize: 18,
              marginLeft: 10,
            }}
          />
          {showWarning && (
            <p style={{ color: "red" }}>Email Address is required!</p>
          )}
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
            value={formData.phoneNumber}
            onChangeText={(text) => handleChange("phoneNumber", text)}
            style={{
              flex: 1,
              fontSize: 18,
              marginLeft: 10,
            }}
          />
          {showWarning && (
            <p style={{ color: "red" }}>Phone number is required!</p>
          )}
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
          onPress={handleSubmit}
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

export default Signup;
