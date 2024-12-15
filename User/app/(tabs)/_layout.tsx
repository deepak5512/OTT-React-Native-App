import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="travel" options={{ headerShown: false, tabBarLabel: 'Travel' }} />
      <Tabs.Screen name="bookings" options={{ headerShown: false, tabBarLabel: 'Bookings' }} />
      <Tabs.Screen name="profile" options={{ headerShown: false, tabBarLabel: 'Profile' }} />
      <Tabs.Screen name="settings" options={{ headerShown: false, tabBarLabel: 'Settings' }} />
    </Tabs>
  );
};

export default _layout;