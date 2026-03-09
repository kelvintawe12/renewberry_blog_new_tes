import React, { useEffect, useState, createContext, useContext } from 'react';
import { User, DEMO_ACCOUNTS } from '../data/authData';
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('renewberry_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from local storage');
      }
    }
  }, []);
  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (
        email === DEMO_ACCOUNTS.admin.email &&
        password === DEMO_ACCOUNTS.admin.password)
        {
          setUser(DEMO_ACCOUNTS.admin.user);
          localStorage.setItem(
            'renewberry_user',
            JSON.stringify(DEMO_ACCOUNTS.admin.user)
          );
          resolve();
        } else if (
        email === DEMO_ACCOUNTS.creator.email &&
        password === DEMO_ACCOUNTS.creator.password)
        {
          setUser(DEMO_ACCOUNTS.creator.user);
          localStorage.setItem(
            'renewberry_user',
            JSON.stringify(DEMO_ACCOUNTS.creator.user)
          );
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('renewberry_user');
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout
      }}>

      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}