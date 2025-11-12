import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    ( set, get ) => ({
      authorized: false,
      setAuthorized: ( authorized ) => set( { authorized } ),
      
      modalID: null,
      setModalID: ( modalID ) => set( { modalID } ),
      
      darkTheme: false,
      setDarkTheme: ( darkTheme ) => set( { darkTheme } ),
      
      user: null,
      hasFetched: false,
      isLoading: false,
      
      setUser: ( user ) => set( { user } ),
      setHasFetched: ( v ) => set( { hasFetched: v } ),
      setIsLoading: ( v ) => set( { isLoading: v } ),
      clearUser: () => set( { user: null, hasFetched: false, isLoading: false } ),
      
      team: [],
      setTeam: ( team ) => set( { team } ),
      
      authEverhour: false,
      setAuthEverhour: ( authEverhour ) => set( { authEverhour } ),
      
      authGoogle: false,
      setAuthGoogle: ( authGoogle ) => set( { authGoogle } ),
    }),
    {
      name: 'user-settings',
      partialize: ( state ) => ({
        user: state.user,
        darkTheme: state.darkTheme,
      }),
    }
  )
);
