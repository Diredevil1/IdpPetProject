import React from "react";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import Header from "../../Molecules/Header/Header";

import useUserStore from "../../userStore";

const WorkSpace: React.FC = () => {
  const user = useUserStore((state) => state.loggedInUser);
  return (
    <Box sx={{ height: "100vh" }}>
      <Header user={user} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default WorkSpace;
