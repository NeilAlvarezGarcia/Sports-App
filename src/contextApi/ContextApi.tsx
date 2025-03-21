import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/authentication';

// prop children type
type Prop = {
  children: JSX.Element;
};

// AppState type
type AppState = {
  mode: string;
  changeMode: (mode: string) => void;
  user: any;
  setUser: React.Dispatch<any>;
};

const intialState: AppState = {
  mode: '',
  changeMode: (mode: string) => {},
  user: null,
  setUser: () => {},
};

const context = createContext<AppState>(intialState);

const getMode = (): string => {
  const mode = localStorage.getItem('mode');

  if (mode) return mode;
  else return 'light';
};

const ContextApi: FC<Prop> = ({ children }) => {
  const [mode, setMode] = useState<string>(getMode());
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  const changeMode = (mode: string) => {
    localStorage.setItem('mode', mode);

    setMode(mode);
  };

  const value = {
    mode,
    changeMode,
    user,
    setUser,
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      setLoading(false);
    });
  }, []);

  return <context.Provider value={value}>{!loading && <>{children}</>}</context.Provider>;
};

export const UseContext = () => {
  return useContext(context);
};

export default ContextApi;
