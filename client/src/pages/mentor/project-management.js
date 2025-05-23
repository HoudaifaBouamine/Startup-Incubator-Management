"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, tokens, Input, Button, Dropdown, Option, Avatar, Spinner } from "@fluentui/react-components";
import { Search24Regular, MoreHorizontalRegular, CircleRegular } from "@fluentui/react-icons";
import { useAuth } from "../../../hooks/use-auth";
const useStyles = makeStyles({
    container: {
        padding: "24px",
        backgroundColor: tokens.colorNeutralBackground2,
        minHeight: "calc(100vh - 60px)",
    },
    header: {
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: "24px",
    },
    searchFilterRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        gap: "16px",
    },
    searchContainer: {
        position: "relative",
        flex: 1,
    },
    searchIcon: {
        position: "absolute",
        left: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        color: tokens.colorNeutralForeground3,
    },
    searchInput: {
        width: "100%",
        paddingLeft: "40px",
    },
    filterContainer: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    filterLabel: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
    },
    projectsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "16px",
    },
    projectCard: {
        backgroundColor: tokens.colorNeutralBackground1,
        borderRadius: "8px",
        padding: "16px",
        boxShadow: tokens.shadow4,
    },
    projectHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "12px",
    },
    progressBadge: {
        backgroundColor: tokens.colorBrandBackground2,
        color: tokens.colorBrandForeground1,
        padding: "4px 8px",
        borderRadius: "16px",
        fontSize: tokens.fontSizeBase200,
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
    projectTitle: {
        fontSize: tokens.fontSizeBase500,
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: "8px",
    },
    projectDescription: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground2,
        marginBottom: "16px",
    },
    metadataRow: {
        display: "flex",
        justifyContent: "space-between",
        borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
        paddingTop: "12px",
    },
    metadataSection: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    metadataLabel: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
    },
    avatarGroup: {
        display: "flex",
        marginTop: "4px",
    },
    avatar: {
        marginLeft: "-8px",
        border: `2px solid ${tokens.colorNeutralBackground1}`,
        "&:first-child": {
            marginLeft: 0,
        },
    },
    moreAvatars: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: tokens.colorNeutralBackground3,
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "-8px",
        border: `2px solid ${tokens.colorNeutralBackground1}`,
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        marginTop: "32px",
    },
    paginationItem: {
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: tokens.fontSizeBase300,
        "&:hover": {
            backgroundColor: tokens.colorNeutralBackground3,
        },
    },
    paginationItemActive: {
        backgroundColor: tokens.colorNeutralBackground3,
        fontWeight: tokens.fontWeightSemibold,
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
const ProjectsManagement = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        // Check if user is a mentor
        if (!isLoading && user && user.role !== "MENTOR") {
            // Redirect non-mentors
            navigate("/dashboard");
        }
    }, [user, isLoading, navigate]);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // In a real app, you would fetch from your API
                // For now, we'll use mock data
                setTimeout(() => {
                    const mockProjects = [
                        {
                            id: "1",
                            name: "Project Name",
                            description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
                            progress: 10,
                            teamMembers: [
                                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
                                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
                                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
                            ],
                            mentors: [{ id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=32&width=32" }],
                        },
                        {
                            id: "2",
                            name: "Project Name",
                            description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
                            progress: 10,
                            teamMembers: [
                                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
                                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
                                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
                            ],
                            mentors: [{ id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=32&width=32" }],
                        },
                        {
                            id: "3",
                            name: "Project Name",
                            description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
                            progress: 10,
                            teamMembers: [
                                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
                                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
                                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
                            ],
                            mentors: [{ id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=32&width=32" }],
                        },
                        {
                            id: "4",
                            name: "Project Name",
                            description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
                            progress: 10,
                            teamMembers: [
                                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
                                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
                                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
                            ],
                            mentors: [{ id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=32&width=32" }],
                        },
                        {
                            id: "5",
                            name: "Project Name",
                            description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
                            progress: 10,
                            teamMembers: [
                                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
                                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
                                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
                            ],
                            mentors: [{ id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=32&width=32" }],
                        },
                    ];
                    setProjects(mockProjects);
                    setLoading(false);
                }, 1000);
            }
            catch (error) {
                console.error("Error fetching projects:", error);
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);
    const handleProjectClick = (projectId) => {
        navigate(`/mentor/projects/${projectId}`);
    };
    // If user is not a mentor, show unauthorized message
    if (!isLoading && user && user.role !== "MENTOR") {
        return (_jsxs("div", { className: styles.unauthorizedContainer, children: [_jsx("h2", { className: styles.unauthorizedText, children: "You don't have permission to access this page." }), _jsx(Button, { appearance: "primary", onClick: () => navigate("/dashboard"), children: "Go to Dashboard" })] }));
    }
    if (loading || isLoading) {
        return (_jsx("div", { className: styles.loadingContainer, children: _jsx(Spinner, { size: "large", label: "Loading projects..." }) }));
    }
    return (_jsxs("div", { className: styles.container, children: [_jsx("h1", { className: styles.header, children: "Projects Management" }), _jsxs("div", { children: [_jsxs("h2", { children: ["Active Projects (", projects.length, ")"] }), _jsxs("div", { className: styles.searchFilterRow, children: [_jsxs("div", { className: styles.searchContainer, children: [_jsx(Search24Regular, { className: styles.searchIcon }), _jsx(Input, { className: styles.searchInput, placeholder: "Search by name, email, or project...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("div", { className: styles.filterContainer, children: [_jsx("span", { className: styles.filterLabel, children: "Filter by" }), _jsxs(Dropdown, { value: statusFilter, onOptionSelect: (_, data) => setStatusFilter(data.optionValue || "all"), children: [_jsx(Option, { value: "all", children: "Status" }), _jsx(Option, { value: "in-progress", children: "In Progress" }), _jsx(Option, { value: "completed", children: "Completed" }), _jsx(Option, { value: "not-started", children: "Not Started" })] })] })] }), _jsx("div", { className: styles.projectsGrid, children: projects.map((project) => (_jsxs("div", { className: styles.projectCard, onClick: () => handleProjectClick(project.id), style: { cursor: "pointer" }, children: [_jsxs("div", { className: styles.projectHeader, children: [_jsxs("div", { className: styles.progressBadge, children: [_jsx(CircleRegular, {}), "In Progress ", project.progress, "%"] }), _jsx(Button, { icon: _jsx(MoreHorizontalRegular, {}), appearance: "subtle", onClick: (e) => {
                                                e.stopPropagation();
                                            } })] }), _jsx("h3", { className: styles.projectTitle, children: project.name }), _jsx("p", { className: styles.projectDescription, children: project.description }), _jsxs("div", { className: styles.metadataRow, children: [_jsxs("div", { className: styles.metadataSection, children: [_jsx("span", { className: styles.metadataLabel, children: "Team ID" }), _jsxs("div", { className: styles.avatarGroup, children: [project.teamMembers.slice(0, 3).map((member, index) => (_jsx(Avatar, { name: member.name, image: { src: member.avatar }, size: 24, className: styles.avatar }, member.id))), project.teamMembers.length > 3 && (_jsxs("div", { className: styles.moreAvatars, children: ["+", project.teamMembers.length - 3] }))] })] }), _jsxs("div", { className: styles.metadataSection, children: [_jsx("span", { className: styles.metadataLabel, children: "Mentors" }), _jsx("div", { className: styles.avatarGroup, children: project.mentors.map((mentor) => (_jsx(Avatar, { name: mentor.name, image: { src: mentor.avatar }, size: 24, className: styles.avatar }, mentor.id))) })] })] })] }, project.id))) }), _jsxs("div", { className: styles.pagination, children: [_jsx("div", { className: styles.paginationItem, children: "<" }), _jsx("div", { className: `${styles.paginationItem} ${styles.paginationItemActive}`, children: "1" }), _jsx("div", { className: styles.paginationItem, children: "2" }), _jsx("div", { className: styles.paginationItem, children: "3" }), _jsx("div", { className: styles.paginationItem, children: ">" })] })] })] }));
};
export default ProjectsManagement;
