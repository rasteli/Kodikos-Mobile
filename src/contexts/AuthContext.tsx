import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import getEnvVars from "../../environment"
import * as AuthSession from "expo-auth-session"
import AsyncStorage from "@react-native-async-storage/async-storage"

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
  signIn: () => Promise<void>
  logOut: () => Promise<void>
}

const SCOPE = "read:user"
const CLIENT_ID = getEnvVars().GITHUB_CLIENT_ID

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

  async function signIn() {
    try {
      setIsLogginIn(true)

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`

      const { type, params } = (await AuthSession.startAsync({
        authUrl
      })) as AuthorizationResponse

      if (type === "success" && params.error !== "access_denied") {
        const response = await api.post("/auth", {
          code: params.code,
          provider: "github"
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
