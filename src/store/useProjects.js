import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import isEqual from 'lodash.isequal';

export const useProjectsStore = create(
    persist(
        (set, get) => ({
            projectData: {
                projectsHead: [],
                projects: [],
            },
            hasHydrated: false,
            isSearchActive: false,
            setHasHydrated: (value) => set({ hasHydrated: value }),

            setSearchActive: (value) => set({ isSearchActive: value }),

            setProjectData: (data) => {
                const current = get().projectData;
                const isSame = isEqual(current, data);
                if (isSame) return;

                set(() => ({
                    projectData: {
                        projectsHead: data.projectsHead || [],
                        projects: data.projects || [],
                    }
                }));
            },

            updateProjectHead: (newHead) =>
                set((state) => ({
                    projectData: {
                        ...state.projectData,
                        projectsHead: newHead
                    }
                })),

            updateProjects: (newProjects) =>
                set((state) => ({
                    projectData: {
                        ...state.projectData,
                        projects: newProjects
                    }
                })),

            reorderProjects: (orderedIds) =>
                set((state) => {
                    const reorderedCards = orderedIds
                        .map((id) => state.projectData.projects.find((card) => card.id === id))
                        .filter(Boolean);

                    return {
                        projectData: {
                            ...state.projectData,
                            projects: reorderedCards
                        }
                    };
                }),



            updateToDo: (newToDo) =>
                set((state) => ({
                    projectData: {
                        ...state.projectData,
                        toDo: newToDo
                    }
                })),

            addToDo: (task) =>
                set((state) => ({
                    projectData: {
                        ...state.projectData,
                        toDo: [...state.projectData.toDo, task]
                    }
                })),

            syncProjectsWithDefault: (defaultProjects) => {
                const currentProjects = get().projectData.projects || [];
                const currentMap = new Map(currentProjects.map((p) => [p.id, p]));
                let updated = false;
                const mergedProjects = [...currentProjects];

                defaultProjects.forEach((def) => {
                    const exist = currentMap.get(def.id);
                    if (!exist) {
                        mergedProjects.push(def);
                        updated = true;
                    } else {
                        const keysToCheck = ['label', 'color', 'confirmed_hours', 'months_hours', 'tracked_hours', 'deadline_at', 'manager', 'links'];
                        let changed = false;
                        for (const key of keysToCheck) {
                            if (JSON.stringify(exist[key]) !== JSON.stringify(def[key])) {
                                changed = true;
                                break;
                            }
                        }
                        if (changed) {
                            const idx = mergedProjects.findIndex((p) => p.id === def.id);
                            mergedProjects[idx] = def;
                            updated = true;
                        }
                    }
                });

                if (updated) {
                    set((state) => ({
                        projectData: {
                            ...state.projectData,
                            projects: mergedProjects
                        }
                    }));
                }
            }
        }),
        {
            name: 'project-data-storage',
            partialize: (state) => ({
                projectData: state.projectData
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }

        }
    )
);