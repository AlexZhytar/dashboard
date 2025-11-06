"use client";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export function useUser() {
  const { setUser, user } = useUserStore();
  
  useEffect( () => {
    if ( user.length > 0 ) return;
    const getUser = async () => {
      try {
        const res = await fetch( `/api/user/get-user` );
        const data = await res.json();
        setUser( data.user );
      } catch (error) {
        console.error( 'Error fetching user data: ', error );
      }
    };
    
    getUser();
  }, [] );
}