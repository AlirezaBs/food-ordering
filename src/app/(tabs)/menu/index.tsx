import products from "@/assets/data/products"
import ProductLisstItem from "@/src/components/ProductListItem"
import { Stack } from "expo-router"
import { FlatList, StyleSheet } from "react-native"

export default function MenuScreen() {
   return (
      <>
         <Stack.Screen options={{ title: "Menu" }} />

         <FlatList
            data={products}
            renderItem={({ item }) => <ProductLisstItem product={item} />}
            numColumns={2}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            columnWrapperStyle={{ gap: 10 }}
         />
      </>
   )
}

const styles = StyleSheet.create({})
