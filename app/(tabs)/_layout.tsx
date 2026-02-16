import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
return (
<Tabs
screenOptions={{
headerShown: false,
tabBarActiveTintColor: "#000000",
tabBarInactiveTintColor: "#000000",

tabBarLabelStyle: {
fontSize: 13,
fontWeight: "700",
},

tabBarStyle: {
backgroundColor: "#4dd0e1",
borderTopWidth: 0,
paddingTop: 14,
paddingBottom: 14,

shadowColor: "#C5D6BA",
shadowOpacity: 0.4,
shadowRadius: 16,
elevation: 10,
},
}}
>
<Tabs.Screen
name="index"
options={{
title: "หน้าแรก",
tabBarIcon: ({ color, size }) => (
<Ionicons name="home" size={size} color={color} />
),
}}
/>

<Tabs.Screen
name="list"
options={{
title: "รายการ",
tabBarIcon: ({ color, size }) => (
<Ionicons name="list" size={size} color={color} />
),
}}
/>

<Tabs.Screen
name="add"
options={{
title: "เพิ่ม",
tabBarIcon: ({ color, size }) => (
<Ionicons name="add-circle" size={size + 4} color={color} />
),
}}
/>
</Tabs>
);
}