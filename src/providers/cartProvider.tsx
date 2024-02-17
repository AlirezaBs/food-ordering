import { randomUUID } from "expo-crypto"
import { PropsWithChildren, createContext, useContext, useState } from "react"
import { Tables } from "../database.types"
import { CartItem, PizzaSize } from "../types"

type Product = Tables<"products">

interface CartContextType {
   items: CartItem[]
   onAddItem: (item: Product, pizzaSize: CartItem["size"]) => void
   updateQuantity: (itemId: string, amount: -1 | 1) => void
   total: number
}

const CartContext = createContext<CartContextType>({
   items: [],
   onAddItem: () => {},
   updateQuantity: () => {},
   total: 0,
})

export const useCartContext = (): CartContextType => {
   const context = useContext(CartContext)
   if (!context) {
      throw new Error("useCartContext must be used within a CartProvider")
   }

   return context
}

export function CartProvider({ children }: PropsWithChildren) {
   const [items, setItems] = useState<CartItem[]>([])

   const total = items.reduce(
      (sum, item) => (sum += item.product.price * item.quantity),
      0
   )

   const onAddItem = (item: Product, pizzaSize: PizzaSize) => {
      const existingItem = items.find(
         (prevItem) =>
            prevItem.product_id === item.id && prevItem.size === pizzaSize
      )

      if (existingItem) {
         updateQuantity(existingItem.id, 1)
         return
      }

      const newCartItem: CartItem = {
         id: randomUUID(),
         product: item,
         product_id: item.id,
         size: pizzaSize,
         quantity: 1,
      }

      setItems((prevItems) => [...prevItems, newCartItem])
   }

   const updateQuantity = (itemId: string, amount: -1 | 1) => {
      setItems((prevItems) => {
         const updatedItems = prevItems
            .map((item) => {
               if (item.id === itemId) {
                  return {
                     ...item,
                     quantity: item.quantity + amount,
                  }
               }
               return item
            })
            .filter((item) => item.quantity > 0)
         return updatedItems
      })
   }

   return (
      <CartContext.Provider
         value={{
            items,
            onAddItem,
            updateQuantity,
            total,
         }}
      >
         {children}
      </CartContext.Provider>
   )
}
