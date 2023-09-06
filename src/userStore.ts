import { create } from "zustand";

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: number;
  country: string;
  ocupation: string;
  roles: string[];
  userCapacity: number;
}
export interface Project {
  id: string;
  name: string;
  assignedUsers: User[];
  creatorEmail: string;
  projectCapacity: number;
  totalUserCapacity: number;
}
interface UserStore {
  users: User[];
  loggedInUser: User | null;
  projects: Project[];
  addUser: (user: User) => void;
  setLoggedInUser: (user: User | null) => void;
  addProject: (project: Project) => void;
  assignUserToProject: (projectId: string, user: User) => void;
  removeUserFromProject: (projectId: string, user: User) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  setProjectCapacity: (projectId: string, capacity: number) => void;
}

const useUserStore = create<UserStore>()((set) => ({
  selectedProject: null,
  users: [],
  loggedInUser: null,
  projects: [],

  setProjectCapacity: (projectId: string, capacity: number) =>
    set((state) => {
      const updatedProjects = state.projects.map((project) =>
        project.id === projectId
          ? { ...project, projectCapacity: capacity }
          : project
      );
      return { projects: updatedProjects };
    }),

  setSelectedProject: (project) => {
    set({ selectedProject: project });
  },

  addProject: (project) => {
    const userCapacityTotal = project.assignedUsers.reduce(
      (sum, user) => sum + user.userCapacity,
      0
    );
    const updatedProject = {
      ...project,
      totalUserCapacity: userCapacityTotal,
      projectCapacity: 100,
    };
    set((state) => ({
      projects: [...state.projects, updatedProject],
    }));
  },

  assignUserToProject: (projectId, user) =>
    set((state) => {
      const updatedProjects = state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              assignedUsers: [...project.assignedUsers, user],
              totalUserCapacity:
                project.totalUserCapacity + Number(user.userCapacity),
            }
          : project
      );

      return { projects: updatedProjects };
    }),

  removeUserFromProject: (projectId, user) =>
    set((state) => {
      const updatedProjects = state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              assignedUsers: project.assignedUsers.filter(
                (assignedUser) => assignedUser.email !== user.email
              ),
              totalUserCapacity: project.totalUserCapacity - user.userCapacity,
            }
          : project
      );

      return { projects: updatedProjects };
    }),

  addUser: (user) => {
    const roles = ["User"];
    const updatedUser = { ...user, roles, userCapacity: 80 };

    set((state) => ({
      users: [...state.users, updatedUser],
    }));

    localStorage.setItem(
      "users",
      JSON.stringify([...useUserStore.getState().users, updatedUser])
    );
  },

  setLoggedInUser: (user) => {
    set({ loggedInUser: user });
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  },
}));

export default useUserStore;
