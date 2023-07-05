import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Molecules/Login/Login";
import Register from "./Organisms/Register/Register";
import WorkSpace from "./Organisms/WorkSpace/WorkSpace";
import Profile from "./Molecules/Profile/Profile";
import ProjectPlanner from "./Organisms/ProjectPlanner/ProjectPlanner";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/WorkSpace/*" element={<WorkSpace />}>
            <Route path="" element={<ProjectPlanner />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
