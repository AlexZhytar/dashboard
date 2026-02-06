import { useEffect } from "react";
import { useProjectsStore } from "@/store";

export function useProjects() {
	const projects = useProjectsStore(( s ) => s.projects);
	const loading = useProjectsStore(( s ) => s.loading);
	const error = useProjectsStore(( s ) => s.error);
	const hasHydrated = useProjectsStore(( s ) => s.hasHydrated);
	const fetchProjects = useProjectsStore(( s ) => s.fetchProjects);
	
	useEffect(() => {
		if ( !hasHydrated ) return;
		fetchProjects();
	}, [ hasHydrated, fetchProjects ]);
	
	return { projects, loading, error };
}
