import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import useUserStore from "./userStore.ts";

const storedUsersData = localStorage.getItem("users");
const initialUsersData = storedUsersData ? JSON.parse(storedUsersData) : [];
const globalUser = {
  country: "USA",
  ocupation: "Talent",
  name: "Žygimantas",
  surname: "Mejaras",
  phoneNumber: 860386521,
  password: "Kierihenri12",
  email: "mejaras@gmail.com",
  roles: ["Global admin"],
};
const mergedUsers = [globalUser, ...initialUsersData];
useUserStore.setState({ users: mergedUsers });

const storedLoggedInUserData = localStorage.getItem("loggedInUser");
const initialLoggedInUser = storedLoggedInUserData
  ? JSON.parse(storedLoggedInUserData)
  : null;
useUserStore.setState({ loggedInUser: initialLoggedInUser });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
