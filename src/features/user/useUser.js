"use client";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export function useUser() {
  const { user, hasFetched, isLoading, setUser, setHasFetched, setIsLoading } = useUserStore();
  
  useEffect( () => {
    if ( hasFetched || isLoading ) return;
    
    const fetchUser = async () => {
      try {
        setIsLoading( true );
        const res = await fetch( "/api/user/get-user" );
        
        if ( res.status === 401 ) {
          setUser( null );
          return;
        }
        if ( !res.ok ) throw new Error( "Failed to fetch user" );
        
        const json = await res.json();
        setUser( json.data ?? json ?? null );
      } catch (e) {
        console.error( "❌ fetch user:", e );
        setUser( null );
      } finally {
        setHasFetched( true );
        setIsLoading( false );
      }
    };
    
    fetchUser();
  }, [hasFetched, isLoading, setHasFetched, setIsLoading, setUser] );
  
  return { user, isLoading, hasFetched };
}
