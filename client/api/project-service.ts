import {
  Deliverable,
  Feedback,
  Session,
  ProjectRelation,
  ProjectMember,
  Project,
} from "../types";
import { fetchWithAuth } from "./user-service";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

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

export const getProjectByUser = async (user: { id: string; firstName: string; }): Promise<Project[]> => {
  try {
    const userId = user.id;
    const firstName = user.firstName || '';

    const projects = await fetchWithAuth(`/projects/search/owner/${encodeURIComponent(firstName)}`);
    return projects.filter((project: Project) =>
      project?.owners?.some((owner: ProjectMember) => owner.id === userId)
    );
  } catch (error) {
    console.error("Error fetching projects by user ID:", error);
    return [];
  }
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
  return fetchWithAuth(`/projects/search/name/${encodeURIComponent(name)}`);
};

export const getProjectsWithoutEncadrants = async (): Promise<{ projects: { id: string; name: string; membersCount: number }[] }> => {
  return fetchWithAuth('/projects/noencadrants');
};

export const addMemberToProject = async (projectId: string, userIdentifier: string) => {
  return fetchWithAuth("/projects/add-member", {
    method: "POST",
    body: JSON.stringify({ projectId, userIdentifier }),
  });
};

export const addEncadrantToProject = async (projectId: string, userId: string) => {
  return fetchWithAuth(`/projects/${projectId}/add-encadrant/${userId}`, {
    method: 'POST',
  });
};

export const addJuryMemberToProject = async (projectId: string, userId: string) => {
  return fetchWithAuth(`/projects/${projectId}/add-jury/${userId}`, {
    method: 'POST',
  });
};

export const createSession = async (projectId: string, sessionData: Partial<Session>) => {
  return fetchWithAuth(`/projects/${projectId}/sessions`, {
    method: "POST",
    body: JSON.stringify(sessionData),
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

export const addDeliverable = async (sessionId: string, deliverableData: Partial<Deliverable>) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables`, {
    method: "POST",
    body: JSON.stringify(deliverableData),
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

export const updateDeliverableProgress = async (sessionId: string, deliverableId: string, progress: number) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}/progress`, {
    method: "PATCH",
    body: JSON.stringify({ progress }),
  });
};

export const deleteDeliverable = async (sessionId: string, deliverableId: string) => {
  return fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}`, {
    method: "DELETE",
  });
};

export const addFeedback = async (sessionId: string, feedbackData: Partial<Feedback>) => {
  return fetchWithAuth(`/sessions/${sessionId}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedbackData),
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

export type { Session };