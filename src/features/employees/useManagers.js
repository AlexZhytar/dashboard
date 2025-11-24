import { useEffect, useState } from "react";

export function useManagers() {
  const [managers, setManagers] = useState( [] );
  const [loadManagers, setLoadManagers] = useState( false );
  
  useEffect( () => {
    setLoadManagers( true );
    const fetchManagers = async () => {
      try {
        const res = await fetch( "/api/employees/get-managers" );
        
        if ( res.status === 401 ) {
          return;
        }
        if ( !res.ok ) throw new Error( "Failed to fetch user" );
        
        const data = await res.json();
        setManagers( data.data );
        setLoadManagers( false )
        
      } catch (e) {
        console.error( "❌ fetch user:", e );
        
      } finally {
        setLoadManagers( false )
      }
    };
    
    fetchManagers();
  }, [] );
  
  return { managers, loadManagers };
}