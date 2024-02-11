import products from "@/assets/data/products"
import { defaultPizaImage } from "@/src/components/ProductListItem"
import { useCartContext } from "@/src/providers/cartProvider"
import { PizzaSize } from "@/src/types"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import React, { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const SIZES: PizzaSize[] = ["S", "M", "L", "XL"]

export default function ProductDetailScreen() {
   const { id } = useLocalSearchParams()
   const { onAddItem } = useCartContext()
   const router = useRouter()

   const [selectedSize, setSelectedSize] = useState<PizzaSize>("M")

   const product = products.find((product) => product.id.toString() === id)
   if (!product) return <Text>Product not found!</Text>

   const addToCart = () => {
      if (!product) return
      onAddItem(product, selectedSize)
      router.push("/cart")
   }

   return (
      <View style={styles.container}>
         <Stack.Screen options={{ title: product?.name }} />

         <Image
            source={{ uri: product.image || defaultPizaImage }}
            style={styles.image}
            alt={product.name + "image"}
            resizeMode="contain"
         />

         <Text style={styles.price}>
            {product.name} - price: ${product.price}
         </Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
      flex: 1,
      padding: 10,
   },
   image: {
      width: "100%",
      aspectRatio: 1,
   },
   price: {
      fontSize: 18,
      fontWeight: "bold",
   },
})
