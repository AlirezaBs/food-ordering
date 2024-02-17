import { Session } from "@supabase/supabase-js"
import {
   PropsWithChildren,
   createContext,
   useContext,
   useEffect,
   useState,
} from "react"
import { Tables } from "../database.types"
import { supabase } from "../lib/supabase"

interface AuthData {
   session: Session | null
   profile: any
   loading: boolean
   isAdmin: boolean
}

const AuthContext = createContext<AuthData>({
   session: null,
   profile: null,
   loading: true,
   isAdmin: false,
})

export const useAuthContext = (): AuthData => {
   const context = useContext(AuthContext)
   if (!context) {
      throw new Error("useAuthContext must be used within a CartProvider")
   }

   return context
}

export default function AuthProvider({ children }: PropsWithChildren) {
   const [session, setSession] = useState<Session | null>(null)
   const [profile, setProfile] = useState<Tables<'profiles'> | null>(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      fetchSession()
      supabase.auth.onAuthStateChange((_event, session) => {
         setSession(session)
      })
   }, [])

   const fetchSession = async () => {
      const {
         data: { session },
      } = await supabase.auth.getSession()

      setSession(session)

      if (session) {
         const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()
         setProfile(data || null)
      }

      setLoading(false)
   }

   return (
      <AuthContext.Provider
         value={{
            session,
            loading,
            profile,
            isAdmin: profile?.group === "ADMIN",
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}
