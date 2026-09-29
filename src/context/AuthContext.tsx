import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clear old permanent localStorage token if present
    localStorage.removeItem('adminToken');
    
    const token = sessionStorage.getItem('cmsAuthToken');
    if (token === 'valid_session_absa') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (
      (cleanEmail === 'absa@admin' || cleanEmail === 'absa@admin.com') &&
      password === 'Saba2002@@'
    ) {
      sessionStorage.setItem('cmsAuthToken', 'valid_session_absa');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('cmsAuthToken');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (isLoading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">Chargement...</div>;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
