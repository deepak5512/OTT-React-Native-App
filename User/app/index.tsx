import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (isMounted) {
          setIsLoggedIn(!!accessToken);
        }
      } catch (error) {
        console.log(
          "Failed to retrieve access token from async storage",
          error
        );
      } finally {
        if (isMounted) {
          setisLoading(false);
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return <Redirect href={!isLoggedIn ? "/welcome" : "/loggedInWelcome"} />;
};

export default HomePage;
