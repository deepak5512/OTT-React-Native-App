import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Expanded Dummy Data
const cabBookings = Array.from({ length: 15 }, (_, i) => ({
  id: `${i + 1}`,
  status: i % 2 === 0 ? "Confirmed" : "Cancelled",
  details: `Cab ride to destination ${i + 1}`,
  time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0")} ${i % 2 === 0 ? "AM" : "PM"}`,
}));

const busBookings = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 16}`,
  status: i % 3 === 0 ? "Completed" : "Confirmed",
  details: `Bus to City ${i + 1}`,
  time: `${Math.floor(Math.random() * 24)
    .toString()
    .padStart(2, "0")}:${Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0")}`,
}));

const tourBookings = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 36}`,
  status: i % 2 === 0 ? "Upcoming" : "Completed",
  details: `Tour to destination ${i + 1}`,
  time: `Nov ${Math.floor(Math.random() * 30) + 1}, 2024`,
}));

const BookedTickets = () => {
  const route = useRouter();
  const [selectedTab, setSelectedTab] = useState("cab");

  const renderItem = ({ item }: any) => (
    <View
      style={{
        backgroundColor: "#f8f8f8",
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 4,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#f0a500",
            borderRadius: 25,
            padding: 10,
            marginRight: 10,
          }}
        >
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={24}
            color="black"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
            {item.status}
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>{item.details}</Text>
        </View>
        <Text style={{ fontSize: 14, color: "#999" }}>{item.time}</Text>
      </View>
    </View>
  );

  const getData = () => {
    switch (selectedTab) {
      case "cab":
        return cabBookings;
      case "bus":
        return busBookings;
      case "tour":
        return tourBookings;
      default:
        return [];
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#fff" }}>
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
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 5,
            marginTop: 40,
          }}
        >
          Your Bookings
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Access All Your Bookings in One Place – Effortless and Organized!
        </Text>
      </View>
      <View style={{ flex: 1, padding: 12, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#eee",
            marginBottom: 20,
            padding: 1,
          }}
        >
          {["cab", "bus", "tour"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                {
                  flex: 1,
                  padding: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 30,
                },
                selectedTab === tab && {
                  backgroundColor: "#F9F9F9",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                },
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  { fontSize: 16, color: "#333" },
                  selectedTab === tab && { color: "#000", fontWeight: "bold" },
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={getData()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={{ paddingBottom: 100, marginBottom: 75 }}
        />
      </View>
    </View>
  );
};

export default BookedTickets;
