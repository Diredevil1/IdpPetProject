import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useUserStore from "../../userStore";
import { Project } from "../../userStore";

import ProjectDetailsModal from "../../Molecules/ProjectDetailsModal/ProjectDetailsModal";

import {
  Box,
  Typography,
  Paper,
  Tab,
  Tabs,
  Button,
  TextField,
} from "@mui/material";

const ProjectPlanner: React.FC = () => {
  const { addProject, projects, loggedInUser, users, setSelectedProject } =
    useUserStore();

  const [tab, setTab] = useState<number>(0);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const tabs = ["Projects", "Overview", "Something Else"];

  const isGlobalAdmin = loggedInUser?.roles.includes("Global admin");

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProject(null);
  };

  const handleInputVisible = () => {
    setInputVisible(true);
  };
  const handleNewProject = () => {
    if (projectName!.trim() === "") {
      setErrorMessage("Project name cannot be empty.");
      return;
    }

    const newProject: Project = {
      id: uuidv4(),
      name: projectName!,
      assignedUsers: [loggedInUser!],
      creatorEmail: loggedInUser!.email,
      projectCapacity: 0,
      totalUserCapacity: 0,
    };

    addProject(newProject);
    setInputVisible(false);
    setProjectName("");
    setErrorMessage("");
  };

  const handleTabChange = (e: React.SyntheticEvent, newTab: number) => {
    e.defaultPrevented;
    setTab(newTab);
  };

  const relevantProjects = projects.filter(
    (project) =>
      loggedInUser?.roles.includes("Global admin") ||
      project.assignedUsers.some((user) => user.email === loggedInUser?.email)
  );

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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ p: 2, fontSize: "2rem" }}>WorkSpace</Typography>
        {errorMessage && (
          <Typography color="error" sx={{ ml: "10.5rem", mb: "0.5rem" }}>
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {isGlobalAdmin && (
            <Button
              onClick={handleInputVisible}
              color="warning"
              sx={{ width: "135px", ml: "1rem", mb: "0.5rem" }}
            >
              New project +
            </Button>
          )}

          {inputVisible && (
            <Box>
              <TextField
                onChange={(e) => setProjectName(e.target.value)}
                autoComplete="off"
                color="warning"
                variant="outlined"
                size="small"
                sx={{ input: { color: "#adb5bd" } }}
              />
              <Button color="warning" onClick={handleNewProject}>
                Confirm
              </Button>
              <Button onClick={() => setInputVisible(false)}>Cancel</Button>
            </Box>
          )}
        </Box>
      </Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        aria-label="WorkSpace"
        sx={{ ml: 1 }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} sx={{ color: "#adb5bd" }} label={tab} />
        ))}
      </Tabs>
      <Box>
        {tab === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "info",
            }}
          >
            {[
              relevantProjects.length > 0 ? (
                relevantProjects.map((project) => (
                  <Box
                    key={project.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      cursor: "pointer",
                      transition: "0.2s",
                      "&:hover": {
                        backgroundColor: "#264653",
                        color: "#81c784",
                        fontWeight: "bold",
                        transform: "scale(1.02)",
                        transition: "0.2s",
                      },
                      mt: 1,
                      p: 3,
                    }}
                    onClick={() => handleProjectClick(project)}
                  >
                    <Typography sx={{ color: "#81c784" }} variant="h5">
                      {project.name}
                    </Typography>
                    {project.assignedUsers
                      .filter((user) => user.email === project.creatorEmail)
                      .map((user) => (
                        <Typography key={user.email}>
                          Creator: {user.name}
                        </Typography>
                      ))}
                  </Box>
                ))
              ) : (
                <Typography sx={{ ml: 3, mt: 3, mb: 3, color: "orange" }}>
                  You are not assigned to any of the projects
                </Typography>
              ),
            ]}
            <ProjectDetailsModal
              open={openModal}
              onClose={handleCloseModal}
              currentUser={loggedInUser!}
              allUsers={users}
            />
          </Box>
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
