"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { makeStyles, tokens, ProgressBar, TabList, Tab, Spinner } from "@fluentui/react-components";
import { ChevronRightRegular, DocumentRegular, Folder20Filled, Folder20Regular, Comment20Filled, Comment20Regular, CommentDismiss24Regular, CalendarLtr20Regular, ErrorCircleRegular, } from "@fluentui/react-icons";
import { getProjectById, getProjectSessions, getProjectMembers, getProjectEncadrants, } from "../../api/project-service";
import CreateSessionModal from "./components/create-session-modal";
import AddDeliverableModal from "./components/add-delivrable-modal";
import AddFeedbackModal from "./components/add-feedbacl-modal";
const useStyles = makeStyles({
    layout: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "0",
        margin: "0",
    },
    headerSection: {
        backgroundColor: tokens.colorNeutralBackground1,
        padding: "1rem 2rem",
        marginBottom: "0.5rem",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    },
    headerTitle: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: "600",
        color: tokens.colorNeutralForeground1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 0 0.75rem 0",
    },
    progressPercentage: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: "600",
        color: tokens.colorBrandForeground1,
    },
    globalProgressBar: {
        height: "8px",
        backgroundColor: tokens.colorNeutralBackground4,
        "& .fui-ProgressBar__bar": {
            backgroundColor: tokens.colorBrandForeground1,
        },
        margin: "0",
    },
    contentWrapper: {
        display: "flex",
        flex: 1,
        height: "calc(100% - 70px)",
        backgroundColor: tokens.colorNeutralBackground2,
        overflow: "hidden",
        alignItems: "stretch",
    },
    mainContent: {
        flex: 1,
        display: "flex",
        padding: "0.5rem 2rem 1rem",
        gap: "2rem",
        height: "100%",
        position: "relative",
    },
    sessionsSection: {
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        flex: "1 1 33%",
        padding: "0",
        maxHeight: "calc(100vh - 120px)",
    },
    sessionHeader: {
        fontSize: "16px",
        fontWeight: "600",
        color: tokens.colorNeutralForeground1,
        marginBottom: "0.25rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    },
    sessionCount: {
        fontSize: "14px",
        color: tokens.colorNeutralForeground2,
    },
    sessionItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 0.75rem",
        backgroundColor: tokens.colorNeutralBackground1,
        borderRadius: "4px",
        marginBottom: "1px",
        cursor: "pointer",
        ":hover": {
            backgroundColor: tokens.colorNeutralBackground4,
        },
    },
    sessionDate: {
        fontSize: "14px",
        color: tokens.colorBrandForeground1,
        fontWeight: "500",
    },
    deliverablesSection: {
        flex: "2 1 66%",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        maxHeight: "calc(100vh - 120px)",
    },
    tabContainer: {
        marginBottom: "0.5rem",
        borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    },
    deliverableCard: {
        backgroundColor: tokens.colorNeutralBackground1,
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
    },
    deliverableInfo: {
        flex: 1,
    },
    deliverableHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.25rem",
    },
    deliverableName: {
        fontSize: tokens.fontSizeBase500,
        fontWeight: "500",
        color: tokens.colorNeutralForeground1,
        margin: 0,
    },
    deliverableSubtext: {
        fontSize: "14px",
        color: tokens.colorNeutralForeground2,
        margin: 0,
    },
    statusBadge: {
        fontSize: "12px",
        padding: "2px 8px",
        borderRadius: "16px",
        backgroundColor: "transparent",
        border: `1px solid ${tokens.colorBrandStroke1}`,
        color: tokens.colorBrandForeground1,
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
    },
    notStartedBadge: {
        fontSize: "12px",
        padding: "2px 8px",
        borderRadius: "16px",
        backgroundColor: "transparent",
        border: `1px solid ${tokens.colorNeutralForeground3}`,
        color: tokens.colorNeutralForeground3,
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
    },
    progressInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.25rem",
    },
    progressPercentageSmall: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: "600",
        color: tokens.colorBrandForeground1,
    },
    progressChange: {
        fontSize: "14px",
        color: tokens.colorStatusSuccessForeground1,
    },
    feedbackCard: {
        backgroundColor: tokens.colorNeutralBackground1,
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    },
    feedbackAvatar: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: tokens.colorNeutralBackground4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    feedbackText: {
        fontSize: "14px",
        color: tokens.colorNeutralForeground2,
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        gap: "0.5rem",
        marginTop: "0.5rem",
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
    divider: {
        backgroundColor: tokens.colorNeutralStroke2,
        width: "2px",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "calc(33% + 1rem)",
    },
    statItem: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "14px",
    },
    noFeedback: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "3rem 1rem",
        height: "100%",
    },
    noFeedbackIcon: {
        fontSize: "24px",
        color: tokens.colorNeutralForeground3,
        marginBottom: "1rem",
    },
    noFeedbackTitle: {
        fontSize: "16px",
        fontWeight: "600",
        color: tokens.colorNeutralForeground1,
        marginBottom: "0.5rem",
    },
    noFeedbackText: {
        fontSize: "14px",
        color: tokens.colorNeutralForeground2,
        maxWidth: "300px",
        margin: "0 auto",
    },
    noSessionsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "3rem 1rem",
        height: "100%",
        backgroundColor: tokens.colorNeutralBackground1,
        borderRadius: "8px",
    },
    noSessionsIcon: {
        fontSize: "24px",
        color: tokens.colorNeutralForeground3,
        marginBottom: "1rem",
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: tokens.colorNeutralBackground3,
        borderRadius: "8px",
    },
    defaultDeliverablesList: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "100%",
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    errorContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: tokens.colorNeutralBackground1,
        borderRadius: "8px",
        color: tokens.colorStatusDangerForeground1,
        gap: "1rem",
    },
    errorIcon: {
        fontSize: "32px",
        color: tokens.colorStatusDangerForeground1,
    },
    actionsContainer: {
        display: "flex",
        gap: "0.5rem",
        marginTop: "1rem",
    },
});
const defaultDeliverables = [
    {
        title: "Prototype",
        description: "Is the MVP of your product?",
        status: "not started",
        progress: 0,
        change: "+0%",
    },
    {
        title: "Demo Video",
        description: "A demo video to showcase the features and working of your product",
        status: "not started",
        progress: 0,
        change: "+0%",
    },
    {
        title: "Pitch Deck",
        description: "A slides presentation to pitch your project at Demo Day.",
        status: "not started",
        progress: 0,
        change: "+0%",
    },
    {
        title: "Deliverable name",
        description: "Upload your file before the deadline to submit for review",
        status: "not started",
        progress: 0,
        change: "+0%",
    },
];
const Progress = ({ projectId }) => {
    const styles = useStyles();
    const [activeTab, setActiveTab] = useState("deliverables");
    const [selectedSession, setSelectedSession] = useState(0);
    const [sessions, setSessions] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [members, setMembers] = useState([]);
    const [encadrants, setEncadrants] = useState([]);
    const fetchProjectData = async () => {
        try {
            setLoading(true);
            setError(null);
            const projectData = await getProjectById(projectId);
            setProjectName(projectData.name);
            try {
                const sessionsData = await getProjectSessions(projectId);
                setSessions(sessionsData);
            }
            catch (err) {
                console.warn("Sessions endpoint not available:", err);
                setSessions([]);
            }
            try {
                const membersData = await getProjectMembers(projectId);
                setMembers(membersData.relationData || []);
            }
            catch (err) {
                console.warn("Members endpoint error:", err);
                setMembers([]);
            }
            try {
                const encadrantsData = await getProjectEncadrants(projectId);
                setEncadrants(encadrantsData.relationData || []);
            }
            catch (err) {
                console.warn("Encadrants endpoint error:", err);
                setEncadrants([]);
            }
        }
        catch (err) {
            console.error("Error fetching project data:", err);
            setError(err instanceof Error ? err.message : "Failed to load project data");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (projectId) {
            fetchProjectData();
        }
    }, [projectId]);
    const handleTabChange = (_event, data) => {
        setActiveTab(data.value);
    };
    const handleSessionClick = (index) => {
        setSelectedSession(index);
    };
    const handleSessionCreated = () => {
        fetchProjectData();
    };
    const handleDeliverableAdded = () => {
        fetchProjectData();
    };
    const handleFeedbackAdded = () => {
        fetchProjectData();
    };
    const calculateGlobalProgress = () => {
        if (sessions.length === 0)
            return 0;
        let totalProgress = 0;
        let totalDeliverables = 0;
        sessions.forEach((session) => {
            session.deliverables.forEach((deliverable) => {
                totalProgress += deliverable.progress;
                totalDeliverables++;
            });
        });
        return totalDeliverables > 0 ? Math.round(totalProgress / totalDeliverables) : 0;
    };
    const globalProgress = calculateGlobalProgress();
    const hasNoSessions = sessions.length === 0;
    const currentSession = hasNoSessions ? null : sessions[selectedSession];
    const currentDeliverables = hasNoSessions ? [] : currentSession?.deliverables || [];
    const currentFeedbacks = hasNoSessions ? [] : currentSession?.feedbacks || [];
    const totalDeliverables = hasNoSessions
        ? defaultDeliverables.length
        : sessions.reduce((total, session) => total + session.deliverables.length, 0);
    const totalFeedbacks = hasNoSessions
        ? 0
        : sessions.reduce((total, session) => total + (session.feedbacks?.length || 0), 0);
    if (loading) {
        return (_jsx("div", { className: styles.loadingContainer, children: _jsx(Spinner, { size: "large", label: "Loading project progress..." }) }));
    }
    if (error) {
        return (_jsxs("div", { className: styles.errorContainer, children: [_jsx(ErrorCircleRegular, { className: styles.errorIcon }), _jsx("h2", { children: "Error Loading Project" }), _jsx("p", { children: error })] }));
    }
    return (_jsxs("div", { className: styles.layout, children: [_jsxs("div", { className: styles.headerSection, children: [_jsxs("div", { className: styles.headerTitle, children: [_jsxs("h1", { style: { margin: 0 }, children: [projectName || "Project", " Progress"] }), _jsxs("span", { className: styles.progressPercentage, children: [globalProgress, "%"] })] }), _jsx(ProgressBar, { value: globalProgress / 100, thickness: "large", className: styles.globalProgressBar })] }), _jsx("div", { className: styles.contentWrapper, children: _jsx("div", { className: styles.mainContent, children: hasNoSessions ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.sessionsSection, children: [_jsx("h2", { className: styles.sessionHeader, children: "Sessions" }), _jsxs("div", { className: styles.noSessionsContainer, children: [_jsx("div", { className: styles.noSessionsIcon, children: _jsx(CalendarLtr20Regular, { style: { fontSize: "24px" } }) }), _jsx("h3", { className: styles.noFeedbackTitle, children: "No Sessions Yet" }), _jsx("p", { className: styles.noFeedbackText, children: "When your mentor submits a new progress report, you can see it here." }), _jsx("div", { className: styles.actionsContainer, children: _jsx(CreateSessionModal, { projectId: projectId, onSessionCreated: handleSessionCreated }) })] }), _jsxs("div", { className: styles.pagination, children: [_jsx("div", { className: styles.paginationItem, children: "<" }), _jsx("div", { className: `${styles.paginationItem} ${styles.paginationItemActive}`, children: "1" }), _jsx("div", { className: styles.paginationItem, children: ">" })] })] }), _jsx("div", { className: styles.divider }), _jsxs("div", { className: styles.deliverablesSection, children: [_jsx("div", { className: styles.tabContainer, children: _jsxs(TabList, { defaultSelectedValue: "deliverables", selectedValue: activeTab, onTabSelect: handleTabChange, children: [_jsx(Tab, { value: "deliverables", children: _jsxs("div", { className: styles.statItem, children: [activeTab === "deliverables" ? (_jsx(Folder20Filled, { style: { color: tokens.colorBrandForeground1 } })) : (_jsx(Folder20Regular, {})), _jsxs("span", { children: ["Deliverables (", totalDeliverables, ")"] })] }) }), _jsx(Tab, { value: "feedbacks", children: _jsxs("div", { className: styles.statItem, children: [activeTab === "feedbacks" ? (_jsx(Comment20Filled, { style: { color: tokens.colorBrandForeground1 } })) : (_jsx(Comment20Regular, {})), _jsxs("span", { children: ["Feedbacks (", totalFeedbacks, ")"] })] }) })] }) }), _jsx("div", { className: styles.defaultDeliverablesList, children: activeTab === "deliverables" ? (defaultDeliverables.map((item, index) => (_jsxs("div", { className: styles.deliverableCard, children: [_jsxs("div", { className: styles.deliverableInfo, children: [_jsxs("div", { className: styles.deliverableHeader, children: [_jsx("h3", { className: styles.deliverableName, children: item.title }), _jsx("div", { className: styles.notStartedBadge, children: "Not started" })] }), _jsx("p", { className: styles.deliverableSubtext, children: item.description })] }), _jsxs("div", { className: styles.progressInfo, children: [_jsxs("span", { className: styles.progressPercentageSmall, children: [item.progress, "%"] }), _jsx("span", { className: styles.progressChange, children: item.change })] })] }, index)))) : (_jsxs("div", { className: styles.noFeedback, children: [_jsx("div", { className: styles.noFeedbackIcon, children: _jsx(CommentDismiss24Regular, {}) }), _jsx("h3", { className: styles.noFeedbackTitle, children: "No Feedbacks Yet" }), _jsx("p", { className: styles.noFeedbackText, children: "Once you submit your deliverable, your mentor will review it and leave feedback" })] })) })] })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.sessionsSection, children: [_jsxs("h2", { className: styles.sessionHeader, children: ["Sessions ", _jsxs("span", { className: styles.sessionCount, children: ["(", sessions.length, ")"] })] }), sessions.map((session, index) => (_jsxs("div", { className: styles.sessionItem, onClick: () => handleSessionClick(index), style: {
                                            borderLeft: selectedSession === index ? `3px solid ${tokens.colorBrandBackground}` : "none",
                                        }, children: [_jsx("span", { className: styles.sessionDate, children: session.date }), _jsx(ChevronRightRegular, {})] }, index))), _jsx("div", { className: styles.actionsContainer, children: _jsx(CreateSessionModal, { projectId: projectId, onSessionCreated: handleSessionCreated }) }), _jsxs("div", { className: styles.pagination, children: [_jsx("div", { className: styles.paginationItem, children: "<" }), _jsx("div", { className: `${styles.paginationItem} ${styles.paginationItemActive}`, children: "1" }), _jsx("div", { className: styles.paginationItem, children: ">" })] })] }), _jsx("div", { className: styles.divider }), _jsxs("div", { className: styles.deliverablesSection, children: [_jsx("div", { className: styles.tabContainer, children: _jsxs(TabList, { defaultSelectedValue: "deliverables", selectedValue: activeTab, onTabSelect: handleTabChange, children: [_jsx(Tab, { value: "deliverables", children: _jsxs("div", { className: styles.statItem, children: [activeTab === "deliverables" ? (_jsx(Folder20Filled, { style: { color: tokens.colorBrandForeground1 } })) : (_jsx(Folder20Regular, {})), _jsxs("span", { children: ["Deliverables (", totalDeliverables, ")"] })] }) }), _jsx(Tab, { value: "feedbacks", children: _jsxs("div", { className: styles.statItem, children: [activeTab === "feedbacks" ? (_jsx(Comment20Filled, { style: { color: tokens.colorBrandForeground1 } })) : (_jsx(Comment20Regular, {})), _jsxs("span", { children: ["Feedbacks (", totalFeedbacks, ")"] })] }) })] }) }), activeTab === "deliverables" ? (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.actionsContainer, children: currentSession && (_jsx(AddDeliverableModal, { sessionId: currentSession.id, onDeliverableAdded: handleDeliverableAdded })) }), currentDeliverables.length > 0 ? (currentDeliverables.map((item, index) => (_jsxs("div", { className: styles.deliverableCard, children: [_jsxs("div", { className: styles.deliverableInfo, children: [_jsxs("div", { className: styles.deliverableHeader, children: [_jsx("h3", { className: styles.deliverableName, children: item.title }), _jsx("div", { className: styles.statusBadge, children: item.status })] }), _jsx("p", { className: styles.deliverableSubtext, children: item.description })] }), _jsxs("div", { className: styles.progressInfo, children: [_jsxs("span", { className: styles.progressPercentageSmall, children: [item.progress, "%"] }), _jsx("span", { className: styles.progressChange, children: item.change })] })] }, index)))) : (_jsxs("div", { className: styles.noFeedback, children: [_jsx("div", { className: styles.noFeedbackIcon, children: _jsx(Folder20Filled, {}) }), _jsx("h3", { className: styles.noFeedbackTitle, children: "No Deliverables Yet" }), _jsx("p", { className: styles.noFeedbackText, children: "This session doesn't have any deliverables assigned yet." })] }))] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.actionsContainer, children: currentSession && (_jsx(AddFeedbackModal, { sessionId: currentSession.id, onFeedbackAdded: handleFeedbackAdded })) }), currentFeedbacks.length > 0 ? (currentFeedbacks.map((feedback, index) => (_jsxs("div", { className: styles.feedbackCard, children: [_jsx("div", { className: styles.feedbackAvatar, children: _jsx(DocumentRegular, {}) }), _jsxs("div", { children: [_jsx("h4", { className: styles.deliverableName, children: feedback.author }), _jsx("p", { className: styles.feedbackText, children: feedback.text })] })] }, index)))) : (_jsxs("div", { className: styles.noFeedback, children: [_jsx("div", { className: styles.noFeedbackIcon, children: _jsx(CommentDismiss24Regular, {}) }), _jsx("h3", { className: styles.noFeedbackTitle, children: "No Feedbacks Yet" }), _jsx("p", { className: styles.noFeedbackText, children: "Once you submit your deliverable, your mentor will review it and leave feedback" })] }))] }))] })] })) }) })] }));
};
export default Progress;
