import products from "@/assets/data/products"
import { defaultPizaImage } from "@/src/components/ProductListItem"
import Button from "@/src/components/button"
import { useCartContext } from "@/src/providers/cartProvider"
import { PizzaSize } from "@/src/types"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import React, { useState } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"

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

         <Text>Select Size</Text>
         <View style={styles.sizes}>
            {SIZES.map((size, i) => (
               <Pressable
                  onPress={() => setSelectedSize(size)}
                  key={i}
                  style={[
                     styles.size,
                     {
                        backgroundColor:
                           selectedSize === size ? "gainsboro" : "transparent",
                     },
                  ]}
               >
                  <Text
                     style={[
                        styles.sizeText,
                        {
                           color: selectedSize === size ? "black" : "gray",
                        },
                     ]}
                  >
                     {size}
                  </Text>
               </Pressable>
            ))}
         </View>

         <Text style={styles.price}>${product.price}</Text>
         <Button onPress={addToCart} text="Add to Cart" />
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
      fontSize: 20,
      fontWeight: "bold",
   },
   sizes: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 10,
      marginBottom: "auto",
   },
   size: {
      width: 50,
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
   },
   sizeText: {
      fontSize: 20,
      fontWeight: "500",
   },
})
