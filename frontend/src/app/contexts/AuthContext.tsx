import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { LaunchScreen } from "../../view/components/LaunchScreen";
import { localStorageKeys } from "../config/localStorageKeys";
import { User } from "../entities/User";
import { usersService } from "../services/usersService";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
  user: User | undefined
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

    return !!storedAccessToken
  })

  const { isError, isFetching, isSuccess, remove, data } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => usersService.me(),
    enabled: !!signedIn,
    staleTime: Infinity
  })

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken)

    setSignedIn(true)
  }, [])

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    remove()

    setSignedIn(false)
  }, [remove])

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!')
      signout()
    }
  }, [isError, signout])

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data,
        signin,
        signout,
      }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  )
}
