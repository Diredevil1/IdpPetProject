import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import useUserStore from "./userStore.ts";

const storedUsersData = localStorage.getItem("users");
const initialUsersData = storedUsersData ? JSON.parse(storedUsersData) : [];
useUserStore.setState({ users: initialUsersData });

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
