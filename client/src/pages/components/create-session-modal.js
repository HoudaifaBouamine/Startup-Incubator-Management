"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, Button, Input, makeStyles, tokens, } from "@fluentui/react-components";
import { CalendarAddRegular } from "@fluentui/react-icons";
import { createSession } from "../../../api/session-service";
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
const CreateSessionModal = ({ projectId, onSessionCreated }) => {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async () => {
        if (!date) {
            setError("Please select a date");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            await createSession(projectId, { date });
            setOpen(false);
            onSessionCreated();
        }
        catch (err) {
            console.error("Error creating session:", err);
            setError(err instanceof Error ? err.message : "Failed to create session");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: (e, data) => setOpen(data.open), children: [_jsx(DialogTrigger, { disableButtonEnhancement: true, children: _jsx(Button, { icon: _jsx(CalendarAddRegular, {}), children: "Create New Session" }) }), _jsxs(DialogSurface, { children: [_jsx(DialogTitle, { children: "Create New Progress Session" }), _jsx(DialogBody, { children: _jsxs("div", { className: styles.formField, children: [_jsx("label", { className: styles.label, children: "Session Date" }), _jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) }), error && _jsx("div", { className: styles.errorText, children: error })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { appearance: "secondary", onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { appearance: "primary", onClick: handleSubmit, disabled: loading, children: loading ? "Creating..." : "Create Session" })] })] })] }));
};
export default CreateSessionModal;
