"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, mergeClasses, tokens, Button, Text, Image } from "@fluentui/react-components";
import logo from "../assets/Logo Image.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "./components/Input";
import { useState } from "react";
import { useTheme } from "../main";
import { ArrowLeftRegular, CheckmarkCircleRegular, EyeOff24Filled, Eye24Filled } from "@fluentui/react-icons";
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
    divider: {
        width: "100%",
        height: "1px",
        backgroundColor: tokens.colorNeutralStroke2,
        margin: "0.5rem 0",
    },
});
const UpdatePassword = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { isDarkMode } = useTheme();
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        // Validate inputs
        if (!email) {
            setError("Email is required");
            return;
        }
        if (!currentPassword) {
            setError("Current password is required");
            return;
        }
        if (!newPassword) {
            setError("New password is required");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }
        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long");
            return;
        }
        if (currentPassword === newPassword) {
            setError("New password must be different from your current password");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${backendUrl}/password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email,
                    currentPassword,
                    newPassword,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error("Current password is incorrect");
                }
                else if (res.status === 404) {
                    throw new Error("User not found. Please check your email address");
                }
                else {
                    throw new Error(data.message || "An error occurred while updating your password");
                }
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
    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    return (_jsx("div", { className: classes.background, children: _jsxs("div", { className: classes.container, children: [loading && (_jsx("div", { className: classes.loadingOverlay, children: _jsx(Text, { className: classes.loadingText, children: "Updating password..." }) })), !success ? (_jsxs("form", { className: classes.header, onSubmit: handleSubmit, children: [_jsx("div", { children: _jsx(Image, { src: logo || "/placeholder.svg", alt: "logo", className: mergeClasses(classes.logo, isDarkMode && classes.logoDark) }) }), _jsx(Text, { as: "h1", className: classes.title, children: "Update Password" }), _jsx(Text, { className: classes.text, children: "Change your current password to a new one." }), error && _jsx(Text, { className: classes.errorText, children: error }), _jsx(Input, { label: "Email Address", placeholder: "m.riad@esi-sba.dz", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("div", { className: classes.divider }), _jsxs("div", { className: classes.inputWrapper, children: [_jsx(Input, { label: "Current Password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", type: showCurrentPassword ? "text" : "password", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value) }), _jsx("button", { type: "button", className: classes.passwordToggle, onClick: toggleCurrentPasswordVisibility, "aria-label": showCurrentPassword ? "Hide password" : "Show password", children: showCurrentPassword ? _jsx(Eye24Filled, {}) : _jsx(EyeOff24Filled, {}) })] }), _jsxs("div", { className: classes.inputWrapper, children: [_jsx(Input, { label: "New Password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", type: showNewPassword ? "text" : "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value) }), _jsx("button", { type: "button", className: classes.passwordToggle, onClick: toggleNewPasswordVisibility, "aria-label": showNewPassword ? "Hide password" : "Show password", children: showNewPassword ? _jsx(Eye24Filled, {}) : _jsx(EyeOff24Filled, {}) })] }), _jsx(Text, { className: classes.passwordRequirements, children: "New password must be at least 8 characters long and different from your current password." }), _jsxs("div", { className: classes.inputWrapper, children: [_jsx(Input, { label: "Confirm New Password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", type: showConfirmPassword ? "text" : "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) }), _jsx("button", { type: "button", className: classes.passwordToggle, onClick: toggleConfirmPasswordVisibility, "aria-label": showConfirmPassword ? "Hide password" : "Show password", children: showConfirmPassword ? _jsx(Eye24Filled, {}) : _jsx(EyeOff24Filled, {}) })] }), _jsx(Button, { type: "submit", className: classes.button, disabled: loading, children: loading ? "Updating..." : "Update Password" }), _jsxs("div", { className: classes.textSection, children: [_jsx(Link, { to: "/forgot-password", className: classes.link, children: "Forgot your current password?" }), _jsxs(Link, { to: "/login", className: classes.link, children: [_jsx(ArrowLeftRegular, {}), "Back to Login"] })] })] })) : (_jsxs("div", { className: classes.successMessage, children: [_jsx(CheckmarkCircleRegular, { className: classes.successIcon }), _jsx(Text, { as: "h2", className: classes.title, style: { textAlign: "center" }, children: "Password Updated Successfully" }), _jsx(Text, { className: classes.text, style: { textAlign: "center" }, children: "Your password has been successfully updated. You can now log in with your new password." }), _jsx(Button, { className: classes.button, onClick: () => {
                                navigate("/login");
                            }, children: "Go to Login" })] }))] }) }));
};
export default UpdatePassword;
