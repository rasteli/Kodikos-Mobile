import axios from "axios"
import getEnvVars from "../../environment"

const { API_URL } = getEnvVars()

export const api = axios.create({
  baseURL: API_URL
})
