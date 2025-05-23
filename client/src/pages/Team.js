"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { makeStyles, tokens, Button, Checkbox, Input, Avatar } from "@fluentui/react-components";
import { MoreHorizontalRegular, CopyRegular, ShareRegular, PersonAddRegular } from "@fluentui/react-icons";
const useStyles = makeStyles({
    root: {
        display: "flex",
        height: "100vh",
        backgroundColor: tokens.colorNeutralBackground2,
    },
    mainContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
    },
    content: {
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
    },
    headerSection: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
    },
    title: {
        fontSize: "24px",
        fontWeight: "600",
        color: tokens.colorNeutralForeground1,
        margin: 0,
    },
    subtext: {
        fontSize: "14px",
        color: tokens.colorNeutralForeground2,
        marginTop: "0.5rem",
    },
    inviteButton: {
        backgroundColor: tokens.colorBrandBackground,
        color: tokens.colorNeutralForegroundOnBrand,
        fontWeight: "600",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        ":hover": {
            backgroundColor: tokens.colorBrandBackgroundHover,
        },
    },
    section: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "2rem",
    },
    sectionTitle: {
        fontSize: "18px",
        fontWeight: "600",
        color: tokens.colorNeutralForeground1,
        margin: 0,
    },
    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 4px",
    },
    tableHeader: {
        textAlign: "left",
        padding: "0.5rem 1rem",
        fontSize: "12px",
        fontWeight: "600",
        color: tokens.colorNeutralForeground2,
    },
    tableRow: {
        backgroundColor: tokens.colorNeutralBackground1,
        ":hover": {
            backgroundColor: tokens.colorNeutralBackground3,
        },
    },
    tableCell: {
        padding: "0.75rem 1rem",
        fontSize: "14px",
        color: tokens.colorNeutralForeground1,
        verticalAlign: "middle",
    },
    checkboxCell: {
        width: "40px",
        padding: "0.5rem 1rem",
    },
    profileCell: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    },
    avatar: {
        position: "relative",
    },
    onlineIndicator: {
        position: "absolute",
        bottom: "0",
        right: "0",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: tokens.colorStatusSuccessBackground3,
        border: `2px solid ${tokens.colorNeutralBackground1}`,
    },
    name: {
        fontSize: "14px",
        fontWeight: "500",
        color: tokens.colorNeutralForeground1,
    },
    yearCell: {
        fontSize: "14px",
        color: tokens.colorNeutralForeground2,
    },
    emailCell: {
        fontSize: "14px",
        color: tokens.colorNeutralForeground2,
    },
    actionsCell: {
        width: "40px",
        textAlign: "center",
    },
    menuButton: {
        background: "transparent",
        border: "none",
        color: tokens.colorNeutralForeground2,
        padding: "4px",
        ":hover": {
            backgroundColor: tokens.colorNeutralBackground3,
            borderRadius: "4px",
        },
    },
    // Modal styles
    modalContent: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    },
    modalSection: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    modalSectionTitle: {
        fontSize: "14px",
        fontWeight: "600",
        color: tokens.colorNeutralForeground2,
        textTransform: "uppercase",
        margin: 0,
    },
    emailInputWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    },
    emailInput: {
        flex: 1,
    },
    sendInviteButton: {
        backgroundColor: tokens.colorBrandBackground,
        color: tokens.colorNeutralForegroundOnBrand,
        fontWeight: "600",
    },
    memberItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 0",
    },
    memberInfo: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    },
    memberName: {
        fontSize: "14px",
        color: tokens.colorNeutralForeground1,
        margin: 0,
    },
    memberEmail: {
        fontSize: "12px",
        color: tokens.colorNeutralForeground2,
        margin: 0,
    },
    roleSelect: {
        backgroundColor: tokens.colorNeutralBackground3,
        border: "none",
        borderRadius: "4px",
        padding: "0.25rem 0.5rem",
        color: tokens.colorNeutralForeground1,
        fontSize: "14px",
    },
    inviteLinkWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: tokens.colorNeutralBackground3,
        padding: "0.5rem 1rem",
        borderRadius: "4px",
    },
    inviteLink: {
        fontSize: "14px",
        color: tokens.colorNeutralForeground2,
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    actionButton: {
        background: "transparent",
        border: "none",
        color: tokens.colorNeutralForeground2,
        padding: "4px",
        ":hover": {
            backgroundColor: tokens.colorNeutralBackground4,
            borderRadius: "4px",
        },
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        gap: "0.5rem",
        marginTop: "1rem",
    },
    paginationItem: {
        width: "28px",
        height: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        ":hover": {
            backgroundColor: tokens.colorNeutralBackground3,
        },
    },
    paginationItemActive: {
        backgroundColor: tokens.colorNeutralBackground3,
        fontWeight: tokens.fontWeightSemibold,
    },
});
const Team = () => {
    const styles = useStyles();
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    // Members data matching the screenshot
    const members = [
        { id: 1, name: "Mia Johnson", year: "1CS", email: "jo@esi-sba.dz", isOnline: true },
        { id: 2, name: "Liam Carter", year: "1CS", email: "ca@esi-sba.dz", isOnline: true },
        { id: 3, name: "Sophie Brown", year: "2CS", email: "br@esi-sba.dz", isOnline: true },
        { id: 4, name: "Noah Smith", year: "1CS", email: "sm@esi-sba.dz", isOnline: true },
        { id: 5, name: "Emma Davis", year: "2CS", email: "da@esi-sba.dz", isOnline: true },
        { id: 6, name: "Oliver Wilson", year: "1CS", email: "wi@esi-sba.dz", isOnline: true },
    ];
    // Mentors data matching the screenshot
    const mentors = [
        { id: 7, name: "Ella Thompson", year: "1CS", email: "th@esi-sba.dz", isOnline: true },
        { id: 8, name: "James Taylor", year: "1CS", email: "ta@esi-sba.dz", isOnline: true },
    ];
    // Project members for the invite modal
    const projectMembers = [
        { name: "User name", email: "email@esi-sba.dz", role: "Founder" },
        { name: "User name", email: "email@esi-sba.dz", role: "Co-Founder" },
        { name: "User name", email: "email@esi-sba.dz", role: "Tech Lead" },
    ];
    const handleCheckboxChange = (id) => {
        setSelectedMembers((prev) => prev.includes(id.toString()) ? prev.filter((item) => item !== id.toString()) : [...prev, id.toString()]);
    };
    const handleInvite = () => {
        if (email) {
            console.log(`Inviting ${email}`);
            setEmail("");
            setIsModalOpen(false);
        }
    };
    const handleCopyLink = () => {
        navigator.clipboard.writeText("https://www.starthub.com/user/example@");
        console.log("Link copied to clipboard");
    };
    return (_jsxs("div", { className: styles.root, children: [_jsx("div", { className: styles.mainContent, children: _jsxs("div", { className: styles.content, children: [_jsxs("div", { className: styles.headerSection, children: [_jsxs("div", { children: [_jsx("h1", { className: styles.title, children: "My Team" }), _jsx("p", { className: styles.subtext, children: "Upload your file before the deadline to submit for review" })] }), _jsx(Button, { className: styles.inviteButton, icon: _jsx(PersonAddRegular, {}), onClick: () => setIsModalOpen(true), children: "Invite Member" })] }), _jsxs("div", { className: styles.section, children: [_jsxs("h2", { className: styles.sectionTitle, children: ["Members (", members.length, ")"] }), _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: styles.tableHeader, style: { width: "40px" }, children: _jsx(Checkbox, {}) }), _jsx("th", { className: styles.tableHeader, children: "Administrator" }), _jsx("th", { className: styles.tableHeader, children: "Year Of Study" }), _jsx("th", { className: styles.tableHeader, children: "Email" }), _jsx("th", { className: styles.tableHeader, style: { width: "40px" } })] }) }), _jsx("tbody", { children: members.map((member) => (_jsxs("tr", { className: styles.tableRow, children: [_jsx("td", { className: `${styles.tableCell} ${styles.checkboxCell}`, children: _jsx(Checkbox, { checked: selectedMembers.includes(member.id.toString()), onChange: () => handleCheckboxChange(member.id) }) }), _jsx("td", { className: styles.tableCell, children: _jsxs("div", { className: styles.profileCell, children: [_jsxs("div", { className: styles.avatar, children: [_jsx(Avatar, { name: member.name, size: 32, color: "colorful" }), member.isOnline && _jsx("div", { className: styles.onlineIndicator })] }), _jsx("span", { className: styles.name, children: member.name })] }) }), _jsx("td", { className: `${styles.tableCell} ${styles.yearCell}`, children: member.year }), _jsx("td", { className: `${styles.tableCell} ${styles.emailCell}`, children: member.email }), _jsx("td", { className: `${styles.tableCell} ${styles.actionsCell}`, children: _jsx(Button, { className: styles.menuButton, icon: _jsx(MoreHorizontalRegular, {}) }) })] }, member.id))) })] })] }), _jsxs("div", { className: styles.section, children: [_jsxs("h2", { className: styles.sectionTitle, children: ["Mentors (", mentors.length, ")"] }), _jsx("table", { className: styles.table, children: _jsx("tbody", { children: mentors.map((mentor) => (_jsxs("tr", { className: styles.tableRow, children: [_jsx("td", { className: `${styles.tableCell} ${styles.checkboxCell}`, children: _jsx(Checkbox, { checked: selectedMembers.includes(mentor.id.toString()), onChange: () => handleCheckboxChange(mentor.id) }) }), _jsx("td", { className: styles.tableCell, children: _jsxs("div", { className: styles.profileCell, children: [_jsxs("div", { className: styles.avatar, children: [_jsx(Avatar, { name: mentor.name, size: 32, color: "colorful" }), mentor.isOnline && _jsx("div", { className: styles.onlineIndicator })] }), _jsx("span", { className: styles.name, children: mentor.name })] }) }), _jsx("td", { className: `${styles.tableCell} ${styles.yearCell}`, children: mentor.year }), _jsx("td", { className: `${styles.tableCell} ${styles.emailCell}`, children: mentor.email }), _jsx("td", { className: `${styles.tableCell} ${styles.actionsCell}`, children: _jsx(Button, { className: styles.menuButton, icon: _jsx(MoreHorizontalRegular, {}) }) })] }, mentor.id))) }) })] })] }) }), isModalOpen && (_jsx("div", { style: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                }, onClick: () => setIsModalOpen(false), children: _jsxs("div", { style: {
                        backgroundColor: tokens.colorNeutralBackground1,
                        borderRadius: "8px",
                        padding: "1.5rem",
                        width: "450px",
                        maxWidth: "90vw",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }, onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "1.5rem",
                            }, children: [_jsx("h2", { style: { margin: 0, fontSize: "18px", fontWeight: "600" }, children: "Invite a New Member" }), _jsx(Button, { appearance: "subtle", size: "small", onClick: () => setIsModalOpen(false), "aria-label": "Close", icon: _jsx("span", { style: { fontSize: "16px" }, children: "\u00D7" }) })] }), _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1.5rem" }, children: [_jsxs("div", { children: [_jsx("h3", { style: { fontSize: "14px", fontWeight: "600", marginBottom: "0.75rem" }, children: "Invite via Email" }), _jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [_jsx(Input, { style: { flex: 1 }, placeholder: "example@esi-sba.dz", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx(Button, { style: {
                                                        backgroundColor: tokens.colorBrandBackground,
                                                        color: tokens.colorNeutralForegroundOnBrand,
                                                        minWidth: "100px",
                                                    }, onClick: handleInvite, children: "Send invite" })] })] }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: "14px", fontWeight: "600", marginBottom: "0.75rem" }, children: "Registered Users" }), _jsx("div", { style: { display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [
                                                { name: "User name", email: "email@esi-sba.dz", invited: false },
                                                { name: "User name", email: "email@esi-sba.dz", invited: false },
                                                { name: "User name", email: "email@esi-sba.dz", invited: true },
                                                { name: "User name", email: "email@esi-sba.dz", invited: false },
                                                { name: "User name", email: "email@esi-sba.dz", invited: false },
                                            ].map((user, index) => (_jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem" }, children: [_jsx("div", { style: {
                                                                    width: "32px",
                                                                    height: "32px",
                                                                    borderRadius: "50%",
                                                                    backgroundColor: tokens.colorNeutralBackground3,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }, children: _jsx(PersonAddRegular, { style: { fontSize: "16px", color: tokens.colorNeutralForeground3 } }) }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: "14px", fontWeight: "500" }, children: user.name }), _jsx("div", { style: { fontSize: "12px", color: tokens.colorNeutralForeground2 }, children: user.email })] })] }), _jsx(Button, { appearance: user.invited ? "subtle" : "outline", icon: user.invited ? (_jsx("span", { style: {
                                                                width: "16px",
                                                                height: "16px",
                                                                borderRadius: "50%",
                                                                backgroundColor: tokens.colorStatusSuccessBackground1,
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                color: "white",
                                                                fontSize: "10px",
                                                            }, children: "\u2713" })) : (_jsx("span", { children: "+" })), children: user.invited ? "Invited" : "Invite" })] }, index))) })] }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: "14px", fontWeight: "600", marginBottom: "0.75rem" }, children: "Invite via Link" }), _jsxs("div", { style: {
                                                display: "flex",
                                                border: `1px solid ${tokens.colorNeutralStroke1}`,
                                                borderRadius: "4px",
                                                overflow: "hidden",
                                            }, children: [_jsx("input", { style: {
                                                        flex: 1,
                                                        padding: "0.5rem 0.75rem",
                                                        border: "none",
                                                        outline: "none",
                                                        fontSize: "14px",
                                                    }, value: "https://www.starthub.com/user/example@", readOnly: true }), _jsx(Button, { appearance: "subtle", icon: _jsx(CopyRegular, {}), onClick: handleCopyLink, style: { borderLeft: `1px solid ${tokens.colorNeutralStroke1}` } }), _jsx(Button, { appearance: "subtle", icon: _jsx(ShareRegular, {}), style: { borderLeft: `1px solid ${tokens.colorNeutralStroke1}` } })] })] })] })] }) }))] }));
};
export default Team;
