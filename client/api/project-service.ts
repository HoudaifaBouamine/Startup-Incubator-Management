// API service for project-related operations
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

export interface Deliverable {
  title: string
  description: string
  status: string
  progress: number
  change: string
}

export interface Feedback {
  author: string
  text: string
}

export interface Session {
  id: string
  date: string
  deliverables: Deliverable[]
  feedbacks: Feedback[]
}

export interface ProjectProgress {
  id: string
  name: string
  globalProgress: number
  sessions: Session[]
}

export interface ProjectMember {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface ProjectRelation {
  projectId: string
  relationType: string
  relationData: ProjectMember[]
}

// Get authentication token from local storage
const getAuthToken = () => localStorage.getItem("authToken")

// Helper function for API requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken()

  if (!token) {
    throw new Error("Authentication required")
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "API request failed")
  }

  return response.json()
}

export const getProjectById = async (projectId: string) => {
  return fetchWithAuth(`/projects/${projectId}`)
}

export const getProjectSessions = async (projectId: string) => {
  return fetchWithAuth(`/projects/${projectId}/sessions`)
}

export const getProjectMembers = async (projectId: string) => {
  return fetchWithAuth(`/projects/${projectId}/relation?relationType=members`)
}

export const getProjectEncadrants = async (projectId: string) => {
  return fetchWithAuth(`/projects/${projectId}/relation?relationType=encadrants`)
}

export const getProjectJuryMembers = async (projectId: string) => {
  return fetchWithAuth(`/projects/${projectId}/relation?relationType=juryMembers`)
}

export const addDeliverable = async (sessionId: string, deliverable: Partial<Deliverable>) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables`, {
    method: "POST",
    body: JSON.stringify(deliverable),
  })
}

export const addFeedback = async (sessionId: string, feedback: Partial<Feedback>) => {
  return fetchWithAuth(`/sessions/${sessionId}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedback),
  })
}

export const updateDeliverableProgress = async (sessionId: string, deliverableId: string, progress: number) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}/progress`, {
    method: "PATCH",
    body: JSON.stringify({ progress }),
  })
}

export const createSession = async (projectId: string, session: Partial<Session>) => {
  return fetchWithAuth(`/projects/${projectId}/sessions`, {
    method: "POST",
    body: JSON.stringify(session),
  })
}
