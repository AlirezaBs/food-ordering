import { supabase } from "@/src/lib/supabase"
import { Product } from "@/src/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useProductList = () => {
   return useQuery({
      queryKey: ["products"],
      queryFn: async () => {
         const { data, error } = await supabase.from("products").select("*")

         if (error) throw new Error(error.message)

         return data as Product[]
      },
   })
}

export const useProduct = (id: number) => {
   return useQuery({
      queryKey: ["product", id],
      queryFn: async () => {
         const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single()

         if (error) throw new Error(error.message)

         return data as Product
      },
   })
}

export const useInsertProduct = () => {
   const queryClient = useQueryClient()

   return useMutation({
      async mutationFn(data: {
         name: string
         image: string | null
         price: number
      }) {
         const { data: resData, error } = await supabase
            .from("products")
            .insert({
               name: data.name,
               image: data.image,
               price: data.price,
            })
            .single()

         if (error) throw new Error(error.message)

         return resData
      },
      async onSuccess() {
         await queryClient.invalidateQueries({ queryKey: ["products"] })
      },
   })
}

export const useUpdateProduct = () => {
   const queryClient = useQueryClient()

   return useMutation({
      async mutationFn(data: {
         id: number
         name: string
         image: string | null
         price: number
      }) {
         const { data: resData, error } = await supabase
            .from("products")
            .update({
               name: data.name,
               image: data.image,
               price: data.price,
            })
            .eq("id", data.id)
            .single()

         if (error) throw new Error(error.message)

         return resData
      },
      async onSuccess(_, { id }) {
         await queryClient.invalidateQueries({ queryKey: ["products", id] })
         await queryClient.invalidateQueries({ queryKey: ["products"] })
      },
   })
}

export const useDeleteProduct = () => {
   const queryClient = useQueryClient()

   return useMutation({
      async mutationFn(id: number) {
         const { data, error } = await supabase
            .from("products")
            .delete()
            .eq("id", id)
            .single()

         if (error) throw new Error(error.message)

         return data
      },
      async onSuccess(_, id) {
         await queryClient.invalidateQueries({ queryKey: ["products", id] })
         await queryClient.invalidateQueries({ queryKey: ["products"] })
      },
   })
}
