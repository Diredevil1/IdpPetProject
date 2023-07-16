import { Project } from "../../userStore";
import { Dialog, DialogTitle, DialogContent, Chip, Box } from "@mui/material";

interface ProjectDetailsModalProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  open,
  onClose,
  project,
}) => {
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
            <Box>
              {project.assignedUsers.map((user) => (
                <Chip
                  label={`${user.name} ${user.surname}`}
                  sx={{ color: "orange" }}
                />
              ))}
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default ProjectDetailsModal;
