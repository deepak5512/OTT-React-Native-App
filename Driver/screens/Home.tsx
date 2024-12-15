import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import { useTheme } from "@react-navigation/native";
import RenderRideItem from "@/components/RenderRideItem";
import RideCard from "@/components/RideCard";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Button from "@/components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as GeoLocation from "expo-location";
import { Toast } from "react-native-toast-notifications";
import { useGetDriverData } from "@/hooks/useGetDriverData";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { recentRidesData, rideData } from "@/configs/constants";
import * as Device from "expo-device";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "@/themes/app.constant";

const Home = () => {
  const notificationListener = useRef<any>();
  const { driver, loading: DriverDataLoading } = useGetDriverData();
  const [userData, setUserData] = useState<any>(null);
  const [isOn, setIsOn] = useState<any>();
  const [loading, setloading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [region, setRegion] = useState<any>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentLocationName, setcurrentLocationName] = useState("");
  const [destinationLocationName, setdestinationLocationName] = useState("");
  const [distance, setdistance] = useState<any>();
  const [wsConnected, setWsConnected] = useState(false);
  const [marker, setMarker] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [lastLocation, setLastLocation] = useState<any>(null);
  const [recentRides, setrecentRides] = useState([]);
  const ws = new WebSocket("ws://172.31.119.98:8080");

  const { colors } = useTheme();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const orderData = JSON.parse(
          notification.request.content.data.orderData
        );
        setIsModalVisible(true);
        setCurrentLocation({
          latitude: orderData.currentLocation.latitude,
          longitude: orderData.currentLocation.longitude,
        });
        setMarker({
          latitude: orderData.marker.latitude,
          longitude: orderData.marker.longitude,
        });
        setRegion({
          latitude:
            (orderData.currentLocation.latitude + orderData.marker.latitude) /
            2,
          longitude:
            (orderData.currentLocation.longitude + orderData.marker.longitude) /
            2,
          latitudeDelta:
            Math.abs(
              orderData.currentLocation.latitude - orderData.marker.latitude
            ) * 2,
          longitudeDelta:
            Math.abs(
              orderData.currentLocation.longitude - orderData.marker.longitude
            ) * 2,
        });
        setdistance(orderData.distance);
        setcurrentLocationName(orderData.currentLocationName);
        setdestinationLocationName(orderData.destinationLocation);
        setUserData(orderData.user);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      const status: any = await AsyncStorage.getItem("status");
      setIsOn(status === "active" ? true : false);
    };
    fetchStatus();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Toast.show("Failed to get push token for push notification!", {
          type: "danger",
        });
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        Toast.show("Failed to get project id for push notification!", {
          type: "danger",
        });
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(pushTokenString);
      } catch (e: unknown) {
        Toast.show(`${e}`, {
          type: "danger",
        });
      }
    } else {
      Toast.show("Must use physical device for Push Notifications", {
        type: "danger",
      });
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setWsConnected(true);
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log("Received message:", message);
    };

    ws.onerror = (e: any) => {
      console.log("WebSocket error:", e.message);
    };

    ws.onclose = (e) => {
      console.log("WebSocket closed:", e.code, e.reason);
    };

    return () => {
      ws.close();
    };
  }, []);

  const haversineDistance = (coords1: any, coords2: any) => {
    const toRad = (x: any) => (x * Math.PI) / 180;

    const R = 6371e3;
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);
    const deltaLat = toRad(coords2.latitude - coords1.latitude);
    const deltaLon = toRad(coords2.longitude - coords1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const sendLocationUpdate = async (location: any) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    await axios
      .get(`${process.env.EXPO_PUBLIC_SERVER_URI}/driver/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data) {
          if (ws.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
              type: "locationUpdate",
              data: location,
              role: "driver",
              driver: res.data.driver.id!,
            });
            ws.send(message);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    (async () => {
      let { status } = await GeoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show("Please give us to access your location to use this app!");
        return;
      }

      await GeoLocation.watchPositionAsync(
        {
          accuracy: GeoLocation.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        async (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };
          if (
            !lastLocation ||
            haversineDistance(lastLocation, newLocation) > 200
          ) {
            setCurrentLocation(newLocation);
            setLastLocation(newLocation);
            if (ws.readyState === WebSocket.OPEN) {
              await sendLocationUpdate(newLocation);
            }
          }
        }
      );
    })();
  }, []);

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

  useEffect(() => {
    getRecentRides();
  }, []);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleStatusChange = async () => {
    if (!loading) {
      setloading(true);
      const accessToken = await AsyncStorage.getItem("accessToken");
      const changeStatus = await axios.put(
        `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/update-status`,
        {
          status: !isOn ? "active" : "inactive",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (changeStatus.data) {
        setIsOn(!isOn);
        await AsyncStorage.setItem("status", changeStatus.data.driver.status);
        setloading(false);
      } else {
        setloading(false);
      }
    }
  };

  const sendPushNotification = async (expoPushToken: string, data: any) => {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Ride Request Accepted!",
      body: `Your driver is on the way!`,
      data: { orderData: data },
    };
    await axios
      .post("https://exp.host/--/api/v2/push/send", message)
      .catch((error) => {
        console.log(error);
      });
  };

  const acceptRideHandler = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    await axios
      .post(
        `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/new-ride`,
        {
          userId: userData?.id!,
          charge: (distance * parseInt(driver?.rate!)).toFixed(2),
          status: "Processing",
          currentLocationName,
          destinationLocationName,
          distance,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(async (res) => {
        const data = {
          ...driver,
          currentLocation,
          marker,
          distance,
        };
        const driverPushToken = "ExponentPushToken[A22bNzKGUMegAXVEqzDnUx]";

        await sendPushNotification(driverPushToken, data);

        const rideData = {
          user: userData,
          currentLocation,
          marker,
          driver,
          distance,
          rideData: res.data.newRide,
        };
        router.push({
          pathname: "/rides",
          params: { orderData: JSON.stringify(rideData) },
        });
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingBottom: windowHeight(10),
        }}
      >
        <Header isOn={isOn} toggleSwitch={() => handleStatusChange()} />
        <FlatList
          data={rideData}
          numColumns={2}
          renderItem={({ item }) => (
            <RenderRideItem item={item} colors={colors} />
          )}
        />
        <View
          style={{
            paddingHorizontal: windowWidth(20),
            paddingTop: windowHeight(5),
            paddingBottom: windowHeight(10),
            backgroundColor: colors.card,
          }}
        >
          <Text
            style={{
              marginVertical: windowHeight(5),
              fontSize: 20,
              color: colors.text,
            }}
          >
            Recent Rides
          </Text>
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
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          activeOpacity={1}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              maxWidth: windowWidth(420),
              padding: windowWidth(15),
              paddingHorizontal: windowWidth(30),
              borderRadius: 8,
              alignItems: "center",
            }}
            activeOpacity={1}
          >
            <View>
              <Text
                style={{
                  color: "#1F1F1F",
                  fontSize: 20,
                  paddingBottom: windowHeight(8),
                }}
              >
                New Ride Request Received!
              </Text>
              <MapView
                style={{ height: windowHeight(180) }}
                region={region}
                onRegionChangeComplete={(region) => setRegion(region)}
              >
                {marker && <Marker coordinate={marker} />}
                {currentLocation && <Marker coordinate={currentLocation} />}
                {currentLocation && marker && (
                  <MapViewDirections
                    origin={currentLocation}
                    destination={marker}
                    apikey={process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY!}
                    strokeWidth={4}
                    strokeColor="blue"
                  />
                )}
              </MapView>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    marginRight: windowWidth(3),
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: windowHeight(5),
                  }}
                >
                  <Entypo name="location-pin" size={24} color="black" />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      marginHorizontal: 5,
                      borderColor: "#665CFF",
                    }}
                  />
                  <Entypo name="location-pin" size={24} color="black" />
                </View>
                <View
                  style={{
                    paddingTop: windowHeight(5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.text,
                    }}
                  >
                    {currentLocationName}
                  </Text>
                  <View
                    style={{
                      borderStyle: "dashed",
                      borderBottomWidth: 0.5,
                      borderColor: "#E9E9E9",
                      marginVertical: windowHeight(1.5),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      paddingTop: windowHeight(10),
                      color: colors.text,
                    }}
                  >
                    {destinationLocationName}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  paddingTop: windowHeight(5),
                  fontSize: windowHeight(14),
                }}
              >
                Distance: {distance} km
              </Text>
              <Text
                style={{
                  paddingVertical: windowHeight(5),
                  paddingBottom: windowHeight(5),
                  fontSize: windowHeight(14),
                }}
              >
                Amount:
                {(distance * parseInt(driver?.rate!)).toFixed(2)} BDT
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: windowHeight(5),
                }}
              >
                <Button
                  title="Decline"
                  onPress={handleClose}
                  width={windowWidth(120)}
                  height={windowHeight(30)}
                  backgroundColor="crimson"
                />
                <Button
                  title="Accept"
                  onPress={() => acceptRideHandler()}
                  width={windowWidth(120)}
                  height={windowHeight(30)}
                />
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Home;
