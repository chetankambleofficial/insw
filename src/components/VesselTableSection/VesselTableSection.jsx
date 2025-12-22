import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Typography,
  IconButton,
  Paper,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
export const VesselTableSection = ({ vessels = [] }) => {
  const [selectedVessel, setSelectedVessel] = useState(null);

  /* 🔹 NULL FALLBACK */
  const fallback = (value, message = "—") =>
    value === null || value === undefined || value === ""
      ? message
      : value;

  const fields = [
    { label: "Vessel Name", key: "vesselName" },
    { label: "IMO Number", key: "vesselImo" },
    { label: "Ship Number", key: "shipNumber" },
    { label: "Manager", key: "manager" },
    { label: "Vessel Segment", key: "vesselSegment" },
    { label: "Accounting Company ID", key: "acctCompanyId" },
    { label: "Accounting Company Name", key: "acctCompanyName", emptyText: "N/A" },
    { label: "Fleet Entered Date", key: "fleetEnteredDate", isDate: true },
    { label: "Fleet Exited Date", key: "fleetExitedDate", isDate: true },
    { label: "Status", key: "activeStatus" },
  ];

  const renderStatus = (status) =>
    status === 1 ? (
      <Chip
        label="Active"
        sx={{ bgcolor: "#4caf50", color: "#fff", fontWeight: 600 }}
        size="small"
      />
    ) : (
      <Chip
        label="Inactive"
        sx={{ bgcolor: "#f44336", color: "#fff", fontWeight: 600 }}
        size="small"
      />
    );

  // Remove duplicates by vesselImo
  const uniqueVessels = Array.from(new Map(vessels.map(v => [v.vesselImo, v])).values());

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 0,
          maxHeight: "77vh",
          overflowY: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                background: "#184a70ff",
              }}
            >
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>SNO</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Vessel Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>IMO Number</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Manager</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Ship Number</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Fleet Entered Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueVessels.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No vessels found
                </TableCell>
              </TableRow>
            )}

            {uniqueVessels.map((vessel, index) => (
              <TableRow
                key={vessel.vesselImo}
                sx={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#eeeeeeff" }}
              >
                <TableCell>{index + 1}</TableCell> {/* ✅ Proper SNO */}
                <TableCell>{fallback(vessel.vesselName)}</TableCell>
                <TableCell>{fallback(vessel.vesselImo)}</TableCell>
                <TableCell>{fallback(vessel.manager)}</TableCell>
                <TableCell>{fallback(vessel.shipNumber)}</TableCell>
                <TableCell>{renderStatus(vessel.activeStatus)}</TableCell>
                <TableCell>
                  {vessel.fleetEnteredDate
                    ? new Date(vessel.fleetEnteredDate).toLocaleDateString()
                    : "Not Available"}
                </TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "#184a70ff" }}
                    onClick={() => setSelectedVessel(vessel)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL */}
      {selectedVessel && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            px: 2,
          }}
        >
          <Card sx={{ width: "100%", maxWidth: 600, maxHeight: "80vh", overflowY: "auto", p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">{fallback(selectedVessel.vesselName)} Details</Typography>
              <IconButton onClick={() => setSelectedVessel(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Table size="small">
              <TableBody>
                {fields.map((field) => {
                  let value = selectedVessel[field.key];
                  if (field.key === "activeStatus") value = renderStatus(value);
                  if (field.isDate) value = value ? new Date(value).toLocaleDateString() : "Not Available";

                  return (
                    <TableRow key={field.key}>
                      <TableCell sx={{ fontWeight: 600 }}>{field.label}</TableCell>
                      <TableCell>{field.isDate ? value : fallback(value, field.emptyText)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </Box>
      )}
    </Box>
  );
};
