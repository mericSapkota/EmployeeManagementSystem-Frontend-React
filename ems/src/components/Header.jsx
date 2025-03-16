import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../service/ImageService";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ userDetails, setUserDetails }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const image = userDetails.image;
  const processedImage = getImage(image);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const goToPage = (path) => {
    navigate(path);
  };

  const logout = () => {
    localStorage.removeItem("userDetails");
    setUserDetails({});
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="d-flex justify-content-between">
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => goToPage(`/update-employee/${userDetails.id} `)}>
            <AccountCircleIcon fontSize="small" style={{ marginRight: 8 }} />
            Update Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />
            Logout
          </MenuItem>
        </Menu>
        {/* Navbar Toggler for Small Screens */}
        {userDetails.token && (
          <IconButton color="inherit" edge="start" sx={{ display: { md: "none" } }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1, maxWidth: "max-content" }}>
          Employee Management System
        </Typography>

        {/* Navbar Links (Hidden on Small Screens) */}
        {userDetails.token && (
          <Box sx={{ display: { xs: "none", md: "flex" }, marginRight: 0, gap: 2 }}>
            <Button color="inherit" onClick={() => goToPage("/home")}>
              Home
            </Button>
            {userDetails.role === "ADMIN" && (
              <Button color="inherit" onClick={() => goToPage("/list-employee")}>
                Employee Details
              </Button>
            )}
            <Button color="inherit" onClick={() => goToPage("/list-leave")}>
              Leave Details
            </Button>
            <Button color="inherit" onClick={() => goToPage("/list-salary")}>
              Salary Details
            </Button>
          </Box>
        )}

        {/* Profile & Logout Button */}
        {userDetails.token && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={handleClick} color="inherit">
              {processedImage ? (
                <img src={processedImage} style={{ height: "40px", width: "40px", borderRadius: "50%" }} />
              ) : (
                <PersonIcon fontSize="large" />
              )}
            </IconButton>
            <Button variant="contained" style={{ backgroundColor: "white", color: "black" }} onClick={logout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>

      {/* Sidebar Drawer (For Small Screens) */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          <ListItem button onClick={() => goToPage("/home")}>
            <ListItemText primary="Home" />
          </ListItem>
          {userDetails.role === "ADMIN" && (
            <ListItem button onClick={() => goToPage("/list-employee")}>
              <ListItemText primary="Employee Details" />
            </ListItem>
          )}
          <ListItem button onClick={() => goToPage("/list-leave")}>
            <ListItemText primary="Leave Details" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Salary Details" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
