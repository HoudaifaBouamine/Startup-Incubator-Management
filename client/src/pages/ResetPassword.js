"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { makeStyles, mergeClasses, tokens, Button, Text, Image } from "@fluentui/react-components";
import logo from "../assets/Logo Image.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Input from "./components/Input";
import { useState, useEffect } from "react";
import { useTheme } from "../main";
import { ArrowLeftRegular, CheckmarkCircleRegular, EyeOff24Filled, Eye24Filled, InfoRegular, ErrorCircleRegular, } from "@fluentui/react-icons";
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
    inputWrapper: {
        position: "relative",
        width: "100%",
    },
    passwordToggle: {
        position: "absolute",
        right: "10px",
        top: "calc(50% + 10px)", // Adjusted to account for label
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
    errorIcon: {
        fontSize: "48px",
        color: tokens.colorStatusDangerForeground1,
    },
    errorText: {
        color: tokens.colorPaletteRedForeground1,
        fontSize: "14px",
        marginTop: "0.5rem",
    },
    passwordRequirements: {
        fontSize: "12px",
        color: tokens.colorNeutralForeground3,
        marginTop: "0.25rem",
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        borderRadius: "1rem",
    },
    loadingText: {
        fontSize: "16px",
        fontWeight: "600",
        color: tokens.colorBrandForeground1,
    },
    infoBox: {
        display: "flex",
        alignItems: "flex-start",
        gap: "0.5rem",
        padding: "0.75rem",
        backgroundColor: tokens.colorNeutralBackground3,
        borderRadius: "0.25rem",
        marginTop: "0.5rem",
    },
    infoIcon: {
        color: tokens.colorBrandForeground1,
        fontSize: "20px",
        flexShrink: 0,
        marginTop: "0.125rem",
    },
});
const ResetPassword = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { isDarkMode } = useTheme();
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [tokenValidated, setTokenValidated] = useState(false);
    const [tokenValidating, setTokenValidating] = useState(false);
    const [tokenError, setTokenError] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetError, setResetError] = useState(null);
    const [resetLoading, setResetLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        try {
            const queryParams = new URLSearchParams(location.search);
            const tokenFromUrl = queryParams.get("token");
            const emailFromUrl = queryParams.get("email");
            if (tokenFromUrl) {
                setToken(tokenFromUrl);
                if (emailFromUrl) {
                    setEmail(emailFromUrl);
                }
                validateToken(tokenFromUrl, emailFromUrl || "");
            }
        }
        catch (error) {
            console.error("Error extracting parameters from URL:", error);
            setTokenError("Could not process the reset link. Please try again or request a new link.");
        }
    }, [location]);
    const validateToken = async (tokenToValidate, emailToUse) => {
        if (!tokenToValidate) {
            setTokenError("Missing reset token. Please check your reset link or request a new one.");
            return;
        }
        setTokenValidating(true);
        setTokenError(null);
        try {
            const res = await fetch(`${backendUrl}/validate-reset-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    token: tokenToValidate,
                    email: emailToUse || undefined,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Invalid or expired token. Please request a new password reset link.");
            }
            if (data.valid) {
                setTokenValidated(true);
                if (data.email && !emailToUse) {
                    setEmail(data.email);
                }
            }
            else {
                throw new Error(data.message || "Invalid or expired token. Please request a new password reset link.");
            }
        }
        catch (err) {
            setTokenError(err.message);
            setTokenValidated(false);
        }
        finally {
            setTokenValidating(false);
        }
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setResetError(null);
        if (newPassword !== confirmPassword) {
            setResetError("Passwords do not match");
            return;
        }
        if (newPassword.length < 8) {
            setResetError("Password must be at least 8 characters long");
            return;
        }
        setResetLoading(true);
        try {
            const res = await fetch(`${backendUrl}/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    token,
                    newPassword,
                    email: email || undefined,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "An error occurred while resetting your password.");
            }
            setSuccess(true);
        }
        catch (err) {
            setResetError(err.message);
        }
        finally {
            setResetLoading(false);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    if (tokenError && !tokenValidating && !tokenValidated) {
        return (_jsx("div", { className: classes.background, children: _jsx("div", { className: classes.container, children: _jsxs("div", { className: classes.successMessage, children: [_jsx(ErrorCircleRegular, { className: classes.errorIcon }), _jsx(Text, { as: "h2", className: classes.title, style: { textAlign: "center" }, children: "Invalid Reset Link" }), _jsx(Text, { className: classes.text, style: { textAlign: "center" }, children: tokenError }), _jsxs("div", { className: classes.infoBox, children: [_jsx(InfoRegular, { className: classes.infoIcon }), _jsx(Text, { className: classes.text, style: { color: tokens.colorNeutralForeground1 }, children: "Reset links are valid for a limited time. Please request a new password reset link." })] }), _jsx(Button, { className: classes.button, onClick: () => {
                                navigate("/forgot-password");
                            }, children: "Request New Reset Link" }), _jsxs(Link, { to: "/login", className: classes.link, children: [_jsx(ArrowLeftRegular, {}), "Back to Login"] })] }) }) }));
    }
    return (_jsx("div", { className: classes.background, children: _jsxs("div", { className: classes.container, children: [(tokenValidating || resetLoading) && (_jsx("div", { className: classes.loadingOverlay, children: _jsx(Text, { className: classes.loadingText, children: tokenValidating ? "Verifying reset link..." : "Resetting password..." }) })), !success ? (_jsxs("form", { className: classes.header, onSubmit: handleResetPassword, children: [_jsx("div", { children: _jsx(Image, { src: logo || "/placeholder.svg", alt: "logo", className: mergeClasses(classes.logo, isDarkMode && classes.logoDark) }) }), _jsx(Text, { as: "h1", className: classes.title, children: "Reset Password" }), _jsx(Text, { className: classes.text, children: "Create a new password for your account." }), tokenValidated ? (_jsxs(_Fragment, { children: [resetError && _jsx(Text, { className: classes.errorText, children: resetError }), _jsxs("div", { className: classes.inputWrapper, children: [_jsx(Input, { label: "New Password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", type: showPassword ? "text" : "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value) }), _jsx("button", { type: "button", className: classes.passwordToggle, onClick: togglePasswordVisibility, "aria-label": showPassword ? "Hide password" : "Show password", children: showPassword ? _jsx(Eye24Filled, {}) : _jsx(EyeOff24Filled, {}) })] }), _jsx(Text, { className: classes.passwordRequirements, children: "Password must be at least 8 characters long." }), _jsxs("div", { className: classes.inputWrapper, children: [_jsx(Input, { label: "Confirm Password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", type: showConfirmPassword ? "text" : "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) }), _jsx("button", { type: "button", className: classes.passwordToggle, onClick: toggleConfirmPasswordVisibility, "aria-label": showConfirmPassword ? "Hide password" : "Show password", children: showConfirmPassword ? _jsx(Eye24Filled, {}) : _jsx(EyeOff24Filled, {}) })] }), _jsx(Button, { type: "submit", className: classes.button, disabled: resetLoading, children: resetLoading ? "Resetting..." : "Reset Password" })] })) : (_jsxs("div", { className: classes.infoBox, children: [_jsx(InfoRegular, { className: classes.infoIcon }), _jsx(Text, { className: classes.text, style: { color: tokens.colorNeutralForeground1 }, children: "Verifying your reset link. Please wait..." })] })), _jsx("div", { className: classes.textSection, children: _jsxs(Link, { to: "/login", className: classes.link, children: [_jsx(ArrowLeftRegular, {}), "Back to Login"] }) })] })) : (_jsxs("div", { className: classes.successMessage, children: [_jsx(CheckmarkCircleRegular, { className: classes.successIcon }), _jsx(Text, { as: "h2", className: classes.title, style: { textAlign: "center" }, children: "Password Reset Successful" }), _jsx(Text, { className: classes.text, style: { textAlign: "center" }, children: "Your password has been successfully reset. You can now log in with your new password." }), _jsx(Button, { className: classes.button, onClick: () => {
                                navigate("/login");
                            }, children: "Go to Login" })] }))] }) }));
};
export default ResetPassword;
