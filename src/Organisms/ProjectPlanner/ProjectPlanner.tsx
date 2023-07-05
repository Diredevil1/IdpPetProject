import React, { useState } from "react";
import { Box, Typography, Paper, Tab, Tabs } from "@mui/material";

const ProjectPlanner: React.FC = () => {
  const [tab, setTab] = useState<number>(0);

  const handleTabChange = (e: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };
  return (
    <Paper
      elevation={0}
      sx={{
        mt: "1rem",
        backgroundColor: "#30324e",
        color: "#adb5bd",
        height: "100%",
        width: "80%",
      }}
    >
      <Typography sx={{ p: 2, fontSize: "2rem" }}>WorkSpace</Typography>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        aria-label="WorkSpace"
        sx={{ ml: 1 }}
      >
        {["Projects", "Overview", "Something Else"].map((tab) => (
          <Tab sx={{ color: "#adb5bd" }} label={tab} />
        ))}
      </Tabs>
      <Box>
        {tab === 0 ? (
          <Box>Projects</Box>
        ) : tab === 1 ? (
          <Box>Overview</Box>
        ) : (
          tab === 2 && <Box>Something else</Box>
        )}
      </Box>
    </Paper>
  );
};
export default ProjectPlanner;
