import React from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const AppInfo = () => {
  const route = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 40,
          justifyContent: "flex-start",
        }}
      >
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#F7F7F7",
            borderRadius: 15,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => route.back()}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color="black" />
        </TouchableOpacity>
        <Image
          source={require("D:/OTT/User/assets/images/logo.png")}
          style={{
            width: 40,
            height: 40,
            marginLeft: 10,
            borderRadius: 16,
            resizeMode: "cover",
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 10,
            color: "#000",
          }}
        >
          OTT
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Image
          source={require("D:/OTT/User/assets/images/logo.png")}
          style={{
            width: 60,
            height: 60,
            borderRadius: 5,
            resizeMode: "cover",
          }}
        />

        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#000" }}>
          Om rejseplanen
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "#666",
            paddingHorizontal: 30,
            marginTop: 10,
          }}
        >
          Rejseplanen er en af Danmarks største onlinetjenester med al info om
          din rejse fra A til B med kollektiv trafik.
        </Text>
      </View>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#EDEDED",
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 25,
            borderBottomWidth: 1,
            borderBottomColor: "#EDEDED",
          }}
        >
          <Text style={{ fontSize: 16, color: "#A0A0A0" }}>App version</Text>
          <Text style={{ fontSize: 16, color: "#000" }}>7.6.0</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 25,
            borderBottomWidth: 1,
            borderBottomColor: "#EDEDED",
          }}
        >
          <Text style={{ fontSize: 16, color: "#A0A0A0" }}>License</Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontSize: 16, color: "#000" }}>
              Læs license aftale
            </Text>
            <FontAwesome
              name="chevron-right"
              size={18}
              color="#000"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 25,
          }}
        >
          <Text style={{ fontSize: 16, color: "#A0A0A0" }}>Anmeld app</Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontSize: 16, color: "#000" }}>
              Giv din mening til kende
            </Text>
            <FontAwesome
              name="chevron-right"
              size={18}
              color="#000"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#EDEDED",
          }}
        ></View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#EDEDED",
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 25,
            borderBottomWidth: 1,
            borderBottomColor: "#EDEDED",
          }}
        >
          <Text style={{ fontSize: 16, color: "#A0A0A0" }}>Developers</Text>
          <View>
            <Text style={{ fontSize: 16, color: "#000" }}>Deepak Bhatter</Text>
            <Text style={{ fontSize: 16, color: "#000" }}>Tushar Bhatt</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AppInfo;
