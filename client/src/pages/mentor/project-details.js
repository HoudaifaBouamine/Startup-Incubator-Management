"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { makeStyles, tokens, Button, Spinner, TabList, Tab, ProgressBar } from "@fluentui/react-components";
import { ChevronRight20Regular, DocumentRegular, Folder20Filled, Folder20Regular, Comment20Filled, Comment20Regular, CalendarLtr20Regular, AddRegular, } from "@fluentui/react-icons";
import { useAuth } from "../../../hooks/use-auth";
const useStyles = makeStyles({
    container: {
        padding: "24px",
        backgroundColor: tokens.colorNeutralBackground2,
        minHeight: "calc(100vh - 60px)",
    },
    breadcrumb: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "24px",
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground3,
    },
    breadcrumbLink: {
        color: tokens.colorNeutralForeground3,
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    breadcrumbSeparator: {
        display: "flex",
        alignItems: "center",
    },
    breadcrumbCurrent: {
        color: tokens.colorNeutralForeground1,
    },
    header: {
        backgroundColor: tokens.colorNeutralBackground1,
        padding: "16px 24px",
        borderRadius: "8px",
        marginBottom: "24px",
        boxShadow: tokens.shadow4,
    },
    headerTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
    },
    projectTitle: {
        fontSize: tokens.fontSizeBase100,
        fontWeight: tokens.fontWeightSemibold,
        margin: 0,
    },
    progressPercentage: {
        fontSize: tokens.fontSizeBase100,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorBrandForeground1,
    },
    progressBar: {
        height: "8px",
    },
    projectInfo: {
        display: "flex",
        gap: "16px",
        marginTop: "16px",
    },
    projectInfoItem: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
    },
    content: {
        display: "flex",
        gap: "24px",
    },
    sessionsPanel: {
        width: "300px",
        backgroundColor: tokens.colorNeutralBackground1,
        borderRadius: "8px",
        padding: "16px",
        boxShadow: tokens.shadow4,
    },
    sessionsPanelHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
    },
    sessionsPanelTitle: {
        fontSize: tokens.fontSizeBase500,
        fontWeight: tokens.fontWeightSemibold,
        margin: 0,
    },
    sessionCount: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground3,
    },
    sessionsList: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    sessionItem: {
        padding: "12px",
        borderRadius: "4px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "&:hover": {
            backgroundColor: tokens.colorNeutralBackground3,
        },
    },
    sessionItemActive: {
        backgroundColor: tokens.colorNeutralBackground3,
        borderLeft: `3px solid ${tokens.colorBrandBackground}`,
        paddingLeft: "9px",
    },
    sessionDate: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorBrandForeground1,
        fontWeight: tokens.fontWeightSemibold,
    },
    noSessions: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        textAlign: "center",
        gap: "16px",
    },
    noSessionsIcon: {
        fontSize: "24px",
        color: tokens.colorNeutralForeground3,
        backgroundColor: tokens.colorNeutralBackground3,
        width: "48px",
        height: "48px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    noSessionsTitle: {
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
    },
    noSessionsText: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
    },
    deliverablePanel: {
        flex: 1,
        backgroundColor: tokens.colorNeutralBackground1,
        borderRadius: "8px",
        padding: "16px",
        boxShadow: tokens.shadow4,
    },
    tabContainer: {
        marginBottom: "16px",
        borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    },
    tabContent: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    deliverablesList: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    deliverableItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: tokens.colorNeutralBackground2,
    },
    deliverableInfo: {
        flex: 1,
    },
    deliverableHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
    },
    deliverableTitle: {
        fontSize: tokens.fontSizeBase500,
        fontWeight: tokens.fontWeightSemibold,
        margin: 0,
    },
    deliverableDescription: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
        margin: 0,
    },
    statusBadge: {
        fontSize: tokens.fontSizeBase200,
        padding: "4px 8px",
        borderRadius: "16px",
        backgroundColor: "transparent",
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        color: tokens.colorNeutralForeground3,
    },
    statusBadgeNotStarted: {
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        color: tokens.colorNeutralForeground3,
    },
    statusBadgeInProgress: {
        border: `1px solid ${tokens.colorBrandStroke1}`,
        color: tokens.colorBrandForeground1,
    },
    statusBadgeDone: {
        border: `1px solid ${tokens.colorStatusSuccessBorder1}`,
        color: tokens.colorStatusSuccessForeground1,
    },
    progressInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "4px",
    },
    progressPercentageSmall: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorBrandForeground1,
    },
    progressChange: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorStatusSuccessForeground1,
    },
    progressControls: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    incrementButton: {
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        backgroundColor: tokens.colorNeutralBackground1,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: tokens.colorNeutralBackground3,
        },
    },
    actionButton: {
        marginTop: "16px",
    },
    feedbackItem: {
        display: "flex",
        gap: "12px",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: tokens.colorNeutralBackground2,
    },
    feedbackAvatar: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        backgroundColor: tokens.colorNeutralBackground4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    feedbackContent: {
        flex: 1,
    },
    feedbackAuthor: {
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold,
        margin: 0,
        marginBottom: "4px",
    },
    feedbackText: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
        margin: 0,
    },
    noFeedback: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        textAlign: "center",
        gap: "16px",
    },
    noFeedbackIcon: {
        fontSize: "24px",
        color: tokens.colorNeutralForeground3,
    },
    noFeedbackTitle: {
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
    },
    noFeedbackText: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
    },
    unauthorizedContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 120px)",
        textAlign: "center",
        gap: "16px",
    },
    unauthorizedText: {
        fontSize: tokens.fontSizeBase500,
        color: tokens.colorNeutralForeground1,
    },
});
const ProjectDetail = () => {
    const styles = useStyles();
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("deliverables");
    const [selectedSessionIndex, setSelectedSessionIndex] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [tempDeliverables, setTempDeliverables] = useState([]);
    useEffect(() => {
        if (!isLoading && user && user.role !== "MENTOR") {
            navigate("/dashboard");
        }
    }, [user, isLoading, navigate]);
    useEffect(() => {
        const fetchProject = async () => {
            try {
                setTimeout(() => {
                    const mockProject = {
                        id: projectId || "1",
                        name: "Project Name",
                        teamId: "Team123",
                        progress: 10,
                        sessions: [
                            {
                                id: "1",
                                date: "March 3, 2025",
                                deliverables: [
                                    {
                                        id: "1",
                                        title: "Prototype",
                                        description: "Is the MVP of your product?",
                                        status: "not started",
                                        progress: 0,
                                        change: "+0%",
                                    },
                                    {
                                        id: "2",
                                        title: "Demo Video",
                                        description: "A demo video to showcase the features and working of your product",
                                        status: "not started",
                                        progress: 0,
                                        change: "+0%",
                                    },
                                    {
                                        id: "3",
                                        title: "Pitch Deck",
                                        description: "A slides presentation to pitch your project at Demo Day.",
                                        status: "not started",
                                        progress: 0,
                                        change: "+0%",
                                    },
                                    {
                                        id: "4",
                                        title: "Deliverable name",
                                        description: "Upload your file before the deadline to submit for review",
                                        status: "not started",
                                        progress: 0,
                                        change: "+0%",
                                    },
                                ],
                                feedbacks: [],
                            },
                        ],
                    };
                    setProject(mockProject);
                    setLoading(false);
                }, 1000);
            }
            catch (error) {
                console.error("Error fetching project:", error);
                setLoading(false);
            }
        };
        if (projectId) {
            fetchProject();
        }
    }, [projectId]);
    const handleTabChange = (_, data) => {
        setActiveTab(data.value);
    };
    const handleSessionClick = (index) => {
        setSelectedSessionIndex(index);
    };
    const handleEditToggle = () => {
        if (editMode) {
            if (project && project.sessions[selectedSessionIndex]) {
                const updatedSessions = [...project.sessions];
                updatedSessions[selectedSessionIndex] = {
                    ...updatedSessions[selectedSessionIndex],
                    deliverables: tempDeliverables,
                };
                let totalProgress = 0;
                let totalDeliverables = 0;
                updatedSessions.forEach((session) => {
                    session.deliverables.forEach((deliverable) => {
                        totalProgress += deliverable.progress;
                        totalDeliverables++;
                    });
                });
                const newProgress = totalDeliverables > 0 ? Math.round(totalProgress / totalDeliverables) : 0;
                setProject({
                    ...project,
                    progress: newProgress,
                    sessions: updatedSessions,
                });
            }
        }
        else {
            if (project && project.sessions[selectedSessionIndex]) {
                setTempDeliverables([...project.sessions[selectedSessionIndex].deliverables]);
            }
        }
        setEditMode(!editMode);
    };
    const handleIncrementProgress = (deliverableIndex) => {
        if (!editMode)
            return;
        const updatedDeliverables = [...tempDeliverables];
        const currentProgress = updatedDeliverables[deliverableIndex].progress;
        const newProgress = Math.min(currentProgress + 10, 100);
        updatedDeliverables[deliverableIndex] = {
            ...updatedDeliverables[deliverableIndex],
            progress: newProgress,
            change: `+10%`,
            status: newProgress === 0 ? "not started" : newProgress === 100 ? "done" : "in progress",
        };
        setTempDeliverables(updatedDeliverables);
    };
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "not started":
                return styles.statusBadgeNotStarted;
            case "in progress":
                return styles.statusBadgeInProgress;
            case "done":
                return styles.statusBadgeDone;
            default:
                return "";
        }
    };
    if (!isLoading && user && user.role !== "MENTOR") {
        return (_jsxs("div", { className: styles.unauthorizedContainer, children: [_jsx("h2", { className: styles.unauthorizedText, children: "You don't have permission to access this page." }), _jsx(Button, { appearance: "primary", onClick: () => navigate("/dashboard"), children: "Go to Dashboard" })] }));
    }
    if (loading || isLoading || !project) {
        return (_jsx("div", { className: styles.loadingContainer, children: _jsx(Spinner, { size: "large", label: "Loading project details..." }) }));
    }
    const currentSession = project.sessions[selectedSessionIndex];
    const deliverablesToDisplay = editMode ? tempDeliverables : currentSession.deliverables;
    const totalDeliverables = project.sessions.reduce((total, session) => total + session.deliverables.length, 0);
    const totalFeedbacks = project.sessions.reduce((total, session) => total + session.feedbacks.length, 0);
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.breadcrumb, children: [_jsx(Link, { to: "/mentor/projects-management", className: styles.breadcrumbLink, children: "Projects Management" }), _jsx("span", { className: styles.breadcrumbSeparator, children: _jsx(ChevronRight20Regular, {}) }), _jsx("span", { className: styles.breadcrumbCurrent, children: project.name })] }), _jsxs("div", { className: styles.header, children: [_jsxs("div", { className: styles.headerTitle, children: [_jsx("h1", { className: styles.projectTitle, children: "Project Progress" }), _jsxs("span", { className: styles.progressPercentage, children: [project.progress, "%"] })] }), _jsx(ProgressBar, { value: project.progress / 100, thickness: "large", color: "brand", className: styles.progressBar }), _jsxs("div", { className: styles.projectInfo, children: [_jsxs("div", { className: styles.projectInfoItem, children: [_jsx("span", { children: "Project Name:" }), _jsx("strong", { children: project.name })] }), _jsxs("div", { className: styles.projectInfoItem, children: [_jsx("span", { children: "Team ID:" }), _jsx("strong", { children: project.teamId })] })] })] }), _jsxs("div", { className: styles.content, children: [_jsxs("div", { className: styles.sessionsPanel, children: [_jsx("div", { className: styles.sessionsPanelHeader, children: _jsxs("h2", { className: styles.sessionsPanelTitle, children: ["Sessions ", project.sessions.length > 0 && `(${project.sessions.length})`] }) }), project.sessions.length > 0 ? (_jsx("div", { className: styles.sessionsList, children: project.sessions.map((session, index) => (_jsxs("div", { className: `${styles.sessionItem} ${index === selectedSessionIndex ? styles.sessionItemActive : ""}`, onClick: () => handleSessionClick(index), children: [_jsx("span", { className: styles.sessionDate, children: session.date }), _jsx(ChevronRight20Regular, {})] }, session.id))) })) : (_jsxs("div", { className: styles.noSessions, children: [_jsx("div", { className: styles.noSessionsIcon, children: _jsx(CalendarLtr20Regular, {}) }), _jsx("h3", { className: styles.noSessionsTitle, children: "No Sessions Yet" }), _jsx("p", { className: styles.noSessionsText, children: "Create a new session to track project progress" }), _jsx(Button, { icon: _jsx(AddRegular, {}), children: "Create Session" })] }))] }), _jsxs("div", { className: styles.deliverablePanel, children: [_jsx("div", { className: styles.tabContainer, children: _jsxs(TabList, { defaultSelectedValue: "deliverables", selectedValue: activeTab, onTabSelect: handleTabChange, children: [_jsx(Tab, { value: "deliverables", children: _jsxs("div", { className: styles.tabContent, children: [activeTab === "deliverables" ? (_jsx(Folder20Filled, { style: { color: tokens.colorBrandForeground1 } })) : (_jsx(Folder20Regular, {})), _jsxs("span", { children: ["Deliverables (", totalDeliverables, ")"] })] }) }), _jsx(Tab, { value: "feedbacks", children: _jsxs("div", { className: styles.tabContent, children: [activeTab === "feedbacks" ? (_jsx(Comment20Filled, { style: { color: tokens.colorBrandForeground1 } })) : (_jsx(Comment20Regular, {})), _jsxs("span", { children: ["Feedbacks (", totalFeedbacks, ")"] })] }) })] }) }), activeTab === "deliverables" ? (_jsxs(_Fragment, { children: [_jsx(Button, { appearance: editMode ? "primary" : "secondary", onClick: handleEditToggle, className: styles.actionButton, children: editMode ? "Save Changes" : "Update Progress" }), _jsx("div", { className: styles.deliverablesList, children: deliverablesToDisplay.map((deliverable, index) => (_jsxs("div", { className: styles.deliverableItem, children: [_jsxs("div", { className: styles.deliverableInfo, children: [_jsxs("div", { className: styles.deliverableHeader, children: [_jsx("h3", { className: styles.deliverableTitle, children: deliverable.title }), _jsx("span", { className: `${styles.statusBadge} ${getStatusBadgeClass(deliverable.status)}`, children: deliverable.status })] }), _jsx("p", { className: styles.deliverableDescription, children: deliverable.description })] }), _jsxs("div", { className: styles.progressInfo, children: [_jsxs("span", { className: styles.progressPercentageSmall, children: [deliverable.progress, "%"] }), _jsx("span", { className: styles.progressChange, children: deliverable.change }), editMode && (_jsx("div", { className: styles.progressControls, children: _jsx("div", { className: styles.incrementButton, onClick: () => handleIncrementProgress(index), children: _jsx(AddRegular, {}) }) }))] })] }, deliverable.id))) })] })) : (_jsxs(_Fragment, { children: [_jsx(Button, { appearance: "secondary", icon: _jsx(AddRegular, {}), className: styles.actionButton, children: "Add Feedback" }), currentSession.feedbacks && currentSession.feedbacks.length > 0 ? (_jsx("div", { className: styles.deliverablesList, children: currentSession.feedbacks.map((feedback) => (_jsxs("div", { className: styles.feedbackItem, children: [_jsx("div", { className: styles.feedbackAvatar, children: _jsx(DocumentRegular, {}) }), _jsxs("div", { className: styles.feedbackContent, children: [_jsx("h3", { className: styles.feedbackAuthor, children: feedback.author }), _jsx("p", { className: styles.feedbackText, children: feedback.text })] })] }, feedback.id))) })) : (_jsxs("div", { className: styles.noFeedback, children: [_jsx("div", { className: styles.noFeedbackIcon, children: _jsx(Comment20Regular, {}) }), _jsx("h3", { className: styles.noFeedbackTitle, children: "No Feedbacks Yet" }), _jsx("p", { className: styles.noFeedbackText, children: "Add feedback to help the team improve their project" })] }))] }))] })] })] }));
};
export default ProjectDetail;
