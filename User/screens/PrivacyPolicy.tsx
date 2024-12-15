import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const PrivacyPolicy = ({ navigation }: any) => {
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
      <View style={{ padding: 16, marginTop: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 8,
            color: "#000",
          }}
        >
          Privacy and cookie policy
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#666",
            marginBottom: 24,
          }}
        >
          This is how we process personal data at OTT
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 8,
            color: "#000",
          }}
        >
          OTT
        </Text>
      </View>
      <ScrollView style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 14,
            color: "#666",
            lineHeight: 22,
            marginBottom: 16,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: "#666",
            lineHeight: 22,
            marginBottom: 16,
          }}
        >
          Under afsnittet ” Dine rettigheder”. Hvis du vælger at trække dit
          samtykke tilbage, påvirker det ikke lovligheden af vores behandling af
          dine personoplysninger på baggrund af det tidligere samtykke.
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#666",
            lineHeight: 22,
            marginBottom: 16,
          }}
        >
          Under afsnittet ” Dine rettigheder”. Hvis du vælger at trække dit
          samtykke tilbage, påvirker det ikke lovligheden af vores behandling af
          dine personoplysninger på baggrund af det tidligere samtykke.
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#666",
            lineHeight: 22,
            marginBottom: 16,
          }}
        >
          Under afsnittet ” Dine rettigheder”. Hvis du vælger at trække dit
          samtykke tilbage, påvirker det ikke lovligheden af vores behandling af
          dine personoplysninger på baggrund af det tidligere samtykke.
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#666",
            lineHeight: 22,
            marginBottom: 16,
          }}
        >
          Under afsnittet ” Dine rettigheder”. Hvis du vælger at trække dit
          samtykke tilbage, påvirker det ikke lovligheden af vores behandling af
          dine personoplysninger på baggrund af det tidligere samtykke.
        </Text>
      </ScrollView>
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#1F192C",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={() => route.back()}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrivacyPolicy;
