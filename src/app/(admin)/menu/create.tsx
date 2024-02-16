import {
   useDeleteProduct,
   useInsertProduct,
   useProduct,
   useUpdateProduct,
} from "@/src/api/products"
import { defaultPizaImage } from "@/src/components/ProductListItem"
import Button from "@/src/components/button"
import Colors from "@/src/constants/Colors"
import * as ImagePicker from "expo-image-picker"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import {
   Alert,
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TextInput,
} from "react-native"

export default function CreateProductScreen() {
   const router = useRouter()
   const { id: idString } = useLocalSearchParams()
   const id = parseFloat(
      typeof idString === "string" ? idString : idString?.[0]
   )
   const isUpdating = !!id

   const [image, setImage] = useState<string | null>(null)
   const [name, setName] = useState("")
   const [price, setPrice] = useState("")
   const [error, setError] = useState("")

   const { mutate: insertProductMutation, isPending: isInsertPending } =
      useInsertProduct()
   const { mutate: updateProductMutation, isPending: isUpdatePending } =
      useUpdateProduct()
   const { data: updatingProduct } = useProduct(id)
   const { mutate: deleteProductMutation, isPending: isDeletePending } =
      useDeleteProduct()

   useEffect(() => {
      if (updatingProduct) {
         setImage(updatingProduct.image)
         setName(updatingProduct.name)
         setPrice(updatingProduct.price.toString())
      }
   }, [updatingProduct])

   const resetFields = () => {
      setName("")
      setPrice("")
      setImage("")
   }

   const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [1, 1],
         quality: 1,
      })

      if (!result.canceled) {
         setImage(result.assets[0].uri)
      }
   }

   const confirmDelete = () => {
      Alert.alert("Confirm", "Are you sure you want to delete this product?", [
         {
            text: "Cancel",
         },
         {
            text: "Delete",
            style: "destructive",
            onPress: onDeleteProduct,
         },
      ])
   }

   const validateInput = () => {
      setError("")

      if (!name) {
         setError("Name is required")
         return false
      }
      if (!price) {
         setError("Price is required")
         return false
      }
      if (isNaN(parseFloat(price))) {
         setError("Price is not a number")
         return
      }

      return true
   }

   const onSubmit = () => (isUpdating ? onUpdate() : onCreate())

   const onCreate = () => {
      if (!validateInput()) return
      console.log("creating")

      insertProductMutation(
         { name, image: image, price: parseFloat(price) },
         {
            onSuccess: () => {
               resetFields()
               router.back()
               setError("")
            },
            onError: () => {
               setError("something went wrong to create product!!")
            },
         }
      )
   }

   const onDeleteProduct = () => {
      deleteProductMutation(id, {
         onSuccess: () => {
            resetFields()
            router.replace("/(admin)/menu")
            setError("")
         },
         onError: () => {
            setError("something went wrong to delete product!!")
         },
      })
   }

   const onUpdate = () => {
      if (!validateInput()) return

      updateProductMutation(
         { id, name, image, price: parseFloat(price) },
         {
            onSuccess: () => {
               resetFields()
               router.back()
               setError("")
            },
            onError: () => {
               setError("something went wrong to update product!!")
            },
         }
      )
   }

   return (
      <ScrollView style={styles.container}>
         <Stack.Screen
            options={{
               title: isUpdating ? "Update Product" : "Create Product",
            }}
         />

         <Image
            source={{ uri: image || defaultPizaImage }}
            style={styles.image}
         />
         <Text onPress={pickImage} style={styles.selectImage}>
            Select Image
         </Text>

         <Text style={styles.label}>Name</Text>
         <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
         />

         <Text style={styles.label}>Price ($)</Text>
         <TextInput
            placeholder="9.99"
            style={styles.input}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
         />

         <Text style={{ color: "red" }}>{error}</Text>
         <Button
            disabled={isInsertPending || isUpdatePending || isDeletePending}
            text={
               isUpdating
                  ? isUpdatePending
                     ? "Updating..."
                     : "Update"
                  : isInsertPending
                  ? "Creating..."
                  : "Create"
            }
            onPress={onSubmit}
         />
         {isUpdating ? (
            <Text
               disabled={isDeletePending}
               onPress={confirmDelete}
               style={[styles.selectImage, { color: "red" }]}
            >
               {isDeletePending ? "Deleting Product" : "Delete Product"}
            </Text>
         ) : null}
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 10,
   },
   image: {
      width: "50%",
      aspectRatio: 1,
      alignSelf: "center",
   },
   selectImage: {
      alignSelf: "center",
      fontWeight: "bold",
      color: Colors.light.tint,
      marginVertical: 10,
   },
   label: {
      color: "#424242",
      fontSize: 16,
   },
   input: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 20,
   },
})
