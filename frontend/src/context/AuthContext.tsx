import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProfile, login as loginService, signup as signupService, User } from '../services/auth';
import apiClient from '../services/axios';

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (payload: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'student' | 'freelancer';
  }) => Promise<User>;
  logout: () => void;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('edulance_user');
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem('edulance_user');
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('edulance_token'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('edulance_token', token);
    } else {
      localStorage.removeItem('edulance_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('edulance_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('edulance_user');
    }
  }, [user]);

  useEffect(() => {
    const refreshProfile = async () => {
      if (token && !user) {
        try {
          const response = await getProfile();
          setUser(response.user);
        } catch {
          setToken(null);
          setUser(null);
        }
      }
    };

    refreshProfile();
  }, [token, user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginService({ email, password });
      setUser(response.user);
      setToken(response.token);
      return response.user;
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
        ? err.message
        : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (payload: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'student' | 'freelancer';
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signupService(payload);
      setUser(response.user);
      setToken(response.token);
      return response.user;
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
        ? err.message
        : 'Signup failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('edulance_user');
    localStorage.removeItem('edulance_token');

    apiClient.post('/auth/logout').catch(() => {
      // Client-side cleanup only; token is stored in browser storage.
    });
  };

  const clearError = () => setError(null);

  const value = useMemo(
    () => ({ user, token, isLoading, error, login, signup, logout, clearError }),
    [user, token, isLoading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
