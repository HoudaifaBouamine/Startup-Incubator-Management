import { Deliverable, Feedback } from "@/types/"

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL 

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: "include", 
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "API request failed")
  }

  return response.json()
}

export const createSession = async (projectId: string, sessionData: { date: string }) => {
  return fetchWithAuth(`/projects/${projectId}/sessions`, {
    method: "POST",
    body: JSON.stringify(sessionData),
  })
}

export const getSessionsByProject = async (projectId: string) => {
  return fetchWithAuth(`/projects/${projectId}/sessions`)
}

export const getSessionById = async (sessionId: string) => {
  return fetchWithAuth(`/sessions/${sessionId}`)
}

export const updateSession = async (sessionId: string, sessionData: any) => {
  return fetchWithAuth(`/sessions/${sessionId}`, {
    method: "PATCH",
    body: JSON.stringify(sessionData),
  })
}

export const deleteSession = async (sessionId: string) => {
  return fetchWithAuth(`/sessions/${sessionId}`, {
    method: "DELETE",
  })
}

export const addDeliverable = async (sessionId: string, deliverableData: Partial<Deliverable>) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables`, {
    method: "POST",
    body: JSON.stringify(deliverableData),
  })
}

export const updateDeliverable = async (
  sessionId: string,
  deliverableId: string,
  deliverableData: Partial<Deliverable>,
) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}`, {
    method: "PATCH",
    body: JSON.stringify(deliverableData),
  })
}

export const deleteDeliverable = async (sessionId: string, deliverableId: string) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}`, {
    method: "DELETE",
  })
}

export const addFeedback = async (sessionId: string, feedbackData: Partial<Feedback>) => {
  return fetchWithAuth(`/sessions/${sessionId}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedbackData),
  })
}

export const updateFeedback = async (sessionId: string, feedbackId: string, feedbackData: Partial<Feedback>) => {
  return fetchWithAuth(`/sessions/${sessionId}/feedbacks/${feedbackId}`, {
    method: "PATCH",
    body: JSON.stringify(feedbackData),
  })
}

export const deleteFeedback = async (sessionId: string, feedbackId: string) => {
  return fetchWithAuth(`/sessions/${sessionId}/feedbacks/${feedbackId}`, {
    method: "DELETE",
  })
}
