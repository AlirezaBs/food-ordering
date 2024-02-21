import { useAdminOrderList } from "@/src/api/orders"
import OrderListItem from "@/src/components/orderListItem"
import React from "react"
import { ActivityIndicator, FlatList, Text } from "react-native"

export default function OrdersScreen() {
   const {
      data: orders,
      isLoading,
      error,
   } = useAdminOrderList({ archived: true })

   if (isLoading) {
      return <ActivityIndicator />
   }

   if (error) {
      return <Text>failed to load data</Text>
   }

   if (orders?.length === 0) return <Text>No orders yet</Text>

   return (
      <FlatList
         data={orders}
         renderItem={({ item }) => <OrderListItem order={item} />}
         contentContainerStyle={{ gap: 10, padding: 10 }}
      />
   )
}
