import { createContext, useState, ReactNode, useContext } from "react";

import User from '../Entities/User';
interface StateContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextType>({
  user: null,
  token: null,
  setUser: () => { },
  setToken: () => { }
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<User | null>({
    name: 'John'
  });
  const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  return (
    <StateContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);