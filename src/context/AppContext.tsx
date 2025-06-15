import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Job, Application } from '../types';

interface AppState {
  jobs: Job[];
  applications: Application[];
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
}

type AppAction =
  | { type: 'SET_JOBS'; payload: Job[] }
  | { type: 'SET_APPLICATIONS'; payload: Application[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ADMIN_STATUS'; payload: boolean }
  | { type: 'LOGOUT' };

const initialState: AppState = {
  jobs: [],
  applications: [],
  loading: false,
  error: null,
  isAdmin: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload };
    case 'SET_APPLICATIONS':
      return { ...state, applications: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ADMIN_STATUS':
      return { ...state, isAdmin: action.payload };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}