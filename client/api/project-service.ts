import {
  Deliverable,
  Feedback,
  Session,
  ProjectRelation,
  ProjectMember,
  Project,
} from '../src/types';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API request failed");
  }

  return response.json();
};

export const getProjectById = async (projectId: string): Promise<Project> => {
  return fetchWithAuth(`/projects/${projectId}`);
};

export const getProjectSessions = async (projectId: string): Promise<Session[]> => {
  return fetchWithAuth(`/projects/${projectId}/sessions`);
};

export const getProjectMembers = async (projectId: string): Promise<ProjectRelation> => {
  return fetchWithAuth(`/projects/${projectId}/relation?relationType=members`);
};

export const getProjectEncadrants = async (projectId: string): Promise<ProjectRelation> => {
  return fetchWithAuth(`/projects/${projectId}/relation?relationType=encadrants`);
};

export const getProjectJuryMembers = async (projectId: string): Promise<ProjectRelation> => {
  return fetchWithAuth(`/projects/${projectId}/relation?relationType=juryMembers`);
};

export const getProjectByUserId = async (userId: string): Promise<Project[]> => {
  return fetchWithAuth(`/projects/user/${userId}`);
};

export const addDeliverable = async (sessionId: string, deliverable: Partial<Deliverable>) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables`, {
    method: "POST",
    body: JSON.stringify(deliverable),
  });
};

export const addFeedback = async (sessionId: string, feedback: Partial<Feedback>) => {
  return fetchWithAuth(`/sessions/${sessionId}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedback),
  });
};

export const updateDeliverableProgress = async (sessionId: string, deliverableId: string, progress: number) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}/progress`, {
    method: "PATCH",
    body: JSON.stringify({ progress }),
  });
};

export const createSession = async (projectId: string, session: Partial<Session>) => {
  return fetchWithAuth(`/projects/${projectId}/sessions`, {
    method: "POST",
    body: JSON.stringify(session),
  });
};

export const getSessionById = async (sessionId: string): Promise<Session> => {
  return fetchWithAuth(`/sessions/${sessionId}`);
};

export const updateSession = async (sessionId: string, sessionData: Partial<Session>) => {
  return fetchWithAuth(`/sessions/${sessionId}`, {
    method: "PATCH",
    body: JSON.stringify(sessionData),
  });
};

export const deleteSession = async (sessionId: string) => {
  return fetchWithAuth(`/sessions/${sessionId}`, {
    method: "DELETE",
  });
};

export const updateDeliverable = async (
  sessionId: string,
  deliverableId: string,
  deliverableData: Partial<Deliverable>,
) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}`, {
    method: "PATCH",
    body: JSON.stringify(deliverableData),
  });
};

export const deleteDeliverable = async (sessionId: string, deliverableId: string) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}`, {
    method: "DELETE",
  });
};

export const updateFeedback = async (sessionId: string, feedbackId: string, feedbackData: Partial<Feedback>) => {
  return fetchWithAuth(`/sessions/${sessionId}/feedbacks/${feedbackId}`, {
    method: "PATCH",
    body: JSON.stringify(feedbackData),
  });
};

export const deleteFeedback = async (sessionId: string, feedbackId: string) => {
  return fetchWithAuth(`/sessions/${sessionId}/feedbacks/${feedbackId}`, {
    method: "DELETE",
  });
};

export const addMemberToProject = async (projectId: string, userIdentifier: string) => {
  return fetchWithAuth('/projects/add-member', {
    method: 'POST',
    body: JSON.stringify({ projectId, userIdentifier }),
  });
};

export const addEncadrantToProject = async (projectId: string, userIdentifier: string) => {
  return fetchWithAuth('/projects/add-encadrant', {
    method: 'POST',
    body: JSON.stringify({ projectId, userIdentifier }),
  });
};

export const getAllUsers = async (): Promise<ProjectMember[]> => {
  return fetchWithAuth('/');
};

export const getUserByEmail = async (email: string): Promise<ProjectMember> => {
  return fetchWithAuth(`/email/${email}`);
};

export const createProject = async (projectData: {
  name: string;
  industry: string;
  about: string;
  problem: string;
  solution: string;
  idea: string;
  targetAudience: string;
  competitiveAdvantage: string;
  motivation: string;
  stage: string;
  memberEmails: string[];
  encadrantEmails: string[];
}): Promise<Project> => {
  return fetchWithAuth('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
};

export const searchProjectsByName = async (name: string): Promise<Project[]> => {
  return fetchWithAuth(`/projects/search/name/${name}`);
};

export const getProjectsWithoutEncadrants = async (): Promise<{ projects: { id: string; name: string; membersCount: number }[] }> => {
  return fetchWithAuth('/projects/noencadrants');
};

export type { Session };
