import { supabase } from "@/src/lib/supabase"
import { useAuthContext } from "@/src/providers/authProvider"
import { useQuery } from "@tanstack/react-query"

export const useAdminOrderList = ({ archived = false }) => {
   const statuses = archived
      ? ["Archived"]
      : ["New", "Cooking", "Delivering", "Delivered"]

   return useQuery({
      queryKey: ["orders", { archived }],
      queryFn: async () => {
         const { data, error } = await supabase
            .from("orders")
            .select("*")
            .in("status", statuses)

         if (error) throw new Error(error.message)

         return data
      },
   })
}

export const useMyOrderList = () => {
   const { session } = useAuthContext()
   const userId = session?.user.id

   return useQuery({
      queryKey: ["orders", { userId }],
      queryFn: async () => {
         if (!userId) return null

         const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", userId)

         if (error) throw new Error(error.message)

         return data
      },
   })
}
