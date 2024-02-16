import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Redirect, Tabs } from "expo-router"
import React from "react"

import { useClientOnlyValue } from "@/src/components/useClientOnlyValue"
import Colors from "@/src/constants/Colors"
import { useAuthContext } from "@/src/providers/authProvider"

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>["name"]
   color: string
}) {
   return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
   const { isAdmin } = useAuthContext()

   if (!isAdmin) return <Redirect href={"/"} />

   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: Colors.light.background,
            tabBarInactiveTintColor: "gainsboro",
            // Disable the static render of the header on web
            // to prevent a hydration error in React Navigation v6.
            headerShown: useClientOnlyValue(false, true),
            tabBarStyle: {
               paddingBottom: 3,
               backgroundColor: Colors.light.tint,
            },
         }}
         initialRouteName="menu"
      >
         <Tabs.Screen
            name="menu"
            options={{
               title: "Menu",
               headerShown: false,
               tabBarIcon: ({ color }) => (
                  <TabBarIcon name="cutlery" color={color} />
               ),
            }}
         />
         <Tabs.Screen
            name="orders"
            options={{
               title: "Orders",
               headerShown: false,
               tabBarIcon: ({ color }) => (
                  <TabBarIcon name="list" color={color} />
               ),
            }}
         />
      </Tabs>
   )
}
