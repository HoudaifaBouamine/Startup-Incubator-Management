"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, Button, Input, Textarea, makeStyles, tokens, Select, } from "@fluentui/react-components";
import { FolderAddRegular } from "@fluentui/react-icons";
import { addDeliverable } from "../../../api/session-service";
const useStyles = makeStyles({
    formField: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        marginBottom: "1rem",
    },
    label: {
        fontWeight: tokens.fontWeightSemibold,
    },
    errorText: {
        color: tokens.colorStatusDangerForeground1,
        fontSize: tokens.fontSizeBase200,
        marginTop: "0.25rem",
    },
});
const AddDeliverableModal = ({ sessionId, onDeliverableAdded }) => {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("not started");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async () => {
        if (!title) {
            setError("Please enter a title");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            await addDeliverable(sessionId, {
                title,
                description,
                status,
                progress: status === "not started" ? 0 : 10,
                change: "+0%",
            });
            setOpen(false);
            onDeliverableAdded();
        }
        catch (err) {
            console.error("Error adding deliverable:", err);
            setError(err instanceof Error ? err.message : "Failed to add deliverable");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: (e, data) => setOpen(data.open), children: [_jsx(DialogTrigger, { disableButtonEnhancement: true, children: _jsx(Button, { icon: _jsx(FolderAddRegular, {}), children: "Add Deliverable" }) }), _jsxs(DialogSurface, { children: [_jsx(DialogTitle, { children: "Add New Deliverable" }), _jsxs(DialogBody, { children: [_jsxs("div", { className: styles.formField, children: [_jsx("label", { className: styles.label, children: "Title" }), _jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "e.g., Prototype, Demo Video" })] }), _jsxs("div", { className: styles.formField, children: [_jsx("label", { className: styles.label, children: "Description" }), _jsx(Textarea, { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Describe what this deliverable is about" })] }), _jsxs("div", { className: styles.formField, children: [_jsx("label", { className: styles.label, children: "Status" }), _jsxs(Select, { value: status, onChange: (e) => setStatus(e.target.value), children: [_jsx("option", { value: "not started", children: "Not Started" }), _jsx("option", { value: "in progress", children: "In Progress" }), _jsx("option", { value: "completed", children: "Completed" })] })] }), error && _jsx("div", { className: styles.errorText, children: error })] }), _jsxs(DialogActions, { children: [_jsx(Button, { appearance: "secondary", onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { appearance: "primary", onClick: handleSubmit, disabled: loading, children: loading ? "Adding..." : "Add Deliverable" })] })] })] }));
};
export default AddDeliverableModal;
