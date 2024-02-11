import { defaultPizaImage } from "@/src/components/ProductListItem"
import Button from "@/src/components/button"
import Colors from "@/src/constants/Colors"
import * as ImagePicker from "expo-image-picker"
import { Stack } from "expo-router"
import React, { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TextInput } from "react-native"

export default function CreateProductScreen() {
   const [image, setImage] = useState<string | null>(null)
   const [name, setName] = useState("")
   const [price, setPrice] = useState("")
   const [error, setError] = useState("")

   const resetFields = () => {
      setName("")
      setPrice("")
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

   const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [1, 1],
         quality: 1,
      })

      console.log(result)

      if (!result.canceled) {
         setImage(result.assets[0].uri)
      }
   }

   const onCreate = () => {
      if (!validateInput()) return
      console.log("creating")

      // save in the database

      resetFields()
   }

   return (
      <ScrollView style={styles.container}>
         <Stack.Screen options={{ title: "Create Product" }} />

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
         <Button text="Create" onPress={onCreate} />
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
