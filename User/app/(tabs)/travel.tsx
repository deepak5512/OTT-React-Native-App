import { View, Text, Alert, BackHandler } from "react-native";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import Travel from "@/screens/Travel";

export default function TravelPage() {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit App",
          "Do you want to exit the app?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  return (
    <Travel />
  );
}
