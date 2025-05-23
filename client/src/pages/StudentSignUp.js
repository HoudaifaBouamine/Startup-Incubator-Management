"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, mergeClasses, tokens, Button, Text, Image } from "@fluentui/react-components";
import logo from "../assets/Logo Image.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "./components/Input";
import { useState } from "react";
import { useTheme } from "../main";
import { Eye24Filled, EyeOff24Filled } from "@fluentui/react-icons";
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
        fontSize: tokens.fontSizeHero800,
        fontFamily: tokens.fontFamilyBase,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
        lineHeight: "1",
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
        width: "50px",
    },
    logoDark: {
        filter: "brightness(0) invert(1)",
    },
    inputWrapper: {
        position: "relative",
        width: "100%",
    },
    passwordToggle: {
        position: "absolute",
        right: "10px",
        top: "calc(50% + 10px)",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: tokens.colorNeutralForeground3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px",
        zIndex: 1,
    },
});
const StudentSignUp = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { isDarkMode } = useTheme();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${backendUrl}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    password,
                    role: "MEMBER",
                }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Erreur lors de l'inscription");
            }
            const data = await res.json();
            console.log("Register success:", data);
            navigate("/verifyEmail");
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (_jsx("div", { className: classes.background, children: _jsx("form", { className: classes.container, onSubmit: handleSubmit, children: _jsxs("div", { className: classes.header, children: [_jsx("div", { children: _jsx(Image, { src: logo || "/placeholder.svg", alt: "logo", className: mergeClasses(classes.logo, isDarkMode && classes.logoDark) }) }), _jsx(Text, { as: "h1", className: classes.title, children: "Create Your Student Account" }), _jsx(Text, { className: classes.text, children: "Join the ESI SBA incubator platform and start your journey." }), error && _jsx(Text, { style: { color: "red" }, children: error }), _jsxs("div", { className: classes.nameInputs, children: [_jsx(Input, { label: "First Name", placeholder: "Riad", value: firstName, onChange: (e) => setFirstName(e.target.value) }), _jsx(Input, { label: "Last Name", placeholder: "Mohamed", value: lastName, onChange: (e) => setLastName(e.target.value) })] }), _jsx(Input, { label: "Email", placeholder: "m.riad@esi-sba.dz", value: email, onChange: (e) => setEmail(e.target.value) }), _jsxs("div", { className: classes.inputWrapper, children: [_jsx(Input, { label: "Password", placeholder: "Password", type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("button", { type: "button", className: classes.passwordToggle, onClick: togglePasswordVisibility, "aria-label": showPassword ? "Hide password" : "Show password", children: showPassword ? _jsx(Eye24Filled, {}) : _jsx(EyeOff24Filled, {}) })] }), _jsx(Button, { type: "submit", className: classes.button, disabled: loading, children: loading ? "Signing Up..." : "Sign Up" }), _jsxs("div", { className: classes.textSection, children: [_jsxs(Text, { className: mergeClasses(classes.text, classes.text_link), children: ["Already have an account?", " ", _jsx(Link, { to: "/login", className: classes.link, children: "Log in" })] }), _jsx(Text, { className: classes.text, children: "By signing up, you agree to our Terms & Privacy Policy." })] })] }) }) }));
};
export default StudentSignUp;
