import { windowHeight, windowWidth } from "@/themes/app.constant";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { useGetUserData } from "@/hooks/useGetUserData";
import emailjs from "emailjs-com";
import { Toast } from "react-native-toast-notifications";

const TourPackage = () => {
  const { item_id }: any = useLocalSearchParams();
  const [tour, setTour]: [any, any] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(item_id);
  console.log(!item_id);

  useEffect(() => {
    console.log("Hello");
    if (!item_id) return;

    const fetchTourById = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_SERVER_URI}/tours`
        );
        const tours = response.data;
        const selectedTour = tours.find((item: any) => {
          return item.id === item_id;
        });
        setTour(selectedTour || null);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourById();
  }, []);

  const { user } = useGetUserData();

  const userId = user?.id;

  console.log(user, userId);

  const tourId = tour.id;

  

  const bookTour = async (userId: any, tourId: any) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URI}/book-tour`,
        {
          userId,
          tourId,
        }
      );

      const emailParams: any = {
        tour_package: response.data.tour_title,
        order_id: response.data.order_id,
        user_name: response.data.user_name,
        from_email: response.data.from_email,
        user_phone: response.data.user_phone,
      };

      // const serviceID = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID!;
      // const templateID = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_KEY!;
      const privateKey = process.env.EXPO_PUBLIC_EMAILJS_PRIVATE_KEY!;

      const options = {
        publicKey: publicKey,
        accessToken: privateKey,
      };

      emailjs
        .send(
          "service_vke0nib",
          "template_odquguh",
          emailParams,
          "Bus87l3UC_DMxSao3"
        )
        .then(
          () => {
            Toast.show("Message sent succesfully");
          },
          (error: any) => {
            Toast.show(error.message, {
              placement: "bottom",
              type: "danger",
            });
          }
        );

      Toast.show("Tour booked successfully, email sent to admin!");
    } catch (error: any) {
      console.error("Error booking tour:", error);
      Toast.show(error.message, {
        placement: "bottom",
        type: "danger",
      });
    }
  };

  const razorpayKeyId = process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID;

  const priceString = tour?.price ?? "Price not available";

  const amount = parseInt(priceString.replace(/[^0-9]/g, ""));
  const currency = "INR";

  const handlePayment = () => {
    var options: any = {
      description: tour.title,
      image: tour?.image,
      currency: currency,
      key: razorpayKeyId,
      amount: amount * 100,
      name: "OTT",
      order_id: "",
      prefill: {
        email: user?.email,
        contact: user?.phone_number,
        name: user?.name,
      },
      theme: { color: "#ffce48" },
    };
    console.log(options);

    RazorpayCheckout.open(options)
      .then((data) => {
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        console.log(error);
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const route = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleLongPress = (itemId: any) => {
    setSelectedItemId(itemId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItemId(null);
  };

  return loading ? (
    <Text>loading ...</Text>
  ) : (
    <>
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
            paddingTop: windowHeight(35),
            marginBottom: windowHeight(10),
            justifyContent: "flex-start",
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity
            style={{
              width: windowWidth(50),
              height: windowHeight(30),
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
              width: windowWidth(50),
              height: windowHeight(30),
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require("../assets/images/location1.png")}
            style={{
              width: "100%",
              height: 250,
              resizeMode: "cover",
              marginBottom: 20,
            }}
          />
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: 10,
                }}
              >
                {tour.title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#555",
                  marginBottom: 10,
                }}
              >
                Baku, Azerbaijan
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 10,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: 10,
                }}
              >
                Inclusions
              </Text>
              {tour.inclusions.map((item: any) => (
                <Text
                  key={item.id}
                  style={{
                    fontSize: 16,
                    color: "#555",
                    marginBottom: 5,
                  }}
                >
                  {"• "}
                  {item.text}
                </Text>
              ))}
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 10,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: 10,
                }}
              >
                Sightseeing Highlights
              </Text>
              {tour.sightseeing.map((item: any) => (
                <Text
                  key={item.id}
                  style={{
                    fontSize: 16,
                    color: "#555",
                    marginBottom: 5,
                  }}
                >
                  {"• "}
                  {item.text}
                </Text>
              ))}
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 10,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: 10,
                }}
              >
                Itinerary
              </Text>
              {tour.itinerary.map((item: any) => (
                <View key={item.id}>
                  <TouchableWithoutFeedback
                    onLongPress={() => handleLongPress(item.id)}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#555",
                        marginBottom: 5,
                      }}
                    >
                      {"• "}
                      {item.text}
                    </Text>
                  </TouchableWithoutFeedback>
                  {modalVisible && selectedItemId === item.id && (
                    <Modal
                      transparent={true}
                      visible={modalVisible}
                      animationType="slide"
                      onRequestClose={closeModal}
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          paddingVertical: 150,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#fff",
                            padding: 20,
                            borderRadius: 10,
                            width: "80%",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 10,
                            elevation: 5,
                          }}
                        >
                          <ScrollView>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "#333",
                                marginBottom: 20,
                              }}
                            >
                              {item.description}
                            </Text>
                          </ScrollView>
                          <TouchableOpacity
                            onPress={closeModal}
                            style={{
                              backgroundColor: "#F0C330",
                              padding: 10,
                              borderRadius: 5,
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#000",
                              }}
                            >
                              Close
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  )}
                </View>
              ))}
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 10,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: 10,
                }}
              >
                Exclusions
              </Text>
              {tour.exclusions.map((item: any) => (
                <Text
                  key={item.id}
                  style={{
                    fontSize: 16,
                    color: "#555",
                    marginBottom: 5,
                  }}
                >
                  {"• "}
                  {item.text}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
            marginTop: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#888",
              }}
            >
              From
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#000",
              }}
            >
              {tour.price}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#888",
              }}
            >
              per adult
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#F0C330",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 25,
            }}
            onPress={() => {
              bookTour(userId, tourId);
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Check availability
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TourPackage;
