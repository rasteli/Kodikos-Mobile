import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import * as AuthSession from "expo-auth-session"
import AsyncStorage from "@react-native-async-storage/async-storage"

import getEnvVars from "../../environment"

import { api } from "../services/api"

type AuthProviderProps = {
  children: ReactNode
}

type User = {
  name: string
  avatar_url: string
}

type AuthorizationResponse = {
  type?: string
  params: {
    code?: string
    error?: string
  }
}

type AuthenticationResponse = {
  user: User
  token: string
}

type AuthContextData = {
  user: User | null
  isLogginIn: boolean
  logOut: () => Promise<void>
  signIn: (provider: "google" | "github") => Promise<void>
}

const GITHUB_SCOPE = "read:user"
const GOOGLE_SCOPE = "https%3A//www.googleapis.com/auth/userinfo.profile"

const { GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID } = getEnvVars()

const USER_STORAGE = "@kodikos:user"
const TOKEN_STORAGE = "@kodikos:token"

const AuthContext = createContext({} as AuthContextData)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLogginIn, setIsLogginIn] = useState(false)

  useEffect(() => {
    async function loadUser() {
      setIsLogginIn(true)

      const user = await AsyncStorage.getItem(USER_STORAGE)
      const token = await AsyncStorage.getItem(TOKEN_STORAGE)

      if (user && token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`

        setUser(JSON.parse(user))
      }

      setIsLogginIn(false)
    }

    loadUser()
  }, [])

  async function signIn(provider: "google" | "github") {
    try {
      setIsLogginIn(true)

      const urls = {
        github: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${GITHUB_SCOPE}`,
        google: `https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=${GOOGLE_SCOPE}&response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=https%3A//auth.expo.io/@rasteli/kodikos`
      }

      const authUrl = urls[provider]

      const { type, params } = (await AuthSession.startAsync({
        authUrl
      })) as AuthorizationResponse

      if (type === "success" && params.error !== "access_denied") {
        const response = await api.post("/auth", {
          code: params.code,
          provider
        })

        const { user, token } = response.data as AuthenticationResponse

        api.defaults.headers.common.authorization = `Bearer ${token}`

        await AsyncStorage.setItem(TOKEN_STORAGE, token)
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))

        setUser(user)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLogginIn(false)
    }
  }

  async function logOut() {
    setUser(null)

    await AsyncStorage.removeItem(USER_STORAGE)
    await AsyncStorage.removeItem(TOKEN_STORAGE)
  }

  const value: AuthContextData = {
    user,
    signIn,
    logOut,
    isLogginIn
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
