import { useProductList } from "@/src/api/products"
import ProductLisstItem from "@/src/components/ProductListItem"
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native"

export default function MenuScreen() {
   const { data: products, error, isLoading } = useProductList()

   if (isLoading) {
      return <ActivityIndicator />
   }

   if (error) {
      return <Text>failed to load data</Text>
   }

   return (
      <>
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
