import { ProjectMember } from '../src/types';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL 

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
  }

  return response.json();
};

export const updateUserPassword = async (email: string, currentPassword: string, newPassword: string) => {
  return fetchWithAuth('/password', {
    method: 'PATCH',
    body: JSON.stringify({ email, currentPassword, newPassword }),
  });
};

export const getUserByEmail = async (email: string): Promise<ProjectMember> => {
  return fetchWithAuth(`/email/${email}`);
};

export const updateUserProfile = async (profileData: { firstName?: string; lastName?: string; bio?: string }) => {
  return fetchWithAuth('/profile', {
    method: 'PATCH',
    body: JSON.stringify(profileData),
  });
};

export const generatePasswordResetToken = async (email: string) => {
  return fetchWithAuth('/reset-token', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const validateResetToken = async (email: string, token: string) => {
  return fetchWithAuth('/validate-reset-token', {
    method: 'POST',
    body: JSON.stringify({ email, token }),
  });
};

export const verifyUser = async (email: string, token: string) => {
  return fetchWithAuth('/verify-user', {
    method: 'POST',
    body: JSON.stringify({ email, token }),
  });
};

export const updateUserRole = async (userId: string, role: string) => {
  return fetchWithAuth(`/role/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
};

export const deleteUser = async (userId: string) => {
  return fetchWithAuth(`/${userId}`, {
    method: 'DELETE',
  });
};

export const getAllUsers = async (): Promise<ProjectMember[]> => {
  return fetchWithAuth('/');
};
