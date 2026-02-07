import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

export type ModalID = string | null;

type UserStoreState = {
	authorized: boolean;
	setAuthorized: ( authorized: boolean ) => void;
	
	modalID: ModalID;
	setModalID: ( modalID: ModalID ) => void;
	
	darkTheme: boolean;
	setDarkTheme: ( darkTheme: boolean ) => void;
	
	user: User | null;
	hasFetched: boolean;
	isLoading: boolean;
	
	setUser: ( user: User | null ) => void;
	setHasFetched: ( v: boolean ) => void;
	setIsLoading: ( v: boolean ) => void;
	clearUser: () => void;
	
	pmID: number | null;
	setPmID: ( pmID: number ) => void;
};

export const useUserStore = create<UserStoreState>()(
	persist(
		( set, get ) => ({
			authorized: false,
			setAuthorized: ( authorized ) => set({ authorized }),
			
			modalID: null,
			setModalID: ( modalID ) => set({ modalID }),
			
			darkTheme: false,
			setDarkTheme: ( darkTheme ) => set({ darkTheme }),
			
			user: null,
			hasFetched: false,
			isLoading: false,
			
			setUser: ( user ) => set({ user }),
			setHasFetched: ( v ) => set({ hasFetched: v }),
			setIsLoading: ( v ) => set({ isLoading: v }),
			clearUser: () => set({ user: null, hasFetched: false, isLoading: false }),
			
			pmID: null,
			setPmID: ( pmID ) => set({ pmID }),
		}),
		{
			name: "user-settings",
			partialize: ( state ) => ({
				user: state.user,
				darkTheme: state.darkTheme,
			}),
		}
	)
);
