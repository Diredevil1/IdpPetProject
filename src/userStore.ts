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

interface UserStore {
  users: User[];
  loggedInUser: User | null;
  addUser: (user: User) => void;
  setLoggedInUser: (user: User | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  loggedInUser: null,

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
