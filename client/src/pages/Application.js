"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { makeStyles, tokens, Button, Text, Textarea, ProgressBar, Select, Label, Tag, TagGroup, Avatar, useId, Badge, } from "@fluentui/react-components";
import { ArrowLeft32Filled, TargetArrow24Filled, Rocket24Regular, ClockRegular, Lightbulb24Regular, MegaphoneRegular, DesignIdeas24Filled, ErrorCircleRegular, DismissRegular, } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import Input from "./components/Input";
const useStyles = makeStyles({
    background: {
        backgroundColor: tokens.colorNeutralBackground2,
        minHeight: "100vh",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
    },
    container: {
        backgroundColor: tokens.colorNeutralBackground1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        padding: "2rem",
        paddingTop: "2.5rem",
        borderRadius: "1rem",
        width: "450px",
        minHeight: "60vh",
        maxHeight: "90vh",
        height: "auto",
        boxShadow: tokens.shadow8,
        boxSizing: "border-box",
        overflow: "auto",
        position: "relative",
        "@media (max-width: 768px)": {
            width: "80%",
            padding: "1.5rem",
            paddingTop: "2.5rem",
        },
        "@media (max-width: 480px)": {
            width: "100%",
            padding: "1rem",
            paddingTop: "2.5rem",
            borderRadius: "0.5rem",
            maxHeight: "100vh",
        },
    },
    header: {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        textAlign: "center",
        width: "100%",
    },
    progressSection: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        gap: "1rem",
        "@media (max-width: 480px)": {
            flexDirection: "column",
            gap: "0.5rem",
        },
    },
    title: {
        fontSize: "2.5rem",
        fontFamily: tokens.fontFamilyBase,
        fontWeight: tokens.fontWeightBold,
        color: tokens.colorNeutralForeground1,
        lineHeight: "1.1",
        "@media (max-width: 768px)": {
            fontSize: "2rem",
        },
        "@media (max-width: 480px)": {
            fontSize: "1.75rem",
        },
    },
    inputWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    },
    labelWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
    },
    button: {
        width: "100%",
        padding: "12px",
        backgroundColor: tokens.colorBrandBackground,
        borderRadius: tokens.borderRadiusMedium,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForegroundOnBrand,
        cursor: "pointer",
        transition: "background-color 0.3s",
        ":hover": {
            backgroundColor: tokens.colorBrandBackgroundHover,
        },
        "@media (max-width: 480px)": {
            padding: "10px",
            fontSize: tokens.fontSizeBase300,
        },
    },
    secondaryButton: {
        width: "100%",
        padding: "12px",
        backgroundColor: tokens.colorNeutralBackground1,
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        borderRadius: tokens.borderRadiusMedium,
        fontWeight: tokens.fontWeightRegular,
        color: tokens.colorNeutralForeground2,
        cursor: "pointer",
        transition: "background-color 0.3s",
        ":hover": {
            backgroundColor: tokens.colorNeutralBackground3,
        },
        "@media (max-width: 480px)": {
            padding: "10px",
            fontSize: tokens.fontSizeBase300,
        },
    },
    text: {
        color: tokens.colorNeutralForeground4,
        fontWeight: tokens.fontWeightSemibold,
        fontSize: tokens.fontSizeBase400,
        "@media (max-width: 480px)": {
            fontSize: tokens.fontSizeBase300,
        },
    },
    textarea: {
        width: "100%",
        height: "130px",
        border: "none",
        background: "transparent",
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground1,
        padding: "0.5rem",
        outline: "none",
        borderRadius: tokens.borderRadiusMedium,
        resize: "none",
        "::placeholder": {
            color: tokens.colorNeutralForeground4,
        },
        "@media (max-width: 480px)": {
            height: "100px",
            fontSize: tokens.fontSizeBase200,
        },
    },
    Label: {
        fontWeight: tokens.fontWeightSemibold,
        flexShrink: 0,
        "@media (max-width: 480px)": {
            fontSize: tokens.fontSizeBase300,
        },
    },
    Select: {
        width: "100%",
        "@media (max-width: 480px)": {
            fontSize: tokens.fontSizeBase200,
        },
    },
    errorText: {
        color: tokens.colorPaletteRedForeground1,
        fontSize: tokens.fontSizeBase200,
        padding: "0.25rem 0.5rem",
        borderRadius: tokens.borderRadiusSmall,
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow4,
        whiteSpace: "nowrap",
    },
    radioGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        "@media (max-width: 480px)": {
            gap: "0.25rem",
        },
    },
    stageButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "0.75rem",
        padding: "0.75rem",
        paddingLeft: "1rem",
        backgroundColor: tokens.colorNeutralBackground3,
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        borderRadius: tokens.borderRadiusMedium,
        fontWeight: tokens.fontWeightRegular,
        color: tokens.colorNeutralForeground1,
        cursor: "pointer",
        transition: "border-color 0.3s, background-color 0.3s",
        width: "100%",
        textAlign: "left",
        boxSizing: "border-box",
        ":hover": {
            border: `1.5px solid ${tokens.colorBrandStroke1}`,
        },
        "@media (max-width: 480px)": {
            padding: "0.5rem",
            paddingLeft: "0.75rem",
        },
        ":focus": {
            border: `2px solid ${tokens.colorBrandStroke1} `,
            backgroundColor: tokens.colorNeutralBackground1,
        },
    },
    selectedStageButton: {
        border: `2px solid ${tokens.colorBrandStroke1}`,
        backgroundColor: tokens.colorBrandBackground2,
    },
    stageTextWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
    },
    stageTitle: {
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
    },
    stageSubtitle: {
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground3,
    },
    stageIcon: {
        fontSize: "24px",
        color: tokens.colorNeutralForeground2,
    },
    successMessage: {
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightRegular,
        textAlign: "center",
        lineHeight: "1.5",
        maxWidth: "80%",
        "@media (max-width: 480px)": {
            fontSize: tokens.fontSizeBase200,
        },
    },
    applicationInfo: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "1rem",
        backgroundColor: tokens.colorNeutralBackground3,
        borderRadius: tokens.borderRadiusMedium,
        marginTop: "0.5rem",
        "@media (max-width: 480px)": {
            flexDirection: "column",
            gap: "0.5rem",
            padding: "0.75rem",
        },
        "@media (min-width: 481px) and (max-width: 768px)": {
            padding: "1rem",
            gap: "1rem",
        },
    },
    applicationInfoText: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        "@media (max-width: 480px)": {
            flexDirection: "column",
            alignItems: "flex-start",
        },
        "@media (min-width: 481px) and (max-width: 768px)": {
            gap: "0.75rem",
        },
    },
    badge: {
        backgroundColor: tokens.colorNeutralBackground1,
        color: tokens.colorNeutralForeground4,
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        padding: "10px",
        "@media (max-width: 480px)": {
            padding: "6px",
            fontSize: tokens.fontSizeBase200,
        },
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        width: "100%",
        "@media (max-width: 480px)": {
            gap: "0.75rem",
        },
        "@media (min-width: 481px) and (max-width: 768px)": {
            gap: "1.25rem",
        },
    },
    teamMembersGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(3, auto)",
        gap: "0.5rem",
        width: "100%",
        marginTop: "0.5rem",
        "@media (max-width: 480px)": {
            gridTemplateColumns: "1fr",
            gridTemplateRows: "auto",
        },
        "@media (min-width: 481px) and (max-width: 768px)": {
            gap: "0.75rem",
        },
    },
    teamMemberTag: {
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        "@media (max-width: 480px)": {
            fontSize: tokens.fontSizeBase200,
        },
    },
    errorContainer: {
        backgroundColor: tokens.colorStatusDangerBackground1,
        color: tokens.colorStatusDangerForeground1,
        padding: "0.25rem 0.5rem",
        borderRadius: tokens.borderRadiusMedium,
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        position: "absolute",
        top: "0.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        boxShadow: tokens.shadow4,
        maxWidth: "90%",
    },
    errorIcon: {
        color: tokens.colorStatusDangerForeground1,
        fontSize: "14px",
        flexShrink: 0,
    },
});
const Application = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const industrySelectId = useId("industry-select");
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    const industryOptions = ["Technology", "Healthcare", "Finance", "Education", "Tech"];
    const stageOptions = [
        { value: "IDEA", title: "Idea Stage", subtitle: "I need to develop my startup", icon: _jsx(Lightbulb24Regular, {}) },
        { value: "PROTOTYPE", title: "Prototype", subtitle: "I have a working prototype", icon: _jsx(DesignIdeas24Filled, {}) },
        { value: "MVP", title: "MVP", subtitle: "I am ready to test my product", icon: _jsx(Rocket24Regular, {}) },
        { value: "LAUNCHED", title: "Launched", subtitle: "My startup is live and growing", icon: _jsx(MegaphoneRegular, {}) },
    ];
    const [formData, setFormData] = useState({
        name: "",
        industry: "",
        about: "",
        problem: "",
        solution: "",
        idea: "",
        targetAudience: "",
        competitiveAdvantage: "",
        motivation: "",
        stage: "",
        memberEmails: [],
        encadrantEmails: [],
    });
    const [tempEmail, setTempEmail] = useState({
        teamMember: "",
        mentor: "",
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [createdProject, setCreatedProject] = useState(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check for authentication token
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setApiError("You must be logged in to create a project");
        }
    }, []);
    const validateStep = () => {
        const newErrors = {};
        switch (step) {
            case 1:
                if (!formData.name)
                    newErrors.name = "Startup name is required";
                if (!formData.industry)
                    newErrors.industry = "Industry is required";
                if (!formData.about)
                    newErrors.about = "About is required";
                break;
            case 2:
                if (!formData.problem)
                    newErrors.problem = "Problem statement is required";
                if (!formData.solution)
                    newErrors.solution = "Solution description is required";
                if (!formData.idea)
                    newErrors.idea = "Idea description is required";
                break;
            case 3:
                if (!formData.targetAudience)
                    newErrors.targetAudience = "Target audience is required";
                if (!formData.competitiveAdvantage)
                    newErrors.competitiveAdvantage = "Competitive advantage is required";
                break;
            case 4:
                if (formData.memberEmails.length === 0)
                    newErrors.memberEmails = "At least 1 team member required";
                break;
            case 5:
                if (!formData.stage)
                    newErrors.stage = "Startup stage is required";
                break;
            case 6:
                if (!formData.motivation)
                    newErrors.motivation = "Motivation is required";
                break;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleInputChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        setErrors({ ...errors, [field]: null });
    };
    const handleSelectChange = (field) => (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: null });
    };
    const handleStageChange = (value) => {
        setFormData({ ...formData, stage: value });
        setErrors({ ...errors, stage: null });
    };
    const handleEmailInput = (field) => (e) => {
        setTempEmail({ ...tempEmail, [field]: e.target.value });
        setErrors({ ...errors, [field]: null });
    };
    const addTeamMember = () => {
        if (!emailRegex.test(tempEmail.teamMember)) {
            setErrors({ ...errors, teamMember: "Invalid email format" });
            return;
        }
        if (tempEmail.teamMember && !formData.memberEmails.includes(tempEmail.teamMember)) {
            setFormData({ ...formData, memberEmails: [...formData.memberEmails, tempEmail.teamMember] });
            setTempEmail({ ...tempEmail, teamMember: "" });
            setErrors({ ...errors, memberEmails: null, teamMember: null });
        }
    };
    const addMentor = () => {
        if (!emailRegex.test(tempEmail.mentor)) {
            setErrors({ ...errors, mentor: "Invalid email format" });
            return;
        }
        if (tempEmail.mentor && !formData.encadrantEmails.includes(tempEmail.mentor)) {
            setFormData({ ...formData, encadrantEmails: [...formData.encadrantEmails, tempEmail.mentor] });
            setTempEmail({ ...tempEmail, mentor: "" });
            setErrors({ ...errors, mentor: null });
        }
    };
    const handleTeamMemberKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTeamMember();
        }
    };
    const handleMentorKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addMentor();
        }
    };
    const removeTeamMember = (email) => {
        setFormData({ ...formData, memberEmails: formData.memberEmails.filter((member) => member !== email) });
        if (formData.memberEmails.length <= 1) {
            setErrors({ ...errors, memberEmails: "At least 1 team member required" });
        }
    };
    const removeMentor = (email) => {
        setFormData({ ...formData, encadrantEmails: formData.encadrantEmails.filter((mentor) => mentor !== email) });
    };
    const submitProject = async () => {
        setLoading(true);
        setApiError(null);
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("You must be logged in to create a project");
            }
            const response = await fetch(`${backendUrl}/projects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401) {
                    throw new Error("Authentication failed. Please log in again.");
                }
                else if (response.status === 409) {
                    throw new Error("A project with this name or in this industry already exists.");
                }
                else {
                    throw new Error(errorData.message || "Failed to create project");
                }
            }
            const data = await response.json();
            setCreatedProject(data);
            setStep(7);
        }
        catch (error) {
            if (error instanceof Error) {
                setApiError(error.message);
            }
            else {
                setApiError("An unexpected error occurred");
            }
            // Stay on the current step
        }
        finally {
            setLoading(false);
        }
    };
    const nextStep = () => {
        if (validateStep()) {
            if (step < 6) {
                setStep(step + 1);
            }
            else if (step === 6) {
                submitProject();
            }
        }
    };
    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
        else {
            navigate(-1);
        }
    };
    return (_jsx("div", { className: classes.background, children: _jsxs("div", { className: classes.container, children: [apiError && (_jsxs("div", { className: classes.errorContainer, children: [_jsx(ErrorCircleRegular, { className: classes.errorIcon }), _jsx(Text, { style: { fontSize: tokens.fontSizeBase200, margin: 0, fontWeight: tokens.fontWeightSemibold }, children: apiError })] })), step !== 7 && (_jsxs("div", { className: classes.progressSection, children: [_jsx(ArrowLeft32Filled, { onClick: prevStep, style: { cursor: "pointer" } }), _jsx(ProgressBar, { thickness: "large", value: step / 6 }), _jsxs("span", { children: [step, "/6"] })] })), step === 1 && (_jsxs("div", { style: { alignSelf: "flex-start", width: "100%" }, children: [_jsxs("div", { className: classes.header, children: [_jsx(Text, { as: "h1", className: classes.title, children: "Tell us about your startup" }), _jsx(Text, { className: classes.text, children: "Provide some basic details to get started." })] }), _jsxs("div", { className: classes.inputWrapper, children: [_jsx(Input, { label: "Startup name", placeholder: "Starthub", value: formData.name, onChange: handleInputChange("name"), errorMessage: errors.name ?? undefined }), _jsxs("div", { className: classes.inputWrapper, children: [_jsxs("div", { className: classes.labelWrapper, children: [_jsx(Label, { className: classes.Label, htmlFor: industrySelectId, children: "Industry" }), errors.industry && _jsx(Text, { className: classes.errorText, children: errors.industry })] }), _jsxs(Select, { id: industrySelectId, className: classes.Select, value: formData.industry, onChange: handleSelectChange("industry"), children: [_jsx("option", { value: "", disabled: true, hidden: true, children: "Select industry" }), industryOptions.map((option) => (_jsx("option", { value: option, children: option }, option)))] })] }), _jsxs("div", { className: classes.inputWrapper, children: [_jsxs("div", { className: classes.labelWrapper, children: [_jsx(Label, { className: classes.Label, children: "About Startup" }), errors.about && _jsx(Text, { className: classes.errorText, children: errors.about })] }), _jsx(Textarea, { placeholder: "Briefly describe your startup's vision and purpose.", className: classes.textarea, value: formData.about, onChange: handleInputChange("about") })] })] })] })), step === 2 && (_jsxs("div", { style: { alignSelf: "flex-start", width: "100%" }, children: [_jsxs("div", { className: classes.header, children: [_jsx(Text, { as: "h1", className: classes.title, children: "What problem are you solving?" }), _jsx(Text, { className: classes.text, style: { marginBottom: "0.5rem" }, children: "Explain the challenge your startup addresses." })] }), _jsxs("div", { className: classes.inputWrapper, children: [_jsxs("div", { className: classes.inputWrapper, children: [_jsxs("div", { className: classes.labelWrapper, children: [_jsx(Label, { className: classes.Label, children: "Problem Statement" }), errors.problem && _jsx(Text, { className: classes.errorText, children: errors.problem })] }), _jsx(Textarea, { placeholder: "Describe the key problem your target audience faces.", className: classes.textarea, value: formData.problem, onChange: handleInputChange("problem") })] }), _jsxs("div", { className: classes.inputWrapper, children: [_jsxs("div", { className: classes.labelWrapper, children: [_jsx(Label, { className: classes.Label, children: "Solution Description" }), errors.solution && _jsx(Text, { className: classes.errorText, children: errors.solution })] }), _jsx(Textarea, { placeholder: "Explain how your startup solves this problem.", className: classes.textarea, value: formData.solution, onChange: handleInputChange("solution") })] }), _jsxs("div", { className: classes.inputWrapper, children: [_jsxs("div", { className: classes.labelWrapper, children: [_jsx(Label, { className: classes.Label, children: "Your Idea" }), errors.idea && _jsx(Text, { className: classes.errorText, children: errors.idea })] }), _jsx(Textarea, { placeholder: "Describe your innovative idea in detail.", className: classes.textarea, value: formData.idea, onChange: handleInputChange("idea") })] })] })] })), step === 3 && (_jsxs("div", { style: { alignSelf: "flex-start", width: "100%" }, children: [_jsxs("div", { className: classes.header, children: [_jsx(Text, { as: "h1", className: classes.title, children: "Who are your customers?" }), _jsx(Text, { className: classes.text, style: { marginBottom: "0.5rem" }, children: "Define your target audience." })] }), _jsxs("div", { className: classes.inputWrapper, children: [_jsxs("div", { className: classes.inputWrapper, children: [_jsxs("div", { className: classes.labelWrapper, children: [_jsx(Label, { className: classes.Label, children: "Target Audience" }), errors.targetAudience && _jsx(Text, { className: classes.errorText, children: errors.targetAudience })] }), _jsx(Textarea, { placeholder: "Describe your ideal customers and their characteristics.", className: classes.textarea, value: formData.targetAudience, onChange: handleInputChange("targetAudience") })] }), _jsxs("div", { className: classes.inputWrapper, children: [_jsxs("div", { className: classes.labelWrapper, children: [_jsx(Label, { className: classes.Label, children: "Competitive Advantage" }), errors.competitiveAdvantage && (_jsx(Text, { className: classes.errorText, children: errors.competitiveAdvantage }))] }), _jsx(Textarea, { placeholder: "Explain what makes your solution better than competitors.", className: classes.textarea, value: formData.competitiveAdvantage, onChange: handleInputChange("competitiveAdvantage") })] })] })] })), step === 4 && (_jsxs("div", { style: { alignSelf: "flex-start", width: "100%" }, children: [_jsxs("div", { className: classes.header, children: [_jsx(Text, { as: "h1", className: classes.title, children: "Invite your team" }), _jsx(Text, { className: classes.text, style: { marginBottom: "0.5rem" }, children: "Add your team members and mentors." })] }), _jsxs("div", { className: classes.inputWrapper, children: [_jsx(Input, { label: "Team Members", placeholder: "user@esi-sba.dz", value: tempEmail.teamMember, onChange: handleEmailInput("teamMember"), onKeyDown: handleTeamMemberKeyPress, errorMessage: (errors.teamMember || errors.memberEmails) ?? undefined }), _jsx(Button, { appearance: "secondary", onClick: addTeamMember, children: "Add Team Member" }), formData.memberEmails.length > 0 && (_jsx(TagGroup, { onDismiss: (__e, { value }) => removeTeamMember(value), children: _jsx("div", { className: classes.teamMembersGrid, children: formData.memberEmails.map((email) => (_jsxs(Tag, { value: email, className: classes.teamMemberTag, icon: _jsx(Avatar, { name: email.split("@")[0] }), children: [_jsx(Text, { style: { fontSize: tokens.fontSizeBase100 }, children: email }), _jsx(DismissRegular, { "aria-label": "remove", onClick: (e) => {
                                                        e.stopPropagation();
                                                        removeTeamMember(email);
                                                    } })] }, email))) }) }))] }), _jsxs("div", { className: classes.inputWrapper, children: [_jsx(Input, { label: "Mentors", placeholder: "user@esi-sba.dz", value: tempEmail.mentor, onChange: handleEmailInput("mentor"), onKeyDown: handleMentorKeyPress, errorMessage: errors.mentor ?? undefined }), _jsx(Button, { appearance: "secondary", onClick: addMentor, children: "Add Mentor" }), formData.encadrantEmails.length > 0 && (_jsx(TagGroup, { onDismiss: (_e, { value }) => removeMentor(value), children: _jsx("div", { className: classes.teamMembersGrid, children: formData.encadrantEmails.map((email) => (_jsxs(Tag, { value: email, className: classes.teamMemberTag, icon: _jsx(Avatar, { name: email.split("@")[0] }), children: [_jsx(Text, { style: { fontSize: tokens.fontSizeBase100 }, children: email }), _jsx(DismissRegular, { "aria-label": "remove", onClick: (e) => {
                                                        e.stopPropagation();
                                                        removeMentor(email);
                                                    } })] }, email))) }) }))] })] })), step === 5 && (_jsxs("div", { style: { alignSelf: "flex-start", width: "100%" }, children: [_jsxs("div", { className: classes.header, children: [_jsx(Text, { as: "h1", className: classes.title, children: "How far along is your startup?" }), _jsx(Text, { className: classes.text, style: { marginBottom: "0.5rem" }, children: "Understanding your startup's current stage helps us tailor the incubator's support" })] }), _jsx("div", { className: classes.inputWrapper, children: _jsxs("div", { className: classes.inputWrapper, children: [errors.stage && _jsx(Text, { className: classes.errorText, children: errors.stage }), _jsx("div", { className: classes.radioGroup, children: stageOptions.map((option) => (_jsxs(Button, { className: `${classes.stageButton} ${formData.stage === option.value ? classes.selectedStageButton : ""}`, onClick: () => handleStageChange(option.value), children: [_jsx("span", { className: classes.stageIcon, children: option.icon }), _jsxs("div", { className: classes.stageTextWrapper, children: [_jsx(Text, { className: classes.stageTitle, children: option.title }), _jsx(Text, { className: classes.stageSubtitle, children: option.subtitle })] })] }, option.value))) })] }) })] })), step === 6 && (_jsxs("div", { style: { alignSelf: "flex-start", width: "100%" }, children: [_jsxs("div", { className: classes.header, children: [_jsx(Text, { as: "h1", className: classes.title, children: "What motivates you to join the incubator?" }), _jsx(Text, { className: classes.text, style: { marginBottom: "0.5rem" }, children: "Tell us why you want to join and what you hope to achieve" })] }), _jsx("div", { className: classes.inputWrapper, children: _jsxs("div", { className: classes.inputWrapper, children: [_jsxs("div", { className: classes.labelWrapper, children: [_jsx(Label, { className: classes.Label, children: "Motivation" }), errors.motivation && _jsx(Text, { className: classes.errorText, children: errors.motivation })] }), _jsx(Textarea, { placeholder: "Share your motivation and what you hope to gain from this experience.", className: classes.textarea, value: formData.motivation, onChange: handleInputChange("motivation") })] }) })] })), step === 7 && (_jsxs("div", { className: classes.wrapper, children: [_jsx(TargetArrow24Filled, {}), _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }, children: [_jsx(Text, { as: "h1", className: classes.title, style: { textAlign: "center" }, children: "Application Submitted!" }), _jsx(Text, { className: classes.successMessage, children: "Great job! Your application is now under review. We'll notify you once a decision is made." })] }), _jsxs("div", { className: classes.applicationInfo, children: [_jsxs("div", { className: classes.applicationInfoText, children: [_jsx(Avatar, { icon: _jsx(Rocket24Regular, {}) }), _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-end" }, children: [_jsx(Text, { style: { fontWeight: tokens.fontWeightSemibold }, children: createdProject?.name || formData.name }), _jsx(Text, { style: { fontSize: tokens.fontSizeBase300, color: tokens.colorNeutralForeground3 }, children: createdProject?.industry || formData.industry })] })] }), _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-end" }, children: [_jsx(Badge, { appearance: "outline", className: classes.badge, icon: _jsx(ClockRegular, { "aria-label": "clock" }), children: createdProject?.status || "Pending" }), _jsxs(Text, { className: classes.text, style: { fontSize: tokens.fontSizeBase300, fontWeight: tokens.fontWeightRegular }, children: ["Submitted ", new Date().toLocaleDateString()] })] })] }), _jsx(Button, { className: classes.button, onClick: () => navigate("/dashboard"), children: "Go to Dashboard" }), _jsx(Button, { className: classes.secondaryButton, onClick: () => navigate("/application-details"), children: "View My Application" })] })), step !== 7 && (_jsx(Button, { className: classes.button, onClick: nextStep, disabled: loading, children: loading ? "Submitting..." : step === 6 ? "Complete my application" : "Proceed to the next step" }))] }) }));
};
export default Application;
