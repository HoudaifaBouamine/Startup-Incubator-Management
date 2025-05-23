import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, tokens, Text, Image, mergeClasses } from '@fluentui/react-components';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo Image.svg';
import { PersonRegular, BookRegular } from '@fluentui/react-icons';
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
        alignItems: 'center',
        gap: '2rem',
        padding: '2rem',
        paddingTop: '2.5rem',
        paddingBottom: '3rem',
        position: 'relative',
        borderRadius: '1rem',
        width: '450px',
        maxHeight: '90vh',
        minHeight: '400px',
        boxShadow: tokens.shadow8,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    },
    title: {
        fontSize: tokens.fontSizeHero800,
        fontFamily: tokens.fontFamilyBase,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
        lineHeight: '1.2',
    },
    text: {
        color: tokens.colorNeutralForeground4,
        fontWeight: tokens.fontWeightSemibold,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: tokens.colorBrandBackground,
        borderRadius: tokens.borderRadiusMedium,
        fontWeight: tokens.fontWeightSemibold,
        fontSize: tokens.fontSizeBase400,
        color: tokens.colorNeutralForegroundOnBrand,
        cursor: 'pointer',
        textDecoration: 'none',
        textAlign: 'center',
        ':hover': {
            backgroundColor: tokens.colorBrandBackgroundHover,
            color: tokens.colorNeutralForegroundOnBrand,
        },
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
    },
    logo: {
        width: '50px',
        height: 'auto',
        marginBottom: '1rem',
    },
    logoDark: {
        filter: 'brightness(0) invert(1)',
    },
});
const SignUpSelection = () => {
    const classes = useStyles();
    const { isDarkMode } = useTheme();
    return (_jsx("div", { className: classes.background, children: _jsxs("div", { className: classes.container, children: [_jsx(Image, { src: logo, alt: "Logo", className: mergeClasses(classes.logo, isDarkMode && classes.logoDark) }), _jsxs("div", { className: classes.header, children: [_jsx(Text, { className: classes.title, as: "h2", children: "Choose Your Role" }), _jsx(Text, { className: classes.text, children: "Select your role to continue with the signup process." })] }), _jsxs("div", { className: classes.buttonContainer, children: [_jsxs(Link, { to: "/signup/student", className: classes.button, children: [_jsx(BookRegular, { style: { marginRight: '8px' } }), " Student"] }), _jsxs(Link, { to: "/signup/professor", className: classes.button, children: [_jsx(PersonRegular, { style: { marginRight: '8px' } }), " Professor"] })] })] }) }));
};
export default SignUpSelection;
