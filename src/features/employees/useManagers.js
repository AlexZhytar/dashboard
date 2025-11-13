import { useEffect, useState } from "react";

export function useManagers() {
  const [managers, setManagers] = useState( [] );
  
  useEffect( () => {
    const fetchManagers = async () => {
      try {
        const res = await fetch( "/api/user/get-user" );
        
        if ( res.status === 401 ) {
          return;
        }
        if ( !res.ok ) throw new Error( "Failed to fetch user" );
        
        const data = await res.json();
        setManagers( data );
        
      } catch (e) {
        console.error( "❌ fetch user:", e );
        
      } finally {
      
      }
    };
    
    fetchManagers();
  }, [] );
  
  return { managers };
}