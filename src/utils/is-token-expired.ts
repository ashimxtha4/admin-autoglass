import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'

export function isTokenExpired(token: string) {
  try {
    const decoded: { exp: number } = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
    }
    return true
  }
}
