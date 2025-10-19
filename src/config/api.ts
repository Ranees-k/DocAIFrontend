// API Configuration with proper fallback
const getApiBaseUrl = () => {
  const envUrl = process.env.REACT_APP_API_URL;
  console.log('Raw env variable:', envUrl);
  console.log('Type of env variable:', typeof envUrl);
  
  // Check if the environment variable is properly loaded
  if (envUrl && envUrl !== 'undefined' && envUrl.trim() !== '') {
    console.log('Using environment variable:', envUrl);
    return envUrl.trim();
  }
  
  // Fallback - use the production URL directly
  console.log('Environment variable not loaded, using production URL');
  return 'https://docaibackend-41i1.onrender.com';
};

const API_BASE_URL = getApiBaseUrl();

// Debug logging
console.log('Environment check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('- Final API_BASE_URL:', API_BASE_URL);

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    ACTIVATE: (token: string) => `${API_BASE_URL}/auth/activate/${token}`,
    RESEND_ACTIVATION: `${API_BASE_URL}/auth/resend-activation`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
  },
  
  // Document Management
  DOCUMENTS: {
    UPLOAD: `${API_BASE_URL}/file/upload`,
    LIST: `${API_BASE_URL}/documents`,
    DELETE: (id: string) => `${API_BASE_URL}/file/${id}`,
    GET: (id: string) => `${API_BASE_URL}/documents/${id}`,
  },
  
  // AI Query
  AI: {
    QUERY: `${API_BASE_URL}/query/query`,
    CHAT: `${API_BASE_URL}/query/chat`,
    ANALYZE: `${API_BASE_URL}/query/analyze`,
  },
  
  // User Management
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/user/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/user/change-password`,
  },
  
  // Subscription/Pricing
  SUBSCRIPTION: {
    PLANS: `${API_BASE_URL}/subscription/plans`,
    SUBSCRIBE: `${API_BASE_URL}/subscription/subscribe`,
    CANCEL: `${API_BASE_URL}/subscription/cancel`,
    STATUS: `${API_BASE_URL}/subscription/status`,
  },
};

// Export the base URL for backward compatibility
export { API_BASE_URL };

// Helper function to build full URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

// API Configuration object
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Environment check
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production'; 