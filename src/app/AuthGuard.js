'use client';

import { useAuth } from "@/context/AuthContext";
import { Login } from "@/components/auth/Login";
import Preloader from "@/components/UI/Preloader";

const AuthGuard = ( { children } ) => {
  const { isAuthenticated, loading } = useAuth();
  
  if ( loading ) {
    return <Preloader overflow={ true } size={ 'l' }/>;
  }
  
  return !isAuthenticated ? <Login/> : children;
};

export default AuthGuard; 