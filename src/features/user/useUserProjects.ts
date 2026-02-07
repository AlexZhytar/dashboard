"use client";

import { useEffect, useState } from "react";
import { GetUserProjectsResponse } from "@/types/user";

export interface Project {
	id: number;
	project_name: string;
	// додай потрібні поля
}


export interface UseUserProjectsResult {
	userProjects: Project[] | null;
	loadingProjects: boolean;
}

export function useUserProjects( user_id: number | string | null ): UseUserProjectsResult {
	const [ userProjects, setUserProjects ] = useState<Project[] | null>(null);
	const [ loadingProjects, setLoadingProjects ] = useState<boolean>(true);
	
	useEffect(() => {
		if ( user_id == null ) {
			setUserProjects(null);
			setLoadingProjects(false);
			return;
		}
		
		const fetchProjects = async (): Promise<void> => {
			setLoadingProjects(true);
			
			try {
				const res = await fetch(`/api/user/get-projects?user_id=${ encodeURIComponent(String(user_id)) }`, {
					credentials: "include",
				});
				
				if ( res.status === 401 ) {
					setUserProjects(null);
					return;
				}
				
				if ( !res.ok ) {
					throw new Error(`Failed to fetch projects: ${ res.status }`);
				}
				
				const json = (await res.json()) as GetUserProjectsResponse;
				
				setUserProjects(json.data ?? null);
			} catch ( error ) {
				console.error("❌ fetch projects:", error);
				setUserProjects(null);
			} finally {
				setLoadingProjects(false);
			}
		};
		
		fetchProjects();
	}, [ user_id ]);
	
	return { userProjects, loadingProjects };
}
