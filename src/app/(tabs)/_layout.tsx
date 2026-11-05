import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#F7F6F2" },
        headerShadowVisible: false,
        headerTitle: "Moneo",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "PlusJakartaSans_600SemiBold",
          fontSize: 18,
          color: "#1C1B1B",
        },
        tabBarActiveTintColor: "#4F5D45",
        tabBarInactiveTintColor: "#5E5E5E",
        tabBarStyle: {
          backgroundColor: "#F7F6F2",
          borderTopColor: "#E7E5E0",
        },
        tabBarLabelStyle: {
          fontFamily: "PlusJakartaSans_400Regular",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}