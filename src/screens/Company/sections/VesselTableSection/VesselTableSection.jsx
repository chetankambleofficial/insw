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
  CardContent,
  Typography,
  IconButton,
  Paper,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

export const VesselTableSection = ({ vessels = [] }) => {
  const [selectedVessel, setSelectedVessel] = useState(null);

  const fields = [
    { label: "Vessel Name", key: "VESSEL_NAME" },
    { label: "IMO Number", key: "VESSEL_IMO" },
    { label: "Vessel Code", key: "VESSEL_CODE" },
    { label: "Accounting Company", key: "ACCOUNTING_COMPANY_NAME" },
    { label: "Company ID", key: "COMPANY_ID" },
    { label: "Ship ID", key: "SHIP_ID" },
    { label: "Accounting Company ID", key: "ACCOUNTING_COMPANY_ID" },
    { label: "Department Code", key: "DEPARTMENT_CODE" },
    { label: "Project Code", key: "PROJECT_CODE" },
    { label: "Status", key: "STATUS" },
    { label: "Created On", key: "CREATED_ON" },
    { label: "Updated On", key: "UPDATED_ON" },
  ];

  const renderStatus = (status) => {
    if (status === 1) {
      return <Chip label="Active" sx={{ bgcolor: "#4caf50", color: "#fff", fontWeight: 600 }} size="small" />;
    } else {
      return <Chip label="Inactive" sx={{ bgcolor: "#f44336", color: "#fff", fontWeight: 600 }} size="small" />;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Vessel Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 0,
          maxHeight: "77vh",     // scroll starts inside this
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
                
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >

              <TableCell sx={{ fontWeight: 600 ,color:"#ffffff"}}>SNO</TableCell>
              <TableCell sx={{ fontWeight: 600 ,color:"#ffffff" }}>Vessel Name</TableCell>
              <TableCell sx={{ fontWeight: 600 ,color:"#ffffff"}}>IMO Number</TableCell>
              <TableCell sx={{ fontWeight: 600,color:"#ffffff" }}>Accounting Company</TableCell>
              <TableCell sx={{ fontWeight: 600 ,color:"#ffffff"}}>Ship ID</TableCell>
              <TableCell sx={{ fontWeight: 600 ,color:"#ffffff"}}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 ,color:"#ffffff"}}>Created On</TableCell>
              <TableCell sx={{ fontWeight: 600 ,color:"#ffffff"}}>Action</TableCell>
            </TableRow>
          </TableHead>

       <TableBody>
  {vessels.length === 0 && (
    <TableRow>
      <TableCell colSpan={8} align="center">
        No vessels found
      </TableCell>
    </TableRow>
  )}

  {vessels.map((vessel, index) => (
    <TableRow
      key={vessel.VESSEL_IMO}
      sx={{
        backgroundColor: index % 2 === 0 ? "#ffffff" : "#eeeeeeff", // alternate row colors
        "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" }, // hover effect
      }}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>{vessel.VESSEL_NAME}</TableCell>
      <TableCell>{vessel.VESSEL_IMO}</TableCell>
      <TableCell>{vessel.ACCOUNTING_COMPANY_NAME}</TableCell>
      <TableCell>{vessel.SHIP_ID}</TableCell>
      <TableCell>{renderStatus(vessel.STATUS)}</TableCell>
      <TableCell>{new Date(vessel.CREATED_ON).toLocaleDateString()}</TableCell>
      <TableCell>
        <IconButton sx={{color:"#184a70ff"}}  onClick={() => setSelectedVessel(vessel)}>
          <VisibilityIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>

      {/* Modal Card */}
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
          <Card
            sx={{
              width: "100%",
              maxWidth: 600,
              maxHeight: "80vh",
              borderRadius: 2,
              overflowY: "auto",
              p: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">{selectedVessel.VESSEL_NAME} Details</Typography>
              <IconButton onClick={() => setSelectedVessel(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableBody>
                  {fields.map((field) => {
                    let value = selectedVessel[field.key] ?? "-";

                    if (field.key === "STATUS") value = renderStatus(value);
                    if (field.key === "CREATED_ON" || field.key === "UPDATED_ON")
                      value = value ? new Date(value).toLocaleString() : "-";

                    return (
                      <TableRow key={field.key}>
                        <TableCell sx={{ fontWeight: 600 }}>{field.label}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      )}
    </Box>
  );
};
