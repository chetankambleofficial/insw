import {
  Avatar,
  Box,
  Stack,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";

export const HeaderSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const handlelogout = () => {
    navigate("/login");
  };
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Vessels", path: "/vessel" },
    { label: "General Ledger", path: "/general-ledger" },
    { label: "Open Bill Request", path: "/openbillrequest" },
  ];

  const hideNavLinks = location.pathname === "/";

  const handleNavigation = (path) => {
    if (location.pathname === path) return;

    setLoading(true);

    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 1000); // ⏱️ 2 seconds
  };

  return (
    <>
      {/* Top Loader */}
      {loading && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 2000,
          }}
        />
      )}

      <Box
        component="header"
        sx={{
          width: "100%",
          height: 96,
          bgcolor: "#1a1f36",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          alt="Logo"
          src="https://c.animaapp.com/mgrxz7o3oIDiS4/img/logo.png"
          sx={{ width: 120, height: 80, objectFit: "cover" }}
        />

        {/* Navigation */}
        {!hideNavLinks && (
          <Stack direction="row" spacing={4} alignItems="center">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                location.pathname.startsWith(link.path + "/");

              return (
                <Box
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    fontFamily: "Space Grotesk",
                    color: isActive ? "#ffffff" : "#c7c9d9",
                    backgroundColor: isActive ? "#004781ff" : "transparent",
                    padding: "8px 16px",
                    borderRadius: "5px 5px 0 0",
                    fontWeight: 600,
                    fontSize: "15px",
                    transition: "all 0.3s ease",

                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: isActive ? "100%" : "0%",
                      height: "2px",
                      bgcolor: "#4f7cff",
                      transition: "width 0.35s ease",
                    },

                    "&:hover": {
                      color: "#ffffff",
                    },

                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {link.label}
                </Box>
              );
            })}
          </Stack>
        )}

        {/* Right Section */}
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              src="https://c.animaapp.com/mgrxz7o3oIDiS4/img/shape.png"
              sx={{ width: 40, height: 40 }}
            />
            <Stack spacing={0.25}>
              <Typography sx={{ fontWeight: 600, color: "#f2f4f7", fontSize: 14 }}>
                INSW Client
              </Typography>
              <Typography sx={{ color: "#f2f4f7", fontSize: 13, opacity: 0.8 }}>
                User
              </Typography>
            </Stack>
          </Stack>

          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handlelogout}
            sx={{
              color: "#f2f4f7",
              borderColor: "#f2f4f7",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Logout
          </Button>
        </Stack>
      </Box>
    </>
  );
};
