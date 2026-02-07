import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Project, PropsCard } from "@/types/project";

const defaultFilters = {
	links: true,
	pm: true,
	hours: true,
	todo: true,
};

const toId = ( v: unknown ): number => Number(v);

const normalizeProjects = ( incoming: PropsCard[] ): Project[] =>
	incoming
		.map(( p ) => ({ ...p, id: toId(p.id) }))
		.filter(( p ) => Number.isFinite(p.id));

type State = {
	projects: Project[];
	projectOrder: number[];
	filters: typeof defaultFilters;
	
	activeProjectId: number | null;
	setActiveProjectId: ( id: number | null ) => void;
	
	hasHydrated: boolean;
	isSearchActive: boolean;
	
	loading: boolean;
	error: string | null;
	lastFetchedAt: number | null;
	
	pmUserIds: number[];
	setPmUserIds: ( ids: Array<number | string> ) => void;
	togglePmUserId: ( id: number | string ) => void;
	resetPmUsers: () => void;
	
	setHasHydrated: ( v: boolean ) => void;
	setSearchActive: ( v: boolean ) => void;
	
	setProjects: ( incoming: PropsCard[] ) => void;
	getOrderedProjects: () => Project[];
	mergeProjects: ( incoming: PropsCard[] ) => void;
	
	setProjectOrder: ( ids: Array<number | string> ) => void;
	reorderProjects: ( orderedIds: Array<number | string> ) => void;
	
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
			setActiveProjectId: ( id ) =>
				set({ activeProjectId: id === null ? null : toId(id) }),
			
			hasHydrated: false,
			isSearchActive: false,
			
			loading: false,
			error: null,
			lastFetchedAt: null,
			
			pmUserIds: [],
			setPmUserIds: ( ids ) => set({ pmUserIds: ids.map(toId) }),
			togglePmUserId: ( id ) =>
				set(( state ) => {
					const sid = toId(id);
					return state.pmUserIds.includes(sid)
						? { pmUserIds: state.pmUserIds.filter(( x ) => x !== sid) }
						: { pmUserIds: [ ...state.pmUserIds, sid ] };
				}),
			resetPmUsers: () => set({ pmUserIds: [] }),
			
			setHasHydrated: ( value ) => set({ hasHydrated: value }),
			setSearchActive: ( value ) => set({ isSearchActive: value }),
			
			setProjectOrder: ( ids ) => set({ projectOrder: ids.map(toId) }),
			
			reorderProjects: ( orderedIds ) => {
				set({ projectOrder: orderedIds.map(toId) });
			},
			
			setProjects: ( incomingRaw ) => {
				const incoming = normalizeProjects(incomingRaw);
				
				set({ projects: incoming });
				
				const incomingIds = new Set(incoming.map(( p ) => p.id));
				const currentOrder = get().projectOrder || [];
				
				const cleanedOrder = currentOrder.filter(( id ) => incomingIds.has(id));
				const newIds = incoming.map(( p ) => p.id).filter(( id ) => !cleanedOrder.includes(id));
				
				const nextOrder = [ ...cleanedOrder, ...newIds ];
				
				if (
					nextOrder.length !== currentOrder.length ||
					nextOrder.some(( id, i ) => id !== currentOrder[i])
				) {
					set({ projectOrder: nextOrder });
				}
			},
			
			getOrderedProjects: () => {
				const { projects, projectOrder } = get();
				const byId = new Map<number, Project>(projects.map(( p ) => [ p.id, p ]));
				
				const ordered = (projectOrder || [])
					.map(( id ) => byId.get(id))
					.filter(Boolean) as Project[];
				
				const rest = projects.filter(( p ) => !(projectOrder || []).includes(p.id));
				
				return [ ...ordered, ...rest ];
			},
			
			mergeProjects: ( incomingRaw ) => {
				const incoming = normalizeProjects(incomingRaw);
				const incomingIds = new Set(incoming.map(( p ) => p.id));
				
				const current = get().projects || [];
				const map = new Map<number, Project>(current.map(( p ) => [ p.id, p ]));
				
				for ( const p of incoming ) map.set(p.id, p);
				
				const merged = Array.from(map.values()).filter(( p ) => incomingIds.has(p.id));
				
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
					const raw: PropsCard[] =
						Array.isArray(json.data)
							? json.data
							: Array.isArray(json.data?.projects)
								? json.data.projects
								: [];
					
					get().setProjects(raw);
					
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
