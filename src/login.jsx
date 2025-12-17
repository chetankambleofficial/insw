import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  /* 🔹 INPUT STYLES - BLACK BORDER */
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255,255,255,0.12)",
      borderRadius: "10px",
      color: "#2d2d2d",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#000000",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1f2937",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4f7cff",
    },
    "& input": {
      color: "#2d2d2d",
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.12) inset",
      WebkitTextFillColor: "#2d2d2d",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        position: "relative",

        backgroundImage: "url(/public/images/isw.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(15,18,41,0.65), rgba(15,18,41,0.75))",
          zIndex: 1,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 420,
          borderRadius: "18px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(0,0,0,0.15)",
          animation: "fadeIn 0.6s ease-out",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            py: 3,
            textAlign: "center",
            background: "#0c0040ff",
            borderBottom: "1px solid #eafdffff",
          }}
        >
          <Box
            component="img"
            src="https://c.animaapp.com/mgrxz7o3oIDiS4/img/logo.png"
            alt="Logo"
            sx={{ width: 150 }}
          />
          <Typography
            sx={{
              mt: 1,
              fontSize: 12,
              color: "#c9c9c9ff",
            }}
          >
            Integrated Shipping Network Workspace
          </Typography>
        </Box>

        {/* FORM */}
        <Box sx={{ p: 4, backgroundColor: "#ffffffff" }}>
          <Typography variant="h5" color="#000000" fontWeight={600}>
            Sign in
          </Typography>
          <Typography fontSize={13.5} color="#2d2d2d" mb={3}>
            Access your maritime dashboard
          </Typography>

          <form onSubmit={handleLogin}>
            <Stack spacing={2.4}>
              {/* EMAIL */}
              <TextField
                label="Email Address"
                fullWidth
                required
                InputLabelProps={{ style: { color: "#2d2d2d" } }}
                sx={inputStyles}
              />

              {/* PASSWORD */}
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                InputLabelProps={{ style: { color: "#2d2d2d" } }}
                sx={inputStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                        sx={{ color: "#2d2d2d" }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* LOGIN BUTTON */}
              <Button
                type="submit"
                startIcon={<LoginIcon />}
                sx={{
                  py: 1.2,
                  borderRadius: "10px",
                  fontWeight: 600,
                  textTransform: "none",
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, #004781, #3b82f6)",
                  boxShadow: "0 6px 16px rgba(59,130,246,0.35)",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 12px 28px rgba(59,130,246,0.5)",
                  },
                }}
              >
                Login
              </Button>
            </Stack>
          </form>

          <Typography
            sx={{
              mt: 3,
              fontSize: 11.5,
              color: "#475569",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} INSW · Secure Maritime Platform
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
