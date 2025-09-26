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
                }))
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