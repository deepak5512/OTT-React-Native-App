import { windowHeight, windowWidth } from "@/themes/app.constant";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

export default function Tours() {
  const route = useRouter();

  const [tours, setTours] = useState();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URI}/tours`
        );

        setTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  const ExperienceCard = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        route.push({
          pathname: "/tourPackage",
          params: {item_id: item.id},
        });
      }}
      style={{
        backgroundColor: "#fff",
        borderRadius: 15,
        marginRight: 15,
        padding: 10,
        width: windowWidth(300),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: "100%",
          height: windowHeight(150),
          borderRadius: 10,
        }}
      />
      <Text
        style={{
          color: "#000",
          fontSize: 16,
          fontWeight: "bold",
          marginVertical: 5,
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          color: "#666",
          fontSize: 14,
        }}
      >
        {item.type} • {item.reviews} reviews
      </Text>
      <Text
        style={{
          color: "#000",
          fontSize: 16,
          marginTop: 5,
        }}
      >
        From {item.price} per adult
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: windowHeight(20),
      }}
    >
      <Text
        style={{
          color: "#000",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Top experiences on OTT
      </Text>
      <Text
        style={{
          color: "#555",
          fontSize: 16,
          marginBottom: 20,
        }}
      >
        The best tours, activities and tickets
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={tours}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <ExperienceCard item={item} />;
        }}
        horizontal={true}
        style={{
          marginBottom: windowHeight(200),
        }}
      />
    </View>
  );
}
