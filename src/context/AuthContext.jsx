import { useEffect, useMemo, useState } from 'react';
import auth from '../services/auth';
import { getApiError } from '../services/api';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [restoreError, setRestoreError] = useState('');

  const saveSession = (session) => {
    if (!session?.accessToken) {
      throw new Error('The authentication response did not include an access token');
    }
    localStorage.setItem('accessToken', session.accessToken);
    if (session.user) {
      localStorage.setItem('user', JSON.stringify(session.user));
      setUser(session.user);
    }
  };

  const clearSession = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    let active = true;
    const restoreSession = async () => {
      try {
        if (!localStorage.getItem('accessToken')) {
          const refreshed = await auth.refresh();
          saveSession(refreshed);
        }
        const profile = await auth.profile();
        if (active) {
          localStorage.setItem('user', JSON.stringify(profile));
          setUser(profile);
        }
      } catch (error) {
        if (active && [401, 403].includes(error.response?.status)) clearSession();
        else if (active) setRestoreError(getApiError(error) || 'تعذر استعادة الجلسة');
      } finally {
        if (active) setLoading(false);
      }
    };

    const handleExpired = () => clearSession();
    window.addEventListener('auth:expired', handleExpired);
    restoreSession();
    return () => {
      active = false;
      window.removeEventListener('auth:expired', handleExpired);
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      restoreError,
      async login(credentials) {
        const session = await auth.login(credentials);
        saveSession(session);
        return session;
      },
      async register(details) {
        const session = await auth.register(details);
        clearSession();
        return session;
      },
      async logout() {
        try {
          if (localStorage.getItem('accessToken')) await auth.logout();
        } catch (error) {
          const message = getApiError(error);
          clearSession();
          throw new Error(message, { cause: error });
        }
        clearSession();
      },
    }),
    [user, loading, restoreError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
