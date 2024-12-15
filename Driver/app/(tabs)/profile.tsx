import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import React from "react";
import {
  AntDesign,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import { useGetDriverData } from "@/hooks/useGetDriverData";

const profile = () => {
  const route = useRouter();
  const toast = useToast();
  const { driver, loading } = useGetDriverData();
  console.log(driver);

  if (loading) {
    return;
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      toast.show("Logged out successfully!", {
        type: "success",
        placement: "bottom",
        duration: 3000,
      });
      route.push("/");
    } catch (error) {
      console.log("Error removing token:", error);
      toast.show("Failed to log out. Please try again.", {
        type: "danger",
        placement: "bottom",
        duration: 3000,
      });
    }
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
      <ImageBackground
        source={require("D:/OTT/Driver/assets/images/profilebgott.png")}
        style={{
          alignItems: "center",
          marginBottom: 30,
          backgroundColor: "#FFD966",
          paddingVertical: 60,
          borderRadius: 10,
        }}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={{
            position: "relative",
          }}
        >
          <Image
            source={require("D:/OTT/Driver/assets/images/profilepicture.png")}
            style={{
              width: 130,
              height: 130,
              borderRadius: 80,
              backgroundColor: "#e0e0e0",
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "#000",
              borderRadius: 15,
              padding: 5,
            }}
          >
            <FontAwesome name="camera" size={18} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 20,
            fontSize: 18,
            fontWeight: "600",
            color: "#333",
          }}
        >
          See Your Profile Below
        </Text>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: -20,
            right: 20,
            backgroundColor: "#F0F0F0",
            padding: 10,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: "#FFD966",
          }}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </ImageBackground>
      <ScrollView
        style={{ paddingHorizontal: 20, paddingBottom: 100, marginBottom: 120 }}
      >
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#333",
              marginBottom: 8,
            }}
          >
            Full Name
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F5F5F5",
              paddingVertical: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
          >
            <AntDesign name="user" size={22} color="black" />

            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                color: "#333",
              }}
            >
              {driver?.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#333",
              marginBottom: 8,
            }}
          >
            Email Address
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F5F5F5",
              paddingVertical: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
          >
            <Fontisto name="email" size={24} color="black" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                color: "#333",
              }}
            >
              {driver?.email}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#333",
              marginBottom: 8,
            }}
          >
            Mobile Number
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F5F5F5",
              paddingVertical: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
          >
            <SimpleLineIcons name="screen-smartphone" size={22} color="black" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                color: "#333",
              }}
            >
              {driver?.phone_number}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#333",
              marginBottom: 8,
            }}
          >
            Registration Number
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F5F5F5",
              paddingVertical: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
          >
            <FontAwesome name="registered" size={24} color="black" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                color: "#333",
              }}
            >
              {driver?.registration_number}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#333",
              marginBottom: 8,
            }}
          >
            Registration Date
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F5F5F5",
              paddingVertical: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
          >
            <Fontisto name="date" size={24} color="black" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                color: "#333",
              }}
            >
              {driver?.registration_date}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#333",
              marginBottom: 8,
            }}
          >
            Vehicle Color
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F5F5F5",
              paddingVertical: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
          >
            <Ionicons name="color-palette-outline" size={24} color="black" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                color: "#333",
              }}
            >
              {driver?.vehicle_color}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#333",
              marginBottom: 8,
            }}
          >
            Driving License Number
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F5F5F5",
              paddingVertical: 15,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
          >
            <FontAwesome name="drivers-license-o" size={24} color="black" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                flex: 1,
                color: "#333",
              }}
            >
              {driver?.driving_license}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default profile;
