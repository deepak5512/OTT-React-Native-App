import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";

const DocumentVerification = () => {
  const driverData = useLocalSearchParams();
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicleType: "Car",
    registrationNumber: "",
    registrationDate: "",
    drivingLicenseNumber: "",
    color: "",
    rate: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const driver = {
      ...driverData,
      vehicle_type: formData.vehicleType,
      registration_number: formData.registrationNumber,
      registration_date: formData.registrationDate,
      driving_license: formData.drivingLicenseNumber,
      vehicle_color: formData.color,
      rate: formData.rate,
    };

    await axios
      .post(`${process.env.EXPO_PUBLIC_SERVER_URI}/driver/send-otp`, {
        phone_number: `+${driverData.phone_number}`,
      })
      .then((res) => {
        router.push({
          pathname: "/numberVerification",
          params: driver,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Toast.show(error.message, {
          placement: "bottom",
          type: "danger",
        });
      });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <StatusBar barStyle="dark-content" />
        <Image
          source={require("D:/OTT/Driver/assets/images/Group2.png")}
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
          Fill in some details about your car to
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
            Registration Number
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
            <FontAwesome name="registered" size={24} color="black" />
            <TextInput
              placeholder="Enter you Vehicle Registration Number"
              keyboardType="number-pad"
              style={{
                flex: 1,
                fontSize: 16,
                marginLeft: 10,
              }}
              value={formData.registrationNumber}
              onChangeText={(text) => handleChange("registrationNumber", text)}
            />
            {showWarning && (
              <p style={{ color: "red" }}>Registration number is required!</p>
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
            Registration Date
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
            <Fontisto name="date" size={24} color="black" />
            <TextInput
              placeholder="DD-MM-YYYY"
              style={{
                flex: 1,
                fontSize: 16,
                marginLeft: 10,
              }}
              value={formData.registrationDate}
              onChangeText={(text) => handleChange("registrationDate", text)}
            />
            {showWarning && (
              <p style={{ color: "red" }}>Registration Date is required!</p>
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
            Driving License Number
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
            <FontAwesome name="drivers-license-o" size={24} color="black" />
            <TextInput
              placeholder="Enter your Driving License Number"
              style={{
                flex: 1,
                fontSize: 16,
                marginLeft: 10,
              }}
              keyboardType="number-pad"
              value={formData.drivingLicenseNumber}
              onChangeText={(text) =>
                handleChange("drivingLicenseNumber", text)
              }
            />
            {showWarning && (
              <p style={{ color: "red" }}>
                Driving License Number is required!
              </p>
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
            Vehicle Color
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
            <Ionicons name="color-palette-outline" size={24} color="black" />
            <TextInput
              placeholder="Enter your Vehicle Color"
              style={{
                flex: 1,
                fontSize: 16,
                marginLeft: 10,
              }}
              value={formData.color}
              onChangeText={(text) => handleChange("color", text)}
            />
            {showWarning && (
              <p style={{ color: "red" }}>Vehicle Color is required!</p>
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
            Rate per km
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
            <Ionicons name="pricetags-outline" size={24} color="black" />
            <TextInput
              placeholder="Charge from passenger per km"
              style={{
                flex: 1,
                fontSize: 16,
                marginLeft: 10,
              }}
              keyboardType="number-pad"
              value={formData.rate}
              onChangeText={(text) => handleChange("rate", text)}
            />
            {showWarning && (
              <p style={{ color: "red" }}>Rate per km is required!</p>
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
    </ScrollView>
  );
};

export default DocumentVerification;
