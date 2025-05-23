"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, Button, Input, Textarea, makeStyles, tokens, } from "@fluentui/react-components";
import { CommentAddRegular } from "@fluentui/react-icons";
import { addFeedback } from "../../../api/session-service";
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
const AddFeedbackModal = ({ sessionId, onFeedbackAdded }) => {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async () => {
        if (!author || !text) {
            setError("Please fill in all fields");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            await addFeedback(sessionId, {
                author,
                text,
            });
            setOpen(false);
            onFeedbackAdded();
        }
        catch (err) {
            console.error("Error adding feedback:", err);
            setError(err instanceof Error ? err.message : "Failed to add feedback");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: (e, data) => setOpen(data.open), children: [_jsx(DialogTrigger, { disableButtonEnhancement: true, children: _jsx(Button, { icon: _jsx(CommentAddRegular, {}), children: "Add Feedback" }) }), _jsxs(DialogSurface, { children: [_jsx(DialogTitle, { children: "Add New Feedback" }), _jsxs(DialogBody, { children: [_jsxs("div", { className: styles.formField, children: [_jsx("label", { className: styles.label, children: "Author" }), _jsx(Input, { value: author, onChange: (e) => setAuthor(e.target.value), placeholder: "Your name" })] }), _jsxs("div", { className: styles.formField, children: [_jsx("label", { className: styles.label, children: "Feedback" }), _jsx(Textarea, { value: text, onChange: (e) => setText(e.target.value), placeholder: "Provide your feedback on the project progress" })] }), error && _jsx("div", { className: styles.errorText, children: error })] }), _jsxs(DialogActions, { children: [_jsx(Button, { appearance: "secondary", onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { appearance: "primary", onClick: handleSubmit, disabled: loading, children: loading ? "Adding..." : "Add Feedback" })] })] })] }));
};
export default AddFeedbackModal;
