import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PropsCard } from "@/components/projects/types";

type Project = PropsCard;

const defaultFilters = {
	links: true,
	pm: true,
	hours: true,
	todo: true,
};

function isSameProject( a: any, b: any ) {
	if ( a === b ) return true;
	if ( !a || !b ) return false;
	if ( a.id !== b.id ) return false;
	
	// shallow compare (достатньо для API → UI)
	const aKeys = Object.keys(a);
	const bKeys = Object.keys(b);
	
	if ( aKeys.length !== bKeys.length ) return false;
	
	for ( const key of aKeys ) {
		if ( a[key] !== b[key] ) return false;
	}
	
	return true;
}

type State = {
	projects: Project[];
	projectOrder: string[];
	filters: typeof defaultFilters;
	
	activeProjectId: string | null;
	setActiveProjectId: ( id: string | null ) => void;
	
	hasHydrated: boolean;
	isSearchActive: boolean;
	
	loading: boolean;
	error: string | null;
	lastFetchedAt: number | null;
	
	pmUserIds: string[];                 // вибрані PM (IDs)
	setPmUserIds: ( ids: string[] ) => void;
	togglePmUserId: ( id: string ) => void;
	resetPmUsers: () => void;
	
	setHasHydrated: ( v: boolean ) => void;
	setSearchActive: ( v: boolean ) => void;
	
	setProjects: ( incoming: Project[] ) => void;
	getOrderedProjects: () => Project[];
	mergeProjects: ( incoming: Project[] ) => void;
	setProjectOrder: ( ids: string[] ) => void;
	reorderProjects: ( orderedIds: string[] ) => void;
	
	fetchProjects: () => Promise<void>;
	
	setFilter: ( key: keyof typeof defaultFilters, value: boolean ) => void;
	toggleFilter: ( key: keyof typeof defaultFilters ) => void;
	setAllFilters: ( value: boolean ) => void;
	resetFilters: () => void;
};

export const useProjectsStore = create<State>()(
	persist(
		( set, get ) => ({
			projects: [],
			projectOrder: [],
			filters: { ...defaultFilters },
			
			activeProjectId: null,
			setActiveProjectId: ( id ) => set({ activeProjectId: id }),
			
			hasHydrated: false,
			isSearchActive: false,
			
			loading: false,
			error: null,
			lastFetchedAt: null,
			pmUserIds: [],
			setPmUserIds: ( ids ) => set({ pmUserIds: ids.map(String) }),
			togglePmUserId: ( id ) =>
				set(( state ) => {
					const sid = String(id);
					return state.pmUserIds.includes(sid)
						? { pmUserIds: state.pmUserIds.filter(( x ) => x !== sid) }
						: { pmUserIds: [ ...state.pmUserIds, sid ] };
				}),
			resetPmUsers: () => set({ pmUserIds: [] }),
			
			setHasHydrated: ( value ) => set({ hasHydrated: value }),
			setSearchActive: ( value ) => set({ isSearchActive: value }),
			
			setProjectOrder: ( ids ) => set({ projectOrder: ids }),
			
			reorderProjects: ( orderedIds ) => {
				set({ projectOrder: orderedIds });
			},
			
			setProjects: ( incoming ) => {
				// 1) оновили дані
				set({ projects: incoming });
				
				const incomingIds = new Set(incoming.map(p => String(p.id)));
				const currentOrder = get().projectOrder || [];
				
				const cleanedOrder = currentOrder.filter(id => incomingIds.has(id));
				const newIds = incoming
					.map(p => String(p.id))
					.filter(id => !cleanedOrder.includes(id));
				
				const nextOrder = [ ...cleanedOrder, ...newIds ];
				
				if ( nextOrder.length !== currentOrder.length || nextOrder.some(( id, i ) => id !== currentOrder[i]) ) {
					set({ projectOrder: nextOrder });
				}
			},
			
			getOrderedProjects: () => {
				const { projects, projectOrder } = get();
				const byId = new Map(projects.map(p => [ p.id, p ]));
				
				const ordered = (projectOrder || [])
					.map(id => byId.get(id))
					.filter(Boolean) as Project[];
				
				const rest = projects.filter(p => !(projectOrder || []).includes(p.id));
				
				return [ ...ordered, ...rest ];
			},
			
			// merge за id: оновлює існуючі + додає нові
			mergeProjects: ( incoming ) => {
				const incomingIds = new Set(incoming.map(p => p.id));
				const current = get().projects || [];
				
				// оновлення/додавання
				const map = new Map(current.map(p => [ p.id, p ]));
				for ( const p of incoming ) map.set(p.id, p);
				
				// видалення тих, яких нема на сервері
				const merged = Array.from(map.values()).filter(p => incomingIds.has(p.id));
				
				set({ projects: merged });
			},
			
			fetchProjects: async () => {
				const { loading } = get();
				if ( loading ) return;
				
				set({ loading: true, error: null });
				
				try {
					const res = await fetch("/api/projects/get-projects", { cache: "no-store" });
					
					if ( res.status === 401 ) {
						set({ loading: false });
						return;
					}
					if ( !res.ok ) throw new Error("Failed to fetch projects");
					
					const json = await res.json();
					const incoming: Project[] =
						Array.isArray(json.data)
							? json.data
							: Array.isArray(json.data?.projects)
								? json.data.projects
								: [];
					
					// якщо хочеш завжди перезаписувати — викликай setProjects(incoming)
					get().setProjects(incoming);
					
					set({ lastFetchedAt: Date.now() });
				} catch ( e: any ) {
					set({ error: e?.message || "Fetch error" });
					console.error("❌ fetch projects:", e);
				} finally {
					set({ loading: false });
				}
			},
			
			setFilter: ( key, value ) =>
				set(( state ) => ({ filters: { ...state.filters, [key]: value } })),
			
			toggleFilter: ( key ) =>
				set(( state ) => ({ filters: { ...state.filters, [key]: !state.filters[key] } })),
			
			setAllFilters: ( value ) =>
				set({ filters: { links: value, pm: value, hours: value, todo: value } }),
			
			resetFilters: () => set({ filters: { ...defaultFilters } }),
		}),
		{
			name: "project-data-storage",
			partialize: ( state ) => ({
				filters: state.filters,
				projectOrder: state.projectOrder,
				pmUserIds: state.pmUserIds,
			}),
			onRehydrateStorage: () => ( state ) => {
				state?.setHasHydrated(true);
			},
		}
	)
);
