"use client";
import { useEffect, useState } from "react";

export function useUserProjects( user_id ) {
  const [userProjects, setUserProjects] = useState( null );
  const [loadingProjects, setLoadingProjects] = useState( true );
  
  useEffect( () => {
    const fetchProjects = async () => {
      setLoadingProjects( true );
      try {
        const res = await fetch( `/api/user/get-projects` );
        
        if ( res.status === 401 ) {
          setUserProjects( null );
          return;
        }
        if ( !res.ok ) throw new Error( "Failed to fetch user" );
        
        const data = await res.json();
        setUserProjects( data ?? null );
      } catch (e) {
        console.error( "❌ fetch user:", e );
        setUserProjects( null );
      } finally {
        setLoadingProjects( false );
      }
    };
    
    fetchProjects();
  }, [] );
  
  return { userProjects, loadingProjects };
}
