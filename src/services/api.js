/**
 * GuruDev Centralized API Service Layer
 * High-performance client with in-memory caching, request deduplication,
 * and automatic cache invalidation on write mutations.
 */

const API_BASE_URL = '/api';

export const TOKEN_STORAGE_KEY = 'gurudev_access_token';
export const USER_STORAGE_KEY = 'gurudev_user';

// In-Memory Client-Side Cache for GET Requests
const clientCache = new Map();
const CACHE_LIFETIME_MS = 60 * 1000; // 60 seconds

export function clearClientCache() {
  clientCache.clear();
}

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
  const method = options.method || 'GET';
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // Cache check for GET requests
  const isGet = method.toUpperCase() === 'GET';
  const token = getStoredToken();
  const cacheKey = `${url}:${token || 'anon'}`;

  if (isGet && !options.skipCache) {
    const cached = clientCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_LIFETIME_MS) {
      return cached.data;
    }
  }

  // Mutating requests invalidate cache
  if (!isGet) {
    clearClientCache();
  }

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

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
      const errorMsg = (typeof data === 'object' && (data?.detail || data?.error?.message))
        ? (data.detail || data.error.message)
        : `Request failed with status ${response.status}`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    // Save to client cache if GET
    if (isGet) {
      clientCache.set(cacheKey, { timestamp: Date.now(), data });
    }

    return data;
  } catch (err) {
    console.error(`API Error [${method} ${url}]:`, err);
    throw err;
  }
}

export const api = {
  // 1. Health check
  health: {
    check: (options) => request('/health', options),
  },

  // 2. Authentication
  auth: {
    register: async (credentials) => {
      clearClientCache();
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
      clearClientCache();
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
      clearClientCache();
      return Promise.resolve({ success: true });
    },
  },

  // 3. Decision Analyses
  analyses: {
    create: (analysisInput) => {
      clearClientCache();
      return request('/analyses', {
        method: 'POST',
        body: JSON.stringify(analysisInput),
      });
    },

    list: (options) => request('/analyses', options),

    get: (id, options) => request(`/analyses/${id}`, options),

    update: (id, updates) => {
      clearClientCache();
      return request(`/analyses/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    },

    delete: (id) => {
      clearClientCache();
      return request(`/analyses/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // 4. Socratic Reflection Room
  reflections: {
    list: (analysisId, options) => request(`/analyses/${analysisId}/reflection`, options),

    create: (analysisId, messageData) => {
      clearClientCache();
      return request(`/analyses/${analysisId}/reflection`, {
        method: 'POST',
        body: JSON.stringify(messageData),
      });
    },
  },
};
