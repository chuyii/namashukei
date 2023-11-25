'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';

import { auth } from './firebase';

type AuthContextValue = {
  currentUser: User;
};

const AuthContext = createContext<AuthContextValue>({
  currentUser: null as unknown as AuthContextValue['currentUser'],
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({
  fallback,
  children,
}: {
  fallback: JSX.Element;
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<
    AuthContextValue['currentUser'] | null
  >(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser((await signInAnonymously(auth)).user);
      }
    });

    return unsubscribe;
  }, []);

  if (currentUser === null) return fallback;

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
