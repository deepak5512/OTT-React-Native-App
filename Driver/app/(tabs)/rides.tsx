import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import RideCard from "@/components/RideCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { windowHeight, windowWidth } from "@/themes/app.constant";

const rides = () => {
  const [recentRides, setrecentRides] = useState([]);
  const route = useRouter();

  const getRecentRides = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const res = await axios.get(
      `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/get-rides`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setrecentRides(res.data.rides);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 40,
          justifyContent: "space-between",
          backgroundColor: "#ffce48",
          paddingHorizontal: 20,
          paddingBottom: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
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
            source={require("D:/OTT/Driver/assets/images/logo.png")}
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
      </View>
      <View
        style={{
          paddingHorizontal: windowWidth(20),
          paddingTop: windowHeight(5),
          paddingBottom: windowHeight(10),
        }}
      >
        <ScrollView>
          {recentRides?.map((item: any, index: number) => (
            <RideCard item={item} key={index} />
          ))}
          {recentRides?.length === 0 && (
            <Text>You didn't take any ride yet!</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default rides;
