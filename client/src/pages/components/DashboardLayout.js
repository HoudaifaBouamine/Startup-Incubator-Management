import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { makeStyles, tokens } from '@fluentui/react-components';
import Header from './Header';
import Sidebar from './sideBar';
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: tokens.colorNeutralBackground2,
        padding: '0',
        margin: '0',
    },
    header: {
        width: '100%',
    },
    contentWrapper: {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
        },
    },
    sidebar: {
        width: '260px',
        '@media (max-width: 768px)': {
            width: '100%',
        },
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        '@media (max-width: 768px)': {
            padding: '0.5rem',
        },
    },
});
const DashboardLayout = () => {
    const styles = useStyles();
    return (_jsxs("div", { className: styles.root, children: [_jsx("div", { className: styles.header, children: _jsx(Header, {}) }), _jsxs("div", { className: styles.contentWrapper, children: [_jsx("div", { className: styles.sidebar, children: _jsx(Sidebar, {}) }), _jsx("div", { className: styles.mainContent, children: _jsx(Outlet, {}) })] })] }));
};
export default DashboardLayout;
