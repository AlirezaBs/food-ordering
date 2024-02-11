import orders from "@/assets/data/orders"
import OrderItemListItem from "@/src/components/orderItemListItem"
import OrderListItem from "@/src/components/orderListItem"
import { Stack, useLocalSearchParams } from "expo-router"
import React from "react"
import { FlatList, Text, View } from "react-native"

export default function OrderDetailsScreen() {
   const { id } = useLocalSearchParams()

   const order = orders.find((o) => o.id.toString() === id)
   if (!order) return <Text>product not found!</Text>

   return (
      <View style={{ padding: 10, flex: 1}}>
         <Stack.Screen options={{ title: "Order #" + id }} />

         <FlatList
            data={order.order_items}
            renderItem={({ item }) => <OrderItemListItem item={item} />}
            contentContainerStyle={{ gap: 10 }}
            ListHeaderComponent={<OrderListItem order={order} />}
            ListHeaderComponentStyle={{ marginBottom: 5 }}
         />
      </View>
   )
}
