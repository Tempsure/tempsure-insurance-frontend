export const getApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (apiUrl) return apiUrl.replace(/\/$/, '');
  if (process.env.NODE_ENV === 'development') return 'http://localhost:8000';
  throw new Error('NEXT_PUBLIC_API_BASE_URL environment variable is not set');
};

export const getApiUrl = (endpoint: string): string => {
  const base = getApiBaseUrl();
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};

/** Wrapper around fetch that always sends session cookies. */
export async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  return fetch(getApiUrl(endpoint), {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });
}
