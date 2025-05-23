import { useState, useEffect } from "react"

interface User {
  id?: string
  name: string
  email: string
  role: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const email = localStorage.getItem("userEmail")
    const name = localStorage.getItem("userFullName")
    const role = localStorage.getItem("userRole")

    if (token && email && name && role) {
      setUser({ name, email, role })
    }

    setIsLoading(false)
  }, [])

  const login = async () => {}

  const logout = async () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userFullName")
    localStorage.removeItem("userRole")
    setUser(null)
  }

  return {
    user,
    isLoading,
    login,
    logout,
  }
}
