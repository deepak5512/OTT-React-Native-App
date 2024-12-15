import React from "react";
import { Image, ImageBackground, StatusBar, Text, View } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("D:/OTT/Driver/assets/images/bg.png")}
      style={{
        flex: 1,
      }}
    >
      <View>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 280,
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("D:/OTT/Driver/assets/images/logo.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 16,
                resizeMode: "cover",
              }}
            />
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              {" "}
              OTT
            </Text>
          </View>
          <Text
            style={{
              fontSize: 45,
              fontWeight: 800,
              color: "#222222",
            }}
          >
            Plan your next
          </Text>
          <Text
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: "#222222",
            }}
          >
            trip
          </Text>
          <View
            style={{
              marginVertical: 22,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#222222",
                marginVertical: 4,
              }}
            >
              No matter where in India you are traveling to,
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#222222",
              }}
            >
              we will help you find the best route for you.
            </Text>
          </View>
          <Button
            onPress={() => router.push("/login")}
            title="Login"
            color="#000"
            style={{
              marginTop: 22,
              width: "100%",
            }}
          />
          <Button
            onPress={() => router.push("/signup")}
            title="Signup"
            color="#ff8811"
            filled
            style={{
              marginTop: 22,
              width: "100%",
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Welcome;
