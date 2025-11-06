"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { delay } from "@/utils";
import { useUserStore } from "@/store/useUserStore";

const AuthContext = createContext( undefined );

export const AuthProvider = ( { children, status } ) => {
  const [isAuthenticated, setIsAuthenticated] = useState( false );
  const [loading, setLoading] = useState( true );
  const { setAuthorized } = useUserStore();
  
  useEffect( () => {
    setIsAuthenticated( status );
    setAuthorized( status );
    delay( 500 ).then( () => setLoading( false ) );
  }, [setAuthorized, status] );
  
  return (
    <AuthContext.Provider value={ { isAuthenticated, setIsAuthenticated, loading } }>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext( AuthContext );