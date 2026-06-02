/**
 * LogiSchool API Client
 *
 * Lightweight fetch wrapper with:
 * - Auto base URL from env
 * - JWT token attachment
 * - Consistent error handling
 * - Response unwrapping
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get stored auth token.
   */
  getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('logischool_token');
  }

  /**
   * Set auth token.
   */
  setToken(token) {
    if (typeof window === 'undefined') return;
    if (token) {
      localStorage.setItem('logischool_token', token);
    } else {
      localStorage.removeItem('logischool_token');
    }
  }

  /**
   * Core fetch method.
   */
  async request(endpoint, options = {}) {
    const { body, headers: customHeaders, ...restOptions } = options;

    const headers = {
      ...customHeaders,
    };

    // Add JSON content type for non-GET requests with body
    if (body && !(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    // Attach auth token
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...restOptions,
      headers,
    };

    if (body) {
      config.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response;
    }

    const data = await response.json();

    if (!response.ok) {
      // Handle 401 — redirect to login
      if (response.status === 401 && typeof window !== 'undefined') {
        this.setToken(null);
        // Don't redirect if already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }

      const error = new Error(data.message || 'Something went wrong');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  // ── Convenience methods ──

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body });
  }

  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body });
  }

  patch(endpoint, body) {
    return this.request(endpoint, { method: 'PATCH', body });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Singleton instance
const api = new ApiClient(API_BASE);

export default api;
