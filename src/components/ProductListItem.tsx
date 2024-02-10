import { Text } from "@/src/components/Themed"
import Colors from "@/src/constants/Colors"
import { Link } from "expo-router"
import { Image, Pressable, StyleSheet } from "react-native"
import { Product } from "../types"

export const defaultPizaImage =
   "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"

interface Props {
   product: Product
}

export default function ProductLisstItem({ product }: Props) {
   return (
      <Link href={`/(tabs)/menu/${product.id}`} asChild>
         <Pressable style={styles.container}>
            <Image
               source={{ uri: product.image || defaultPizaImage }}
               style={styles.image}
               resizeMode="contain"
            />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
         </Pressable>
      </Link>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "white",
      padding: 10,
      borderRadius: 20,
      maxWidth: "50%",
   },
   image: {
      width: "100%",
      aspectRatio: 1,
   },
   title: {
      fontSize: 20,
      fontWeight: "600",
      marginVertical: 10,
   },
   price: {
      color: Colors.light.tint,
      fontWeight: "bold",
   },
})
