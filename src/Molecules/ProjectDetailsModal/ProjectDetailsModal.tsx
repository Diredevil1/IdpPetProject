import React, { useState, useEffect } from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { User } from "../../userStore";
import useUserStore from "../../userStore";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  Box,
  Select,
  MenuItem,
  Button,
  Typography,
  TextField,
} from "@mui/material";

interface ProjectDetailsModalProps {
  open: boolean;
  onClose: () => void;
  currentUser: User;
  allUsers: User[];
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  open,
  onClose,
  currentUser,
  allUsers,
}) => {
  const {
    assignUserToProject,
    selectedProject,
    setSelectedProject,
    projects,
    removeUserFromProject,
    setProjectCapacity,
  } = useUserStore();
  const [selectedUserToAdd, setSelectedUserToAdd] = useState<User | null>(null);
  const [capacityInputValue, setCapacityInputValue] = useState<string | null>();

  const isProjectCreator = selectedProject?.creatorEmail === currentUser?.email;

  const handleCapacityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCapacityInputValue(e.target.value);
  };

  const handleProjectCapacity = (capacity: number) => {
    if (isProjectCreator && selectedProject) {
      setProjectCapacity(selectedProject.id, capacity);
    }
    setCapacityInputValue("");
  };

  const handleAddUserToProject = () => {
    if (isProjectCreator && selectedProject && selectedUserToAdd) {
      assignUserToProject(selectedProject.id, selectedUserToAdd);
    }
  };

  const handleDeleteUser = (userToDelete: User) => {
    if (
      selectedProject &&
      userToDelete.email !== selectedProject.creatorEmail
    ) {
      removeUserFromProject(selectedProject.id, userToDelete); // Use the removeUserFromProject method
    }
  };

  useEffect(() => {
    const updatedProject = projects.find(
      (project) => project.id === selectedProject?.id
    );
    setSelectedProject(updatedProject || null);
  }, [projects]);

  const filteredUsers = allUsers.filter(
    (user) => user.email !== currentUser.email
  );

  const normalize = (value: number) =>
    (value * 100) / selectedProject?.projectCapacity!;

  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "50%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="orange">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Dialog
      fullScreen
      sx={{
        "& .MuiPaper-root": {
          height: "90%",
          width: "90%",
          backgroundColor: "#30324e",
          color: "#adb5bd",
        },
      }}
      open={open}
      onClose={onClose}
    >
      {selectedProject && (
        <>
          <DialogTitle>{selectedProject.name}</DialogTitle>
          <DialogContent>
            <Typography>Project Capacity</Typography>
            {isProjectCreator && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  value={capacityInputValue}
                  onChange={handleCapacityInput}
                  autoComplete="off"
                  color="warning"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2, mb: 2, input: { color: "#adb5bd" } }}
                />
                <Button
                  onClick={() =>
                    handleProjectCapacity(Number(capacityInputValue))
                  }
                >
                  Save
                </Button>
              </Box>
            )}
            <Box sx={{ display: "flex" }}>
              <Typography>Hours required:</Typography>
              <Typography sx={{ ml: "10px", mr: "2px", color: "#e56b6f" }}>
                {selectedProject?.totalUserCapacity}/
                {selectedProject.projectCapacity}
              </Typography>
              <Typography>h</Typography>
            </Box>

            <LinearProgressWithLabel
              value={normalize(selectedProject?.totalUserCapacity)}
              sx={{ height: "10px", borderRadius: "12px" }}
            />
            <Typography sx={{ mt: 2 }}>Users:</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex" }}>
                {selectedProject.assignedUsers.map((user) => (
                  <Chip
                    onDelete={() => handleDeleteUser(user)}
                    key={user.email}
                    label={`${user.name} ${user.surname}`}
                    sx={{ color: "orange" }}
                  />
                ))}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {isProjectCreator && (
                  <Select
                    size="small"
                    color="warning"
                    sx={{ color: "#adb5bd" }}
                    value={selectedUserToAdd?.email || ""}
                    onChange={(event) => {
                      const selectedUser = allUsers.find(
                        (user) => user.email === event.target.value
                      );
                      setSelectedUserToAdd(selectedUser || null);
                    }}
                  >
                    {filteredUsers
                      .filter(
                        (user) =>
                          !selectedProject?.assignedUsers.some(
                            (u) => u.email === user.email
                          )
                      )
                      .map((user) => (
                        <MenuItem key={user.email} value={user.email}>
                          {`${user.name} ${user.surname}`}
                        </MenuItem>
                      ))}
                  </Select>
                )}
                <Button
                  sx={{ ml: 1 }}
                  variant="outlined"
                  color="warning"
                  onClick={handleAddUserToProject}
                >
                  Add User
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default ProjectDetailsModal;
