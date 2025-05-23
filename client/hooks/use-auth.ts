"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setUser({
        id: "1",
        name: "Dr. Smith",
        email: "dr.smith@esi-sba.dz",
        role: "MENTOR",
      })
      setIsLoading(false)
    }, 500)
  }, [])

  const login = async () => {
  }

  const logout = async () => {
  }

  return {
    user,
    isLoading,
    login,
    logout,
  }
}
