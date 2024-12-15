import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const Taxi = () => {
  const route = useRouter();

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 25,
      }}
      onPress={() => route.push("/ridePlan")}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F3F4F1",
          padding: 10,
          flex: 1,
          borderRadius: 25,
        }}
      >
        <FontAwesome
          name="search"
          size={20}
          color="black"
          style={{
            marginRight: 10,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            color: "#8e8e8e",
          }}
        >
          Where to?
        </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 110,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 25,
        }}
      >
        <FontAwesome name="clock-o" size={20} color="black" />
        <Text
          style={{
            marginHorizontal: 5,
            fontSize: 16,
          }}
        >
          Now
        </Text>
        <FontAwesome name="chevron-down" size={15} color="black" />
      </View>
      </View>

    </TouchableOpacity>
  );
};

export default Taxi;
