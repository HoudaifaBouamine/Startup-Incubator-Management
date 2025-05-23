"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, mergeClasses, tokens, Button, Text, Image } from "@fluentui/react-components";
import logo from "../assets/Logo Image.svg";
import { Link } from "react-router-dom";
import Input from "./components/Input";
import { useState } from "react";
import { useTheme } from "../main";
import { ArrowLeftRegular, CheckmarkCircleRegular } from "@fluentui/react-icons";
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
        gap: "1.75rem",
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
        width: "100%",
    },
    title: {
        fontSize: tokens.fontSizeHero700,
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
        marginTop: "0.25rem",
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
        marginTop: "0.5rem",
    },
    text_link: {
        fontSize: tokens.fontSizeBase400,
    },
    link: {
        color: tokens.colorBrandForeground1,
        ":hover": {
            color: tokens.colorNeutralForeground1,
        },
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
    },
    logo: {
        width: "70px",
        marginBottom: "0.5rem",
    },
    logoDark: {
        filter: "brightness(0) invert(1)",
    },
    successMessage: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "1rem",
        textAlign: "center",
    },
    successIcon: {
        fontSize: "48px",
        color: tokens.colorStatusSuccessForeground1,
    },
    errorText: {
        color: tokens.colorPaletteRedForeground1,
        fontSize: "14px",
        marginTop: "0.5rem",
    },
});
const ForgotPassword = () => {
    const classes = useStyles();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { isDarkMode } = useTheme();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${backendUrl}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "An error occurred while requesting password reset.");
            }
            setSuccess(true);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: classes.background, children: _jsx("div", { className: classes.container, children: !success ? (_jsxs("form", { className: classes.header, onSubmit: handleSubmit, children: [_jsx("div", { children: _jsx(Image, { src: logo || "/placeholder.svg", alt: "logo", className: mergeClasses(classes.logo, isDarkMode && classes.logoDark) }) }), _jsx(Text, { as: "h1", className: classes.title, children: "Forgot Password" }), _jsx(Text, { className: classes.text, children: "Enter your email address and we'll send you a link to reset your password." }), error && _jsx(Text, { className: classes.errorText, children: error }), _jsx(Input, { label: "Email Address", placeholder: "m.riad@esi-sba.dz", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx(Button, { type: "submit", className: classes.button, disabled: loading, children: loading ? "Sending..." : "Reset Password" }), _jsx("div", { className: classes.textSection, children: _jsxs(Link, { to: "/login", className: classes.link, children: [_jsx(ArrowLeftRegular, {}), "Back to Login"] }) })] })) : (_jsxs("div", { className: classes.successMessage, children: [_jsx(CheckmarkCircleRegular, { className: classes.successIcon }), _jsx(Text, { as: "h2", className: classes.title, style: { textAlign: "center" }, children: "Check Your Email" }), _jsxs(Text, { className: classes.text, style: { textAlign: "center" }, children: ["We've sent a password reset link to ", email, ". Please check your inbox and follow the instructions to reset your password."] }), _jsx(Button, { appearance: "secondary", onClick: () => {
                            setSuccess(false);
                            setEmail("");
                        }, children: "Send Again" }), _jsx("div", { className: classes.textSection, children: _jsxs(Link, { to: "/login", className: classes.link, children: [_jsx(ArrowLeftRegular, {}), "Back to Login"] }) })] })) }) }));
};
export default ForgotPassword;
