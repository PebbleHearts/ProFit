import React, {useEffect, useState, createContext, useContext} from 'react';
import {Session, User} from '@supabase/supabase-js';
import {supabase} from '../lib/initSupabase';

export const UserContext = createContext<{
  user: User | null | undefined;
  session: Session | null | undefined;
}>({
  user: undefined,
  session: undefined,
});

export const UserContextProvider = (props: any) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const getSessionData = async () => {
    const sessionData = await supabase.auth.getSession();
    setSession(sessionData.data.session);
    setUser(sessionData.data.session?.user ?? null);
  };
  useEffect(() => {
    getSessionData();
    supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log(`Supabase auth event: ${event}`);
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });
  }, []);

  const value = {
    session,
    user,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider.');
  }
  return context;
};
