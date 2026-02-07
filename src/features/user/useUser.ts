"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import type { GetUserResponse, User } from "@/types/user";

export interface UseUserResult {
	user: User | null;
	isLoading: boolean;
	hasFetched: boolean;
}

export function useUser(): UseUserResult {
	const {
		user,
		hasFetched,
		isLoading,
		setUser,
		setHasFetched,
		setIsLoading,
	} = useUserStore();
	
	useEffect(() => {
		if ( hasFetched || isLoading ) return;
		
		const fetchUser = async (): Promise<void> => {
			try {
				setIsLoading(true);
				
				const res = await fetch("/api/user/get-user", {
					credentials: "include",
				});
				
				// Неавторизований користувач
				if ( res.status === 401 ) {
					setUser(null);
					return;
				}
				
				if ( !res.ok ) {
					throw new Error(`Failed to fetch user: ${ res.status }`);
				}
				
				const json = (await res.json()) as GetUserResponse;
				const userData: User | null = json.data;
				
				setUser(userData);
			} catch ( error ) {
				console.error("❌ fetch user:", error);
				setUser(null);
			} finally {
				setHasFetched(true);
				setIsLoading(false);
			}
		};
		
		fetchUser();
	}, [
		hasFetched,
		isLoading,
		setUser,
		setHasFetched,
		setIsLoading,
	]);
	
	return {
		user,
		isLoading,
		hasFetched,
	};
}
