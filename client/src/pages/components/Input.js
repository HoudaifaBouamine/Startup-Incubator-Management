import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label, tokens, makeStyles } from '@fluentui/react-components';
const useStyles = makeStyles({
    inputWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    },
    labelWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    inputField: {
        height: '40px',
        width: '100%',
        border: 'none',
        background: 'transparent',
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground1,
        paddingLeft: '0.5rem',
        outline: 'none',
        '::placeholder': {
            color: tokens.colorNeutralForeground4,
        },
    },
    Text: {
        fontWeight: tokens.fontWeightSemibold,
        flexShrink: 0,
    },
    errorText: {
        color: tokens.colorPaletteRedForeground1,
        fontSize: tokens.fontSizeBase200,
        padding: '0.25rem 0.5rem',
        borderRadius: tokens.borderRadiusSmall,
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow4,
        whiteSpace: 'nowrap',
    },
    Divider: {
        borderBottom: `1px solid ${tokens.colorNeutralForeground1}`,
        width: '100%',
    },
});
const Input = ({ label, placeholder, value, onChange, errorMessage, onBlur, onKeyDown, type = 'text', }) => {
    const classes = useStyles();
    return (_jsxs("div", { className: classes.inputWrapper, children: [_jsxs("div", { className: classes.labelWrapper, children: [_jsx(Label, { className: classes.Text, children: label }), errorMessage && _jsx("span", { className: classes.errorText, children: errorMessage })] }), _jsx("input", { type: type, placeholder: placeholder, value: value, onChange: onChange, onBlur: onBlur, onKeyDown: onKeyDown, className: classes.inputField }), _jsx("div", { className: classes.Divider })] }));
};
export default Input;
