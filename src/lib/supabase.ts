import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
import "react-native-url-polyfill/auto"
import { Database } from "../database.types"

const supabaseUrl = "https://epgjqnofpycccjligmhi.supabase.co"
const supabaseAnonKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZ2pxbm9mcHljY2NqbGlnbWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NDMzMDIsImV4cCI6MjAyMzMxOTMwMn0.fN5x5Y7BrnJr_ET5ClLuxYhxcccm-D3FaPMsKG-bb9E"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
   auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
   },
})
