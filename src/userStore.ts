import { create } from "zustand";

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: number;
  country: string;
  ocupation: string;
}
export interface Project {
  id: string;
  name: string;
  assignedUsers: User[];
}
interface UserStore {
  users: User[];
  loggedInUser: User | null;
  projects: Project[];
  addUser: (user: User) => void;
  setLoggedInUser: (user: User | null) => void;
  addProject: (project: Project) => void;
  assignUserToProject: (projectId: string, user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  loggedInUser: null,
  projects: [],

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  assignUserToProject: (projectId, user) =>
    set((state) => {
      const updatedProjects = state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              assignedUsers: [...project.assignedUsers, user],
            }
          : project
      );

      return { projects: updatedProjects };
    }),

  addUser: (user) => {
    set((state) => ({
      users: [...state.users, user],
    }));
  },

  setLoggedInUser: (user) => {
    set({ loggedInUser: user });
  },
}));

export default useUserStore;
