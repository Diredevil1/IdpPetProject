import { create } from "zustand";

interface Role {
  name: string;
}

interface RolesState {
  roles: Role[];
}

const useRolesStore = create<RolesState>(() => ({
  roles: [
    {
      name: "Global admin",
    },
    {
      name: "Team lead",
    },
    {
      name: "User",
    },
  ],
}));

export default useRolesStore;
