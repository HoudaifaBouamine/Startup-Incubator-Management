import { ProjectMember } from '../types';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("authToken");

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("Content-Type");
  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
    let errorMessage = `API request failed with status ${response.status}`;
    if (isJson) {
      try {
        const errorData = await response.json();
        if (response.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
        errorMessage = errorData.message || errorMessage;
      } catch {
      }
    } else {
      const text = await response.text();
      errorMessage = text || errorMessage;
    }
    throw new Error(errorMessage);
  }

  if (isJson) {
    return response.json();
  } else {
    const text = await response.text();
    throw new Error(`Expected JSON response but received: ${text || "empty response"}`);
  }
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

export { fetchWithAuth };