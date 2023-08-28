import React, { useState } from "react";
import { Project, User } from "../../userStore";
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
  project: Project | null;
  currentUser: User;
  allUsers: User[];
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  open,
  onClose,
  project,
  currentUser,
  allUsers,
}) => {
  const { assignUserToProject } = useUserStore();
  const [selectedUserToAdd, setSelectedUserToAdd] = useState<User | null>(null);

  const isProjectCreator = project?.creatorEmail === currentUser?.email;

  const handleAddUserToProject = () => {
    if (isProjectCreator && project && selectedUserToAdd) {
      assignUserToProject(project.id, selectedUserToAdd);
    }
  };

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
      {project && (
        <>
          <DialogTitle>{project.name}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* Left side */}
              <Box sx={{ display: "flex" }}>
                {project.assignedUsers.map((user) => (
                  <Chip
                    label={`${user.name} ${user.surname}`}
                    sx={{ color: "orange" }}
                  />
                ))}
              </Box>
              {/* Right side */}
              <Box>
                {isProjectCreator && (
                  <Select
                    displayEmpty
                    value={selectedUserToAdd?.email || ""}
                    onChange={(event) => {
                      const selectedUser = allUsers.find(
                        (user) => user.email === event.target.value
                      );
                      setSelectedUserToAdd(selectedUser || null);
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select User
                    </MenuItem>
                    {filteredUsers.map((user) => (
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
