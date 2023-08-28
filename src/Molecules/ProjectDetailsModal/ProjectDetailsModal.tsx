import React, { useState, useEffect } from "react";
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
  } = useUserStore();
  const [selectedUserToAdd, setSelectedUserToAdd] = useState<User | null>(null);

  const isProjectCreator = selectedProject?.creatorEmail === currentUser?.email;

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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* Left side */}
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
              {/* Right side */}
              <Box>
                {isProjectCreator && (
                  <Select
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
                  variant="contained"
                  color="primary"
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
