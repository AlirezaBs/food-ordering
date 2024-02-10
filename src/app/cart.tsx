import { StatusBar } from "expo-status-bar"
import React from "react"
import { FlatList, Platform, View } from "react-native"
import { Text } from "../components/Themed"
import Button from "../components/button"
import CartListItem from "../components/cartListItem"
import { useCartContext } from "../providers/cartProvider"

export default function CartScreen() {
   const { items, total } = useCartContext()

   return (
      <View style={{ padding: 10, flex: 1 }}>
         <FlatList
            data={items}
            renderItem={({ item }) => <CartListItem cartItem={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 10 }}
         />

         <View style={{ marginTop: "auto" }}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
               total = ${total}
            </Text>
            <Button text="Checkout" />
         </View>

         <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
   )
}
