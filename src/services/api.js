/**
 * GuruDev Centralized API Service Layer
 * Uses relative URL '/api' for seamless single-domain deployment on Vercel
 * and local development through Vite proxy.
 */

const API_BASE_URL = '/api';

export const TOKEN_STORAGE_KEY = 'gurudev_access_token';
export const USER_STORAGE_KEY = 'gurudev_user';

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch (e) {
    console.error('Error saving auth token to localStorage:', e);
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  try {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  } catch (e) {
    console.error('Error saving user data to localStorage:', e);
  }
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getStoredToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorMsg = (typeof data === 'object' && data?.detail)
        ? data.detail
        : `Request failed with status ${response.status}`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    console.error(`API Error [${options.method || 'GET'} ${url}]:`, err);
    throw err;
  }
}

export const api = {
  // 1. Health check
  health: {
    check: () => request('/health'),
  },

  // 2. Authentication
  auth: {
    register: async (credentials) => {
      const data = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      if (data?.access_token) {
        setStoredToken(data.access_token);
        setStoredUser(data.user);
      }
      return data;
    },

    login: async (credentials) => {
      const data = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      if (data?.access_token) {
        setStoredToken(data.access_token);
        setStoredUser(data.user);
      }
      return data;
    },

    getMe: async () => {
      const user = await request('/auth/me');
      setStoredUser(user);
      return user;
    },

    logout: () => {
      setStoredToken(null);
      setStoredUser(null);
      return Promise.resolve({ success: true });
    },
  },

  // 3. Decision Analyses
  analyses: {
    create: (analysisInput) =>
      request('/analyses', {
        method: 'POST',
        body: JSON.stringify(analysisInput),
      }),

    list: () => request('/analyses'),

    get: (id) => request(`/analyses/${id}`),

    update: (id, updates) =>
      request(`/analyses/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      }),

    delete: (id) =>
      request(`/analyses/${id}`, {
        method: 'DELETE',
      }),
  },

  // 4. Socratic Reflection Room
  reflections: {
    list: (analysisId) => request(`/analyses/${analysisId}/reflection`),

    create: (analysisId, messageData) =>
      request(`/analyses/${analysisId}/reflection`, {
        method: 'POST',
        body: JSON.stringify(messageData),
      }),
  },
};
