import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import SwitchToggle from "react-native-switch-toggle";
import { windowHeight, windowWidth } from "@/themes/app.constant";

interface HeaderProps {
  isOn: boolean;
  toggleSwitch: () => void;
}

export default function Header({ isOn, toggleSwitch }: HeaderProps) {
  return (
    <View
      style={{
        backgroundColor: "#ffce48",
        paddingHorizontal: windowWidth(10),
        paddingTop: windowHeight(25),
        width: "100%",
        height: windowHeight(115),
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          marginHorizontal: windowWidth(10),
          marginTop: windowHeight(10),
        }}
      >
        <View
          style={{
            justifyContent: "space-between",

            alignItems: "center",
            paddingTop: windowHeight(3),
            flexDirection: "row",
          }}
        >
          <Image
            source={require("D:/OTT/Driver/assets/images/logo.png")}
            style={{
              width: 45,
              height: 45,
              marginLeft: 10,
              borderRadius: 12,
              resizeMode: "cover",
            }}
          />
        </View>
        <View
          style={{
            height: windowHeight(28),
            width: "100%",
            marginVertical: windowHeight(5),
            borderRadius: 25,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: windowWidth(10),

            backgroundColor: "#fff",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: windowWidth(2),
            }}
          >
            <Text style={{ color: isOn ? "green" : "#000" }}>
              {isOn ? "On" : "Off"}
            </Text>
            <Text>
              *You are {isOn ? "available" : "not available"} for ride now!
            </Text>
          </View>
          <View
            style={{
              height: windowHeight(20),
              width: windowHeight(45),
              borderWidth: 2,
              borderRadius: 25,
              borderColor: "rgba(149, 143, 159, 0.00)",
            }}
          >
            <SwitchToggle
              switchOn={isOn}
              onPress={toggleSwitch}
              containerStyle={{
                height: windowHeight(20),
                width: windowWidth(55),
                borderRadius: 25,
                padding: windowWidth(8),
                borderColor: "#665CFF",
              }}
              circleStyle={{
                height: windowHeight(15),
                width: windowWidth(25),
                borderRadius: 20,
              }}
              backgroundColorOff="#F5F5F5"
              backgroundColorOn="#F5F5F5"
              circleColorOn="#665CFF"
              circleColorOff="#000"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
