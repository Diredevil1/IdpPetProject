import React from "react";
import { Box, Typography, Button, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import useUserStore from "../../userStore";
import { useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { User } from "../../userStore";

interface ComponentProps {
  user: User | null;
}

const Header: React.FC<ComponentProps> = ({ user }) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = useUserStore((state) => state.setLoggedInUser);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(null);
    navigate("/");
  };

  return (
    <Box
      sx={{
        color: "#adb5bd",
        backgroundColor: "#30324e",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "8px 16px",
        boxShadow: "0px 4px 6px -4px rgba(9, 11, 25, 0.5);",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ mr: "6px" }}>Welcome!</Typography>
        <Typography
          sx={{
            fontFamily:
              "Poppins, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif !important",
            fontWeight: "700",
          }}
        >
          {`${capitalizeFirstLetter(`${user?.name}`)} ${capitalizeFirstLetter(
            `${user?.surname}`
          )}`}
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NotificationsNoneOutlinedIcon />
          <Button onClick={handleOpenClick}>
            <Avatar
              sx={{ height: "30px", width: "30px", fontSize: "14px" }}
            >{`${user?.name.charAt(0)}${user?.surname.charAt(0)}`}</Avatar>
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
