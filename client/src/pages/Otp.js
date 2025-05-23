import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, mergeClasses, tokens, Button, Input, Text, Image, MessageBar, MessageBarBody, MessageBarTitle } from '@fluentui/react-components';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Logo Image.svg';
import { useTheme } from '../main';
const useStyles = makeStyles({
    background: {
        backgroundColor: tokens.colorNeutralBackground2,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: tokens.colorNeutralBackground1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '2rem',
        padding: '2rem',
        paddingTop: '2.5rem',
        paddingBottom: '5rem',
        position: 'relative',
        borderRadius: '1rem',
        width: '450px',
        maxHeight: '90vh',
        minHeight: '350px',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    title: {
        fontSize: tokens.fontSizeHero900,
        fontFamily: tokens.fontFamilyBase,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
        lineHeight: '1.2',
    },
    otpContainer: {
        display: 'flex',
        gap: '0px',
        width: '100%',
        justifyContent: 'space-between',
    },
    otpInput: {
        flex: '1',
        height: '50px',
        fontSize: tokens.fontSizeBase400,
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        color: tokens.colorBrandBackground,
        borderRadius: '0px',
        padding: '0px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& input': {
            textAlign: 'center',
            justifyContent: 'center',
            padding: '0',
            fontSize: '24px',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
        },
    },
    firstOtpInput: {
        borderRadius: '10px 0 0 10px',
    },
    lastOtpInput: {
        borderRadius: '0 10px 10px 0',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: tokens.colorBrandBackground,
        borderRadius: tokens.borderRadiusMedium,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForegroundOnBrand,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: tokens.colorBrandBackground3Static,
        },
    },
    resendCode: {
        color: tokens.colorBrandBackground,
        fontWeight: tokens.fontWeightSemibold,
        cursor: 'pointer',
        ':hover': {
            textDecoration: 'underline',
        },
    },
    text: {
        color: tokens.colorNeutralForeground4,
        fontWeight: tokens.fontWeightSemibold,
    },
    textSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    messageBox: {
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        transitionDuration: '1s',
        width: '300px',
        zIndex: 100,
    },
    label: {
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground2,
    },
    logo: {
        width: '50px'
    },
    logoDark: {
        filter: 'brightness(0) invert(1)',
    },
});
const Otp = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useTheme();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef([]);
    const email = location.state?.email || 'your.email@esi-sba.dz';
    const handleChange = (index, value, event) => {
        if (!/^[0-9]?$/.test(value))
            return;
        const newOtp = otp.slice(0, index) + value + otp.slice(index + 1);
        setOtp(newOtp.padEnd(6, ''));
        if (event?.key === 'Enter') {
            handleVerify(new Event('submit'), newOtp);
            return;
        }
        if (event?.key === 'Backspace' && !value && index > 0) {
            inputRefs.current[index - 1]?.focus();
            return;
        }
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (/^\d{6}$/.test(pastedData)) {
            setOtp(pastedData);
            inputRefs.current[5]?.focus();
            handleVerify(new Event('submit'), pastedData);
        }
        else {
            setError('Please paste a valid 6-digit code.');
        }
    };
    const handleVerify = async (e, pastedData) => {
        e.preventDefault();
        if (otp.length < 6 && pastedData.length < 6) {
            setError('Please enter a 6-digit code.');
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    token: otp || pastedData,
                }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Invalid or expired code.');
            }
            const data = await res.json();
            console.log('Verification successful:', data);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    const handleResendCode = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/resend-verification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to resend code.');
            }
            setError('A new code has been sent to your email.');
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        console.log('Current OTP:', otp);
    }, [otp]);
    return (_jsx("div", { className: classes.background, children: _jsxs("form", { className: classes.container, onSubmit: (e) => handleVerify(e, otp), children: [_jsx(Image, { src: logo, alt: "Logo", className: mergeClasses(classes.logo, isDarkMode && classes.logoDark) }), _jsxs("div", { className: classes.header, children: [_jsx(Text, { className: classes.title, as: "h2", children: "Verify Your Email" }), _jsxs(Text, { className: classes.text, children: ["We\u2019ve sent a 6-digit code to ", email, ",", _jsx("br", {}), "enter the code below to verify your account."] })] }), _jsxs("div", { style: { width: '100%' }, children: [_jsx(Text, { className: classes.label, children: "OTP Code" }), _jsx("div", { className: classes.otpContainer, children: Array.from({ length: 6 }, (_, index) => (_jsx(Input, { ref: (el) => (inputRefs.current[index] = el), className: mergeClasses(classes.otpInput, index === 0 && classes.firstOtpInput, index === 5 && classes.lastOtpInput), type: "text", maxLength: 1, inputMode: "numeric", value: otp[index] || '', onChange: (e) => handleChange(index, e.target.value), onKeyDown: (e) => handleChange(index, otp[index] || '', e), onPaste: (e) => handlePaste(e), disabled: loading || success }, index))) })] }), _jsx(Button, { className: classes.button, type: "submit", disabled: loading || success, children: loading ? 'Verifying...' : 'Verify' }), _jsxs("div", { className: classes.textSection, children: [_jsxs(Text, { className: classes.text, children: ["Didn't receive code?", ' ', _jsx(Text, { as: "span", className: classes.resendCode, onClick: handleResendCode, style: { pointerEvents: loading ? 'none' : 'auto' }, children: "Resend Code" })] }), _jsx(Text, { className: classes.text, children: "By signing up, you agree to our Terms & Privacy Policy." })] }), (error || success) && (_jsx(MessageBar, { intent: success ? 'success' : 'error', className: classes.messageBox, children: _jsxs(MessageBarBody, { children: [_jsx(MessageBarTitle, { children: success ? 'Email Verified' : 'Verification Failed' }), success ? 'Your email has been successfully verified.' : error] }) }))] }) }));
};
export default Otp;
