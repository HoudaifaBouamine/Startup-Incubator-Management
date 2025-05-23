import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Divider, makeStyles, tokens } from '@fluentui/react-components';
import { PeopleTeamRegular, PeopleTeamFilled, SettingsRegular, SettingsFilled, SignOutRegular, SignOutFilled, GridRegular, GridFilled, DualScreenStatusBarRegular, DualScreenStatusBarFilled, HeadsetRegular, HeadsetFilled, DesktopTowerRegular, DesktopTowerFilled } from '@fluentui/react-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const useStyles = makeStyles({
    sidebar: {
        backgroundColor: tokens.colorNeutralBackground3,
        width: '260px',
        height: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
        padding: '16px 0',
        gap: '16rem',
        transform: 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        '@media (max-width: 768px)': {
            width: '100%',
            height: 'auto',
            gap: '1rem',
        },
    },
    sidebarVisible: {
        transform: 'translateX(0)',
    },
    navSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        color: tokens.colorNeutralForeground2,
        textDecoration: 'none',
        fontSize: '14px',
        height: '44px',
        gap: '12px',
        cursor: 'pointer',
        position: 'relative',
        boxSizing: 'border-box',
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground2,
        },
        '@media (max-width: 768px)': {
            padding: '8px 12px',
            height: '36px',
            fontSize: '12px',
        },
    },
    activeNavItem: {
        color: tokens.colorNeutralForeground1,
        fontWeight: '600',
        '::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '3px',
            height: '100%',
            backgroundColor: tokens.colorCompoundBrandStroke,
        },
    },
    icon: {
        fontSize: '20px',
        width: '20px',
        height: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 768px)': {
            fontSize: '16px',
            width: '16px',
            height: '16px',
        },
    },
    activeIcon: {
        color: tokens.colorCompoundBrandStroke,
        fontSize: '20px',
        width: '20px',
        height: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 768px)': {
            fontSize: '16px',
            width: '16px',
            height: '16px',
        },
    },
    customDivider: {
        backgroundColor: tokens.colorNeutralStroke1,
    },
    bottomItems: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
});
const Sidebar = () => {
    const styles = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    const topNavItems = [
        {
            label: 'Dashboard',
            regularIcon: _jsx(GridRegular, {}),
            filledIcon: _jsx(GridFilled, {}),
            path: '/dashboard',
        },
        {
            label: 'Progress',
            regularIcon: _jsx(DesktopTowerRegular, {}),
            filledIcon: _jsx(DesktopTowerFilled, {}),
            path: '/Progress',
        },
        {
            label: 'Team',
            regularIcon: _jsx(PeopleTeamRegular, {}),
            filledIcon: _jsx(PeopleTeamFilled, {}),
            path: '/team',
        },
        {
            label: 'Training',
            regularIcon: _jsx(DualScreenStatusBarRegular, {}),
            filledIcon: _jsx(DualScreenStatusBarFilled, {}),
            path: '/training',
        },
    ];
    const bottomNavItems = [
        {
            label: 'Support',
            regularIcon: _jsx(HeadsetRegular, {}),
            filledIcon: _jsx(HeadsetFilled, {}),
            path: '/support',
        },
        {
            label: 'Settings',
            regularIcon: _jsx(SettingsRegular, {}),
            filledIcon: _jsx(SettingsFilled, {}),
            path: '/settings',
        },
        {
            label: 'Log out',
            regularIcon: _jsx(SignOutRegular, {}),
            filledIcon: _jsx(SignOutFilled, {}),
            path: '/logout',
        },
    ];
    return (_jsxs("nav", { className: `${styles.sidebar} ${isVisible ? styles.sidebarVisible : ''}`, children: [_jsxs("div", { className: styles.navSection, children: [topNavItems.map((item) => (_jsxs(Link, { to: item.path, className: `${styles.navItem} ${location.pathname === item.path ? styles.activeNavItem : ''}`, children: [_jsx("span", { className: location.pathname === item.path ? styles.activeIcon : styles.icon, children: location.pathname === item.path ? item.filledIcon : item.regularIcon }), _jsx("span", { children: item.label })] }, item.label))), _jsx(Divider, { className: styles.customDivider })] }), _jsxs("div", { className: styles.bottomItems, children: [_jsx(Divider, { className: styles.customDivider }), bottomNavItems.map((item) => (item.label === 'Log out' ? (_jsxs("div", { className: `${styles.navItem} ${location.pathname === item.path ? styles.activeNavItem : ''}`, onClick: handleLogout, children: [_jsx("span", { className: location.pathname === item.path ? styles.activeIcon : styles.icon, children: location.pathname === item.path ? item.filledIcon : item.regularIcon }), _jsx("span", { children: item.label })] }, item.label)) : (_jsxs(Link, { to: item.path, className: `${styles.navItem} ${location.pathname === item.path ? styles.activeNavItem : ''}`, children: [_jsx("span", { className: location.pathname === item.path ? styles.activeIcon : styles.icon, children: location.pathname === item.path ? item.filledIcon : item.regularIcon }), _jsx("span", { children: item.label })] }, item.label))))] })] }));
};
export default Sidebar;
