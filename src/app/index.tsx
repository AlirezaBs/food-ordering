import { Link, Redirect } from "expo-router"
import React from "react"
import { ActivityIndicator, View } from "react-native"
import Button from "../components/button"
import { supabase } from "../lib/supabase"
import { useAuthContext } from "../providers/authProvider"

const index = () => {
   const { session, loading, isAdmin } = useAuthContext()

   if (loading) return <ActivityIndicator />

   if (!session) return <Redirect href={"/(auth)/sign-in"} />

   if (!isAdmin) {
      return <Redirect href={"/(user)"} />
   }

   return (
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
         <Link href={"/(user)"} asChild push>
            <Button text="User" />
         </Link>
         <Link href={"/(admin)"} asChild push>
            <Button text="Admin" />
         </Link>

         {!!session && (
            <Button
               onPress={() => {
                  supabase.auth.signOut()
               }}
               text="Sign out"
            />
         )}
      </View>
   )
}

export default index
