import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { AntDesign, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "@/themes/app.constant";

export default function RideCard({ item }: { item: any }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.main,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={[styles.top, { backgroundColor: colors.background }]}>
        <View style={[styles.alignment, { flexDirection: "row" }]}>
          <View style={[styles.profile, { flexDirection: "row" }]}>
            <Image
              source={require("../assets/images/userImage.png")}
              style={styles.userimage}
            />
            <Text style={[styles.userName, { color: colors.text }]}>
              {item?.user?.name}
            </Text>
          </View>
          <View style={styles.rate}>
            <AntDesign name="staro" size={24} color="black" />
            <Text style={[styles.rating, { color: colors.text }]}>5</Text>
            <View
              style={[styles.verticalBorder, { borderColor: colors.border }]}
            />
            <Text style={styles.price}>BDT {item.charge}</Text>
          </View>
        </View>
        <View style={[styles.alignment, { flexDirection: "row" }]}>
          <Text style={styles.timing}>{item.cratedAt?.slice(0, 10)}</Text>
          <View style={styles.rate}>
            <EvilIcons name="location" size={24} color="black" />
            <Text style={[styles.distance, { color: colors.text }]}>
              {item.distance}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.bottom,
          styles.alignment,
          { backgroundColor: colors.background },
        ]}
      >
        <View style={{ flexDirection: "row", height: "auto" }}>
          <View style={styles.leftView}>
            <EvilIcons name="location" size={24} color="black" />
            <View style={[styles.verticaldot, { borderColor: "#474747" }]} />
            <MaterialIcons name="gps-fixed" size={24} color="black" />
          </View>
          <View style={styles.rightView}>
            <Text style={[styles.pickup, { color: colors.text }]}>
              {item.currentLocationName}
            </Text>
            <Text style={[styles.drop, { color: colors.text }]}>
              {item.destinationLocationName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: windowWidth(5),
    marginVertical: 5,
  },
  top: {
    flex: 1,
    marginBottom: windowHeight(1.5),
    paddingHorizontal: windowWidth(3),
    borderRadius: 5,
    paddingVertical: windowHeight(5),
  },
  alignment: {
    justifyContent: "space-between",
  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
  },
  userimage: {
    height: windowHeight(35),
    width: windowWidth(35),
    resizeMode: "contain",
  },
  userName: {
    marginHorizontal: windowWidth(5),
    fontSize: 16,
  },
  rate: {
    flexDirection: "row",
    marginHorizontal: windowWidth(5),
    justifyContent: "center",
    alignItems: "center",
  },
  rating: {
    marginHorizontal: windowWidth(5),
    fontSize: 16,
  },
  verticalBorder: {
    borderLeftWidth: 1,
    height: windowHeight(15),
    marginHorizontal: windowWidth(5),
  },
  price: {
    color: "#665CFF",
    marginHorizontal: windowWidth(0.4),
    fontSize: 16,
  },
  border: {
    borderStyle: "dashed",
    borderBottomWidth: 5,
    borderColor: "#E9E9E9",
    marginVertical: windowHeight(1.5),
  },
  timing: {
    color: "#8f8f8f",
    fontSize: 16,
  },
  distance: {
    fontSize: 14,
  },
  bottom: {
    flex: 1,
    paddingHorizontal: windowWidth(5),
    borderRadius: 5,
    paddingVertical: windowHeight(5),
  },
  leftView: {
    marginRight: windowWidth(5),
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: windowHeight(3),
    marginTop: windowHeight(4),
  },
  rightView: {
    marginTop: windowHeight(5),
  },
  verticaldot: {
    borderLeftWidth: 1,
    height: windowHeight(20),
    marginHorizontal: 5,
  },
  pickup: {
    fontSize: 16,
  },
  drop: {
    fontSize: 16,
    paddingTop: windowHeight(20),
  },
});
