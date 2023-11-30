import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Define the user type
interface User {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

// Define the context type
interface UserContextType {
  user: User | null;
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const handleGetAuthStatus = async () => {
    const isGoogleSignedIn = await GoogleSignin.isSignedIn();
    setIsSignedIn(isGoogleSignedIn);
    if (isGoogleSignedIn) {
      const userInfo = await GoogleSignin.getCurrentUser();
      if (userInfo && userInfo.user) {
        setUser(userInfo.user);
      }
    }
  };

  const signIn = async () => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    handleGetAuthStatus();
  };

  const signOut = async () => {
    await GoogleSignin.signOut();
    handleGetAuthStatus();
  };

  useEffect(() => {
    handleGetAuthStatus();
  }, []);

  return (
    <UserContext.Provider value={{user, isSignedIn, signIn, signOut}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing the user context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export {UserProvider, useUser};
