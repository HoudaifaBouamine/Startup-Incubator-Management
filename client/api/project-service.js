// API service for project-related operations
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
// Get authentication token from local storage
const getAuthToken = () => localStorage.getItem("authToken");
// Helper function for API requests
const fetchWithAuth = async (url, options = {}) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("Authentication required");
    }
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
    };
    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "API request failed");
    }
    return response.json();
};
export const getProjectById = async (projectId) => {
    return fetchWithAuth(`/projects/${projectId}`);
};
export const getProjectSessions = async (projectId) => {
    return fetchWithAuth(`/projects/${projectId}/sessions`);
};
export const getProjectMembers = async (projectId) => {
    return fetchWithAuth(`/projects/${projectId}/relation?relationType=members`);
};
export const getProjectEncadrants = async (projectId) => {
    return fetchWithAuth(`/projects/${projectId}/relation?relationType=encadrants`);
};
export const getProjectJuryMembers = async (projectId) => {
    return fetchWithAuth(`/projects/${projectId}/relation?relationType=juryMembers`);
};
export const addDeliverable = async (sessionId, deliverable) => {
    return fetchWithAuth(`/sessions/${sessionId}/deliverables`, {
        method: "POST",
        body: JSON.stringify(deliverable),
    });
};
export const addFeedback = async (sessionId, feedback) => {
    return fetchWithAuth(`/sessions/${sessionId}/feedbacks`, {
        method: "POST",
        body: JSON.stringify(feedback),
    });
};
export const updateDeliverableProgress = async (sessionId, deliverableId, progress) => {
    return fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}/progress`, {
        method: "PATCH",
        body: JSON.stringify({ progress }),
    });
};
export const createSession = async (projectId, session) => {
    return fetchWithAuth(`/projects/${projectId}/sessions`, {
        method: "POST",
        body: JSON.stringify(session),
    });
};
