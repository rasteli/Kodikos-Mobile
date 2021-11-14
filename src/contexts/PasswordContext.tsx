import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
import io from "socket.io-client"
import { AxiosResponse } from "axios"

import { api } from "../services/api"
import { useAuth } from "./AuthContext"
import getEnvVars from "../../environment"

type PasswordProviderProps = {
  children: ReactNode
}

export type SwitchPasswordProp = {
  label: "CAIXA ALTA" | "CAIXA BAIXA" | "SÍMBOLOS" | "NÚMEROS"
  value: boolean
}

type Password = {
  id: string
  value: string
  label?: string
  user_id: string
}

type PasswordProp = {
  uppercase: boolean
  lowercase: boolean
  symbols: boolean
  numeric: boolean
}

type Methods = {
  deletePassword: () => void
  generatePassword: () => Promise<void>
  createPassword: (label: string, value: string) => Promise<void>
  updatePassword: (label: string, passwordId: string) => Promise<void>

  setPwdLength: React.Dispatch<React.SetStateAction<number>>
  setPasswordLabel: React.Dispatch<React.SetStateAction<string>>

  setPasswordProps: (switchPwdProp: SwitchPasswordProp) => void
  setPasswordsToDelete: (index: number, checked: boolean) => void
  setPasswords: React.Dispatch<React.SetStateAction<[] | Password[]>>
}

type PasswordContextData = {
  password: Password | null
  userPasswords: Password[]
  methods: Methods
}

const socket = io(getEnvVars().API_URL)
const PasswordContext = createContext({} as PasswordContextData)

export function usePassword() {
  return useContext(PasswordContext)
}

export function PasswordProvider({ children }: PasswordProviderProps) {
  const { user } = useAuth()

  const initialPwdPropsValue = {
    uppercase: false,
    lowercase: false,
    symbols: false,
    numeric: false
  }

  const [pwdLength, setPwdLength] = useState(8)
  const [passwordLabel, setPasswordLabel] = useState("")

  const [password, setPassword] = useState<Password | null>(null)
  const [pwdProps, setPwdProps] = useState<PasswordProp>(initialPwdPropsValue)

  const [pwdsToDelete, setPwdsToDelete] = useState<Password[] | []>([])
  const [userPasswords, setUserPasswords] = useState<Password[] | []>([])

  const translatedProps = {
    "CAIXA ALTA": "uppercase",
    "CAIXA BAIXA": "lowercase",
    SÍMBOLOS: "symbols",
    NÚMEROS: "numeric"
  }

  useEffect(() => {
    async function setUserPassword() {
      try {
        const { data } = await api.get("/pwd")
        const passwords: Password[] = data.passwords

        setUserPasswords(() => {
          if (!passwordLabel) return passwords

          const labeledPasswords = passwords.filter(password => {
            const labelToLowercase = password.label?.toLowerCase()

            return labelToLowercase?.startsWith(passwordLabel.toLowerCase())
          })

          return labeledPasswords
        })
      } catch (error: any) {
        console.log(error.response.data.error)
      }
    }

    if (user) setUserPassword()

    socket.on("altered_database", setUserPassword)
  }, [password, user, passwordLabel])

  function setPasswordProps(switchPwdProp: SwitchPasswordProp) {
    const prop = translatedProps[switchPwdProp.label]
    const pwdProp = Object.defineProperty(pwdProps, prop, switchPwdProp)

    setPwdProps(pwdProp)
  }

  async function generatePassword() {
    try {
      const { data } = await api.post("/pwd-random", {
        pwdProps,
        length: pwdLength
      })

      setPassword(data.password as Password)
    } catch (error) {
      console.log(error)
    }
  }

  async function createPassword(label: string, value: string) {
    try {
      await api.post("/pwd-create", { label, value })
    } catch (error) {
      console.log(error)
    }
  }

  function deletePassword() {
    const promises: Promise<AxiosResponse<any, any>>[] = []

    pwdsToDelete?.map(password => {
      promises.push(api.delete(`/pwd/${password.id}`))
    })

    Promise.all(promises).catch(error => console.log(error))
  }

  function setPasswordsToDelete(index: number, checked: boolean) {
    setPwdsToDelete(prevPasswords => {
      if (checked) return [...prevPasswords, userPasswords[index]]

      const newPasswords = userPasswords?.filter(password => {
        return password.id !== userPasswords[index].id
      })

      return newPasswords
    })
  }

  async function updatePassword(label: string, passwordId: string) {
    try {
      if (label.length > 0)
        await api.put("/pwd/", { label, pwd_id: passwordId })
    } catch (error) {
      console.log(error)
    }
  }

  const value: PasswordContextData = {
    password,
    userPasswords,

    methods: {
      setPwdLength,
      deletePassword,
      createPassword,
      updatePassword,
      generatePassword,
      setPasswordProps,
      setPasswordLabel,
      setPasswordsToDelete,
      setPasswords: setPwdsToDelete
    }
  }

  return (
    <PasswordContext.Provider value={value}>
      {children}
    </PasswordContext.Provider>
  )
}
