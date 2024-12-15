import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{ headerShown: false, tabBarLabel: "Home" }}
      />
      <Tabs.Screen
        name="rides"
        options={{ headerShown: false, tabBarLabel: "Rides" }}
      />
      <Tabs.Screen
        name="profile"
        options={{ headerShown: false, tabBarLabel: "Profile" }}
      />
    </Tabs>
  );
};

export default _layout;
