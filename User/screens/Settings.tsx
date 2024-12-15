import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const route = useRouter();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
      }}
    >
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
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 5,
            marginTop: 40,
          }}
        >
          Settings
        </Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            backgroundColor: "#fff",
            marginBottom: 10,
          }}
          onPress={() => route.push("/privacypolicy")}
        >
          <View
            style={{
              backgroundColor: "#1B1523",
              borderRadius: 10,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <MaterialIcons name="lock-outline" size={24} color="white" />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Read privacy policy
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#666",
                marginTop: 5,
              }}
            >
              See which permissions the app has access to
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#EDEDED",
          }}
        ></View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            backgroundColor: "#fff",
            marginBottom: 10,
          }}
          onPress={() => route.push("/appinfo")}
        >
          <View
            style={{
              backgroundColor: "#1B1523",
              borderRadius: 10,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              color="white"
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              App Information
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#666",
                marginTop: 5,
              }}
            >
              Learn about app features, version updates, and technical details
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#EDEDED",
          }}
        ></View>
      </View>
    </View>
  );
}
