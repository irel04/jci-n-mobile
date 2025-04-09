import React, { useEffect } from "react";

import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from "@/hooks/useStorageState";
import { supabase } from "@/utils/supabase";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { TUserSession } from "@/components/types";

interface AuthContextType {
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}



export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const router = useRouter()


  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === 'TOKEN_REFRESHED'){
        const { access_token, refresh_token } = newSession
        const oldSession = JSON.parse(session) as TUserSession

        setSession(JSON.stringify({ access_token, refresh_token, user_id: oldSession.user_id }))
        
      }

      console.info("old session: ", session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  async function signIn(credentials: { email: string; password: string }) {
    try {
      const {data, error } = await supabase.auth.signInWithPassword(credentials);

      if (error) throw error;


      const { data: users_details } = await supabase.from("users_details").select("id, status").eq("auth_id", data.session.user.id)

      if (users_details[0].status === "onboarding" || users_details[0].status==="inactive") {
        await signOut()
        throw new Error("Your account is not activated. Please wait for admin verification", { cause: "not-activated" })
      }

      const { refresh_token, access_token } = data.session

      setSession(JSON.stringify({ refresh_token, access_token, user_id: users_details[0].id }))

      setTimeout(() => {
        router.push("/(main)");
      }, 1000);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  }

  async function signOut() {
    try {
      let { error } = await supabase.auth.signOut({
        scope: "local"
      })

      if (error) throw error
      setSession(null);


    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred while logging out. Please try again.');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
