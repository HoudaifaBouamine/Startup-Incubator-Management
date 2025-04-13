

import type React from "react"

import { makeStyles, mergeClasses, tokens, Button, Text, Image } from "@fluentui/react-components"
import logo from "../assets/Logo Image.svg"
import { Link, useNavigate } from "react-router-dom"
import Input from "./components/Input"
import { useState } from "react"
import { useTheme } from '../main'; 
const useStyles = makeStyles({
  background: {
    backgroundColor: tokens.colorNeutralBackground2,
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1.5rem",
    padding: "1.5rem",
    position: "relative",
    borderRadius: "1rem",
    overflow: "hidden",
    width: "450px",
    maxHeight: "90vh",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  nameInputs: {
    display: "flex",
    gap: "1.5rem",
    width: "100%",
  },
  title: {
    fontSize: tokens.fontSizeHero900, 
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.2", 
    margin: "0.5rem 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForegroundOnBrand,
    cursor: "pointer",
    marginTop:'0.25rem',
    ":hover": {
      backgroundColor: tokens.colorBrandBackground3Static,
    },
  },
  text: {
    color: tokens.colorNeutralForeground4,
    fontWeight: tokens.fontWeightSemibold,
  },
  textSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  text_link: {
    fontSize: tokens.fontSizeBase400,
  },
  link: {
    color: tokens.colorBrandForeground1,
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  logo: {
    width:'50px'
  },
  logoDark: {
    filter: 'brightness(0) invert(1)', 
  },
})

const Login = () => {
  const classes = useStyles()
  const navigate = useNavigate()
 const backendUrl = import.meta.env.VITE_BACKEND_URL  


  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const {isDarkMode} = useTheme();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${backendUrl}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message)
      }

      const data = await res.json()
      console.log("Login success:", data)
      navigate("/")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className={classes.background}>
      <form className={classes.container} onSubmit={handleSubmit}>
        <div className={classes.header}>
          <div>
          <Image src={logo} alt="logo" className={mergeClasses(classes.logo, isDarkMode && classes.logoDark)}/>
          </div>
          <Text as="h1" className={classes.title}>
          Welcome Back to ESI  SBA Incubator
          </Text>
          <Text className={classes.text}>Log in to continue your journey</Text>
          

          {error && <Text style={{ color: "red" }}>{error}</Text>}
          <Input
            label="Email"
            placeholder="m.riad@esi-sba.dz"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          <Button type="submit" className={classes.button} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <div className={classes.textSection}>
            <Text className={mergeClasses(classes.text, classes.text_link)}>
              Doesn't have an account?{" "}
              <Link to="/signup" className={classes.link}>
                  Sign Up
              </Link>
            </Text>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login

