import orders from "@/assets/data/orders"
import OrderItemListItem from "@/src/components/orderItemListItem"
import OrderListItem from "@/src/components/orderListItem"
import Colors from "@/src/constants/Colors"
import { OrderStatus } from "@/src/types"
import { Stack, useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { FlatList, Pressable, Text, View } from "react-native"

const OrderStatusList: OrderStatus[] = [
   "New",
   "Cooking",
   "Delivering",
   "Delivered",
]

export default function OrderDetailsScreen() {
   const { id } = useLocalSearchParams()

   const order = orders.find((o) => o.id.toString() === id)
   if (!order) return <Text>product not found!</Text>

   const [orderStatus, setOrderStatus] = useState<OrderStatus>(order.status)

   return (
      <View style={{ padding: 10, flex: 1 }}>
         <Stack.Screen options={{ title: "Order #" + id }} />

         <FlatList
            data={order.order_items}
            renderItem={({ item }) => <OrderItemListItem item={item} />}
            contentContainerStyle={{ gap: 10 }}
            ListHeaderComponent={<OrderListItem order={order} />}
            ListHeaderComponentStyle={{ marginBottom: 5 }}
            ListFooterComponent={() => (
               <>
                  <Text style={{ fontWeight: "bold" }}>Status</Text>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                     {OrderStatusList.map((status) => (
                        <Pressable
                           key={status}
                           onPress={() => setOrderStatus(status)}
                           style={{
                              borderColor: Colors.light.tint,
                              borderWidth: 1,
                              padding: 10,
                              borderRadius: 5,
                              marginVertical: 10,
                              backgroundColor:
                                 orderStatus === status
                                    ? Colors.light.tint
                                    : "transparent",
                           }}
                        >
                           <Text
                              style={{
                                 color:
                                    orderStatus === status
                                       ? "white"
                                       : Colors.light.tint,
                              }}
                           >
                              {status}
                           </Text>
                        </Pressable>
                     ))}
                  </View>
               </>
            )}
         />
      </View>
   )
}
