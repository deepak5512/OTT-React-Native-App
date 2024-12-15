import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const LoggedInWelcome = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("D:/OTT/Driver/assets/images/bg.png")}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: 28,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("D:/OTT/Driver/assets/images/logo.png")}
          style={{
            width: 60,
            height: 60,
            borderRadius: 18,
            resizeMode: "cover",
            marginBottom: 8,
          }}
        />
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          We are now with you all the way
        </Text>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          regardless of where you are traveling in
        </Text>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          India
        </Text>
      </View>
      <View style={{ paddingHorizontal: 22 }}>
        <Button
          onPress={() => router.push("/home")}
          title="Plan Your Journey"
          style={{
            width: "100%",
            marginBottom: 30,
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default LoggedInWelcome;
