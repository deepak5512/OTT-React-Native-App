import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import Taxi from "./Taxi";
import Tours from "./Tours";

export default function Travel() {
  const [selected, setSelected] = useState("Tours");
  const renderSelectedComponent = () => {
    switch (selected) {
      case "Tours":
        return <Tours />;
      case "Bus":
        return <Text>You selected Bus. Here's the Bus component!</Text>;
      case "Taxi":
        return <Taxi />;
      default:
        return null;
    }
  };

  const scaleAnim = new Animated.Value(1);

  const animatePress = () => {
    scaleAnim.setValue(0.9);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const IconButton = ({ icon, iconName, isSelected, onPress }: any) => (
    <Pressable
      onPress={() => {
        animatePress();
        onPress();
      }}
      style={[
        {
          width: 60,
          height: 60,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        },
        isSelected && {
          backgroundColor: "#fef2b2",
          borderColor: "black",
          borderWidth: 2,
        },
      ]}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {icon}
      </Animated.View>
    </Pressable>
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 40,
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          backgroundColor: "#ffce48",
          paddingBottom: 10,
        }}
      >
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
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            height: 80,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "#ffce48",
            paddingVertical: 10,
          }}
        >
          <IconButton
            icon={
              <MaterialIcons name="travel-explore" size={30} color="black" />
            }
            isSelected={selected === "Tours"}
            onPress={() => setSelected("Tours")}
          />
          <IconButton
            icon={<Ionicons name="bus" size={30} color="black" />}
            isSelected={selected === "Bus"}
            onPress={() => setSelected("Bus")}
          />
          <IconButton
            icon={<MaterialIcons name="local-taxi" size={30} color="black" />}
            isSelected={selected === "Taxi"}
            onPress={() => setSelected("Taxi")}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
          }}
        >
          {renderSelectedComponent()}
        </View>
      </View>
    </View>
  );
}
